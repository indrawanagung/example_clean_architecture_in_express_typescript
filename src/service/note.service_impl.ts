import { v4 as uuidv4 } from 'uuid';
import { DataSource} from "typeorm";
import {BadRequestError, NotFoundError} from "../api/error_handling";
import {StatusRepositoryInterface} from "../repository/status.repository";
import {StatusEntity} from "../entity/status.entity";
import {NoteServiceInterface} from "./note.service";
import {NoteRepositoryInterface} from "../repository/note.repository";
import noteRepository_impl from "../repository/note.repository_impl";
import {NoteResponseInterface} from "../interface/note.response.interface";
import {NoteCreateOrUpdateRequest} from "../api/note";
import {NoteEntity} from "../entity/note.entity";
import {isUUID} from "class-validator";
import {ValidationRequest} from "../helper/validation";

class NoteServiceImpl implements NoteServiceInterface{

    private noteRepository : NoteRepositoryInterface
    private statusRepository : StatusRepositoryInterface
    private connection : DataSource

    constructor(
        connection : DataSource,
        noteRepository : NoteRepositoryInterface,
        statusRepository : StatusRepositoryInterface
    ) {
        this.noteRepository = noteRepository
        this.statusRepository = statusRepository
        this.connection = connection
    }

  async findAll(): Promise<NoteResponseInterface[]> {
        return await this.noteRepository.findAll(this.connection)
  }
  async findById(noteId : string): Promise<NoteResponseInterface> {
        const note = await this.noteRepository.findById(this.connection, noteId)
        if(!note) throw NotFoundError(`note id ${noteId} is not found`)
        return note
  }
  async save(request : NoteCreateOrUpdateRequest): Promise<NoteEntity> {
        await ValidationRequest(request)

        const status = await this.statusRepository.findById(this.connection, request.status_id)
        if(!status) throw NotFoundError(`status id ${request.status_id} is not found`)

        const payloadNote = new NoteEntity()
        payloadNote.id = uuidv4()
        payloadNote.task_name = request.task_name
        payloadNote.status_id = request.status_id
        payloadNote.last_updated = Date.now().toString()
        return  await this.noteRepository.save(this.connection, payloadNote)
  }
    async edit(request : NoteCreateOrUpdateRequest, noteId : string): Promise<void> {
        await ValidationRequest(request)

        const status = await this.statusRepository.findById(this.connection, request.status_id)
        if(!status) throw NotFoundError(`status id ${request.status_id} is not found`)

        const note = await this.noteRepository.findById(this.connection,noteId)
        if(!note) throw NotFoundError(`note id ${noteId} is not found`)

        const payloadNote = new NoteEntity()
        payloadNote.id = noteId
        payloadNote.task_name = request.task_name
        payloadNote.status_id = request.status_id
        payloadNote.last_updated = Date.now().toString()
        await this.noteRepository.edit(this.connection, payloadNote)
    }

    async delete(noteId : string): Promise<void> {
        const note = await this.noteRepository.findById(this.connection, noteId)
        if(!note) throw NotFoundError(`note id ${noteId} is not found`)
        await this.noteRepository.delete(this.connection, noteId)
    }
}

export default NoteServiceImpl
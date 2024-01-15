import {Request, Response} from "express"
import { ErrorHandlerResponse } from "../api/error_handling";
import { SuccessHandlerResponse } from "../api/success_handler_response";
import {Logger} from "../logger/logger";
import {NoteControllerInterface} from "./note.controller";
import {NoteServiceInterface} from "../service/note.service";
import {NoteCreateOrUpdateRequest} from "../api/note";

class NoteControllerImpl implements NoteControllerInterface{
    private noteService : NoteServiceInterface

    constructor(noteService : NoteServiceInterface) {
        this.noteService = noteService
    }

    findAll = async (_, res): Promise<Response> =>{
        try{
            Logger.info("controller find all notes")
            const notes = await this.noteService.findAll()
            return SuccessHandlerResponse(notes,res)

        }catch(err){
            return ErrorHandlerResponse(err,res)
        }
    }
    findById = async (req, res): Promise<Response> =>{
        try{
            Logger.info("controller find note")
            const id = req.params.id
            const note = await this.noteService.findById(id)
            return SuccessHandlerResponse(note,res)

        }catch(err){
            return ErrorHandlerResponse(err,res)
        }
    }
    create = async (req, res): Promise<Response> =>{
        try{
            Logger.info("controller save note")
            const noteRequest = new NoteCreateOrUpdateRequest()
            noteRequest.status_id = req.body.status_id
            noteRequest.task_name = req.body.task_name

            const note = await this.noteService.save(noteRequest)
            return SuccessHandlerResponse(note,res)

        }catch(err){
            return ErrorHandlerResponse(err,res)
        }
    }

    update = async (req, res): Promise<Response> =>{
        try{
            Logger.info("controller save note")
            const id = req.params.id
            const noteRequest = new NoteCreateOrUpdateRequest()
            noteRequest.status_id = req.body.status_id
            noteRequest.task_name = req.body.task_name

            await this.noteService.edit(noteRequest, id)
            return SuccessHandlerResponse("success",res)

        }catch(err){
            return ErrorHandlerResponse(err,res)
        }
    }

    delete = async (req, res): Promise<Response> =>{
        try{
            Logger.info("controller save note")
            const id = req.params.id
            await this.noteService.delete(id)
            return SuccessHandlerResponse("success",res)

        }catch(err){
            return ErrorHandlerResponse(err,res)
        }
    }



}

export default NoteControllerImpl
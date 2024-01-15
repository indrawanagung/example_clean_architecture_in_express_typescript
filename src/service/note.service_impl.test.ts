import Database from "../database/database";
import StatusServiceImpl from "./status.service_impl";
import StatusRepositoryImpl from "../repository/status.repository_impl";
import NoteRepositoryImpl from "../repository/note.repository_impl";
import NoteServiceImpl from "./note.service_impl";
import {NoteEntity} from "../entity/note.entity";
import {NoteCreateOrUpdateRequest} from "../api/note";
import noteRepository_impl from "../repository/note.repository_impl";

describe('note service test', () => {
    const db = new Database().getDataSource()
    const statusRepository = new StatusRepositoryImpl()
    const noteRepository = new NoteRepositoryImpl()
    const noteService = new NoteServiceImpl(db, noteRepository, statusRepository)

    beforeEach(async () =>{
        await db.initialize()
    })
    afterEach(async () => {
        await db.destroy()
    })

    const saveNote = async() : Promise<[noteRequest : NoteCreateOrUpdateRequest,result :NoteEntity]>  =>{
        const noteRequest = new NoteCreateOrUpdateRequest()
        noteRequest.status_id = "1"
        noteRequest.task_name = "create endpoint save note"
        const result =  await noteService.save(noteRequest)
        return [noteRequest, result]
    }


    describe('save note', () => {
        it(`it should return note entity `, async () => {
           await db.manager.query("delete from notes")
           const [noteRequest, result] = await saveNote()
           expect(noteRequest.task_name).toEqual(result.task_name)
           expect(noteRequest.status_id).toEqual(result.status_id)
        })

        it(`it should return not found note`, async () => {
            try {
                await db.manager.query("delete from notes")
                const noteRequest = new NoteCreateOrUpdateRequest()
                noteRequest.status_id = "100"
                noteRequest.task_name = "create endpoint save note"
                await noteService.save(noteRequest)
            } catch (e) {
                expect(e.message).toEqual("status id 100 is not found")
            }
        })
    })

    describe('edit note', () => {
        it(`it should return note entity `, async () => {
            await db.manager.query("delete from notes")
            const [noteRequest, result] = await saveNote()
            const noteRequestUpdate = new NoteEntity()
            noteRequestUpdate.task_name = "edit task"
            noteRequestUpdate.status_id = "2"
            await noteService.edit(noteRequestUpdate,result.id)
            const resultUpdate = await noteService.findById(result.id)
            expect(resultUpdate.id).toEqual(result.id)
            expect(resultUpdate.task_name).toEqual(noteRequestUpdate.task_name)
        })

        it(`it should return not found note`, async () => {
            try {
                await db.manager.query("delete from notes")
                const noteRequest = new NoteCreateOrUpdateRequest()
                noteRequest.status_id = "1"
                noteRequest.task_name = "create endpoint save note"
                await noteService.edit(noteRequest, "100")
            } catch (e) {
                expect(e.message).toEqual("note id 100 is not found")
            }
        })
    })

    describe('find all', () => {
        it(`it should return all note`, async () => {
            await db.manager.query("delete from notes")
            await saveNote()
            await saveNote()
            const result = await noteService.findAll()
            expect(2).toEqual(result.length)
        })
    })
    describe('find by id', () => {
        it(`it should return note`, async () => {
            await db.manager.query("delete from notes")
            const [_, result] = await saveNote()
            const note = await noteService.findById(result.id)
            expect(result.id).toEqual(note.id)
            expect(result.task_name).toEqual(note.task_name)
            expect(result.last_updated).toEqual(note.last_updated)
        })

        it(`it should not return by id `, async () => {
            try {
                await db.manager.query("delete from notes")
                const id = "10"
                await noteService.findById(id)
            } catch (e) {
                expect(e.message).toEqual("note id 10 is not found")
            }

        })
    })

    describe('delete note', () => {
        it(`it should return note`, async () => {
            await db.manager.query("delete from notes")
            const [_, result] = await saveNote()
            // await noteR
            const note = await noteService.findById(result.id)
            expect(result.id).toEqual(note.id)
            expect(result.task_name).toEqual(note.task_name)
            expect(result.last_updated).toEqual(note.last_updated)
        })

        it(`it should not return by id `, async () => {
            try {
                await db.manager.query("delete from notes")
                const id = "10"
                await noteService.findById(id)
            } catch (e) {
                expect(e.message).toEqual("note id 10 is not found")
            }

        })
    })
})
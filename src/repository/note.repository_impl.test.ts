import Database from "../database/database";
import { v4 as uuidv4 } from 'uuid';
import NoteRepositoryImpl from "./note.repository_impl";
import {NoteEntity} from "../entity/note.entity";

describe('note repository test', () => {
    const db = new Database().getDataSource()
    const noteRepository = new NoteRepositoryImpl()

    beforeEach(async () =>{
        await db.initialize()
    })
    afterEach(async () => {
        await db.destroy()
    })

    const saveNote = async() : Promise<[notePayload:NoteEntity,result :NoteEntity]>  =>{
        const notePayload = new NoteEntity()
        notePayload.id = uuidv4()
        notePayload.last_updated =  Date.now().toString()
        notePayload.status_id = "1"
        notePayload.task_name = "create test note repository"
        const result =  await noteRepository.save(db, notePayload)
        return [notePayload, result]
    }

    describe('save', () => {
        it(`it should return note `, async () => {
            await db.manager.query("delete from notes")
            const [notePayload, result] = await saveNote()
            expect(result).toEqual(notePayload)
        })
    })

    describe('edit', () => {
        it(`it should return note`, async () => {
            await db.manager.query("delete from notes")
            const [notePayload, _] = await saveNote()
            const editNotePayload = new NoteEntity()
            editNotePayload.id = notePayload.id
            editNotePayload.task_name = "edit task"
            editNotePayload.status_id = "2"
            await noteRepository.edit(db, editNotePayload)
            const result = await noteRepository.findById(db, editNotePayload.id)
            expect(result.task_name).toEqual(editNotePayload.task_name)
            expect(result.id).toEqual(editNotePayload.id)
        })
    })

    describe('find all', () => {
        it(`it should return all notes `, async () => {
            await db.manager.query("delete from notes")
            const [notePayload1, result1] = await saveNote()
            const [notePayload2, result2] = await saveNote()
            expect([notePayload1, notePayload2]).toEqual([notePayload1, notePayload2])
        })
    })
    describe('find by id', () => {
        it(`it should return note by id `, async () => {
            await db.manager.query("delete from notes")
            const [notePayload, _] = await saveNote()
            const result2 = await noteRepository.findById(db, notePayload.id)
            expect(notePayload.id).toEqual(result2.id)
            expect(notePayload.task_name).toEqual(result2.task_name)
            expect(notePayload.last_updated).toEqual(result2.last_updated)
        })
        it(`it should return nil `, async () => {
            await db.manager.query("delete from notes")
            const result = await noteRepository.findById(db, "123123")
            expect(null).toEqual(result)
        })
    })

    describe('delete', () => {
        it(`it should return nil`, async () => {
            await db.manager.query("delete from notes")
            const [notePayload, _] = await saveNote()
            await noteRepository.delete(db, notePayload.id)
            const result = await noteRepository.findById(db, notePayload.id)
            expect(result).toEqual(null)
        })
    })

})
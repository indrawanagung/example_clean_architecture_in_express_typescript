import Database from "../database/database";
const request = require('supertest');
const baseURL = "http://localhost:3000/notes_api"
describe('note controller test', () => {
    const db = new Database().getDataSource()

    beforeEach(async () =>{
        await db.initialize()
    })
    afterEach(async () => {
        await db.destroy()
    })

    describe('create note', () => {
        it(`it should return id`, async () => {
            await db.manager.query("delete from notes")
            const payload = {task_name: 'create note api', status_id: '1'};
            const response = await request(baseURL).post(`/notes`).send(payload)
            expect(response.body.data.task_name).toEqual(payload.task_name)
            expect(response.body.data.status_id).toEqual(payload.status_id)
            expect(response.statusCode).toBe(200)
        })
        it(`it should return 404 status`, async () => {
            const payload = {task_name: 'create note api', status_id: '10'};
            const response = await request(baseURL).post(`/notes`).send(payload)
            expect(response.statusCode).toBe(404)
        })
    })

    describe('edit note', () => {
        it(`it should return`, async () => {
            await db.manager.query("delete from notes")
            const payload = {task_name: 'create note api', status_id: '1'};
            const response = await request(baseURL).post(`/notes`).send(payload)
            const payloadUpdate = {task_name: 'update note api', status_id: '2'};
            await request(baseURL).put(`/notes/${response.body.data.id}`).send(payloadUpdate)
            const note = await request(baseURL).get(`/notes/${response.body.data.id}`)
            expect(note.statusCode).toBe(200)
            expect(note.body.data.id).toEqual(response.body.data.id)
            expect(note.body.data.task_name).toEqual(payloadUpdate.task_name)
        })
        it(`it should return 404 status`, async () => {
            const payloadUpdate = {task_name: 'update note api', status_id: '2'};
            const response = await request(baseURL).put(`/notes/1`).send(payloadUpdate)
            expect(response.statusCode).toBe(404)
        })
    })

    describe('find all note', () => {
        it(`it should return all note`, async () => {
            await db.manager.query("delete from notes")
            const payload = {task_name: 'create note api', status_id: '1'};
            await request(baseURL).post(`/notes`).send(payload)
            const response = await request(baseURL).get(`/notes`)

            expect(response.body.data[0].task_name).toEqual(payload.task_name)
            expect(response.statusCode).toBe(200)
        })
    })

    describe('find by id note', () => {
        it(`it should return by id note`, async () => {
            await db.manager.query("delete from notes")
            const payload = {task_name: 'create note api', status_id: '1'};
            const noteResponse = await request(baseURL).post(`/notes`).send(payload)
            const noteId = noteResponse.body.data.id
            const response = await request(baseURL).get(`/notes/${noteId}`)

            expect(response.body.data.id).toEqual(noteId)
            expect(response.body.data.task_name).toEqual(payload.task_name)
            expect(response.statusCode).toBe(200)
        })

        it(`it should return 404 not found note`, async () => {
            await db.manager.query("delete from notes")
            const response = await request(baseURL).get(`/notes/1`)

            expect(response.statusCode).toBe(404)
        })
    })

    describe('delete note', () => {
        it(`it should not return note`, async () => {
            await db.manager.query("delete from notes")
            const payload = {task_name: 'create note api', status_id: '1'};
            const noteResponse = await request(baseURL).post(`/notes`).send(payload)
            const noteId = noteResponse.body.data.id
            const response = await request(baseURL).delete(`/notes/${noteId}`)
            expect(response.statusCode).toBe(200)
        })

        it(`it should return 404 not found note`, async () => {

            const response = await request(baseURL).delete(`/notes/1`)
            expect(response.statusCode).toBe(404)
        })
    })
})
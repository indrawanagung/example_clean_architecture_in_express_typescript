import {Request, Response} from "express"
import Database from "../database/database";
import StatusRepositoryImpl from "../repository/status.repository_impl";
import StatusServiceImpl from "../service/status.service_impl";
import StatusControllerImpl from "../controllers/status.controller_impl";
const request = require('supertest');
const baseURL = "http://localhost:3000/notes_api"
describe('status controller test', () => {
    const db = new Database().getDataSource()
    const statusRepository = new StatusRepositoryImpl()
    const statusService = new StatusServiceImpl(db,statusRepository)
    const statusController = new StatusControllerImpl(statusService)

    beforeEach(async () =>{
        await db.initialize()
    })
    afterEach(async () => {
        await db.destroy()
    })

    describe('find all', () => {
        it(`it should return all `, async () => {
            const response = await request(baseURL).get("/status");
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual([
                { id: '1', status_name: 'Done' },
                { id: '2', status_name: 'Stuck' },
                { id: '3', status_name: 'Working on it' },
                { id: '4', status_name: 'Not Started' }
            ])

        })
    })

    describe('find by id', () => {
        it(`it should return by id`, async () => {
            const id = 1
            const response = await request(baseURL).get(`/status/${id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual({ id: '1', status_name: 'Done' },
            )
        })
        it(`it should not return by id`, async () => {
            const id = 10
            const response = await request(baseURL).get(`/status/${id}`);
            expect(response.statusCode).toBe(404);
        })
    })
})
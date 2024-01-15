import Database from "../database/database";
import StatusServiceImpl from "./status.service_impl";
import StatusRepositoryImpl from "../repository/status.repository_impl";

describe('status service test', () => {
    const db = new Database().getDataSource()
    const statusRepository = new StatusRepositoryImpl()
    const statusService = new StatusServiceImpl(db, statusRepository)
    beforeEach(async () =>{
        await db.initialize()
    })
    afterEach(async () => {
        await db.destroy()
    })

    describe('find all', () => {
        it(`it should return all `, async () => {
            const result = await statusService.findAll()
            expect(result).toEqual([
                { id: '1', status_name: 'Done' },
                { id: '2', status_name: 'Stuck' },
                { id: '3', status_name: 'Working on it' },
                { id: '4', status_name: 'Not Started' }
            ])
        })
    })
    describe('find by id', () => {
        it(`it should return by id `, async () => {
            const id = "1"
            const result = await statusService.findById(id)
            expect(result).toEqual({ id: '1', status_name: 'Done' })
        })

        it(`it should not return by id `, async () => {
            try {
                const id = "10"
                await statusService.findById(id)
            } catch (e) {
                expect(e.message).toEqual("status id 10 is not found")
            }

        })
    })
})
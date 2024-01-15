import Database from "./database/database";
import Server from "./server/server";
import Router from "./routes/router";
import {Logger} from "./logger/logger";
import NoteControllerImpl from "./controllers/note.controller_impl";
import StatusControllerImpl from "./controllers/status.controller_impl";
import StatusRepositoryImpl from "./repository/status.repository_impl";
import StatusServiceImpl from "./service/status.service_impl";
import NoteRepositoryImpl from "./repository/note.repository_impl";
import NoteServiceImpl from "./service/note.service_impl";

require('dotenv').config();

try{
    Logger.info("setup db")
    const db = new Database().getDataSource()
    const port = Number(process.env.PORT_API)

    const url = "/notes_api"

    //repository
    const statusRepository = new StatusRepositoryImpl()
    const noteRepository = new NoteRepositoryImpl()

    //service
    const statusService = new StatusServiceImpl(db, statusRepository)
    const noteService = new NoteServiceImpl(db, noteRepository,statusRepository)
    // controller
    const noteController = new NoteControllerImpl(noteService)
    const statusController = new StatusControllerImpl(statusService)

    //middleware
    // const middleware = new MiddlewareImplementation(db,authenticationService,userRepository,titleRepository)
    // const middlewareMock = new MiddlewareMock(db,authenticationService,userRepository,titleRepository)

    Logger.info("setup router")

    const router = new Router(
        noteController,
        statusController
    ).NewRouter()

    const server = new Server(
        router,
        db,
        Number(port),
        url
    )

    Logger.info("running server")

    //running server
    server.Run()

}catch (e) {
    console.log(e)
}







import { Router as RouterExpress} from "express";
import {NoteControllerInterface} from "../controllers/note.controller";
import {StatusControllerInterface} from "../controllers/status.controller";


export default class Router {
    // private middleware : MiddlewareInterface
    private noteController : NoteControllerInterface
    private statusController : StatusControllerInterface

    constructor(
        noteController : NoteControllerInterface,
        statusController : StatusControllerInterface
        // categoryController : CategoryControllerInterface,
        // middleware : MiddlewareInterface
    ) {
        this.noteController = noteController
        this.statusController = statusController
        // this.middleware = middleware
    }

    public NewRouter = () :Promise<RouterExpress> => {

        const router = RouterExpress()
        router.get("/notes", this.noteController.findAll)
        router.get("/notes/:id", this.noteController.findById)
        router.delete("/notes/:id", this.noteController.delete)
        router.post("/notes", this.noteController.create)
        router.put("/notes/:id", this.noteController.update)

        router.get("/status", this.statusController.findAll)
        router.get("/status/:id", this.statusController.findById)
        // router.get("/buildings", this.middleware.validate,this.middleware.authApprover,this.buildingController.findAll);
        return router
    }
}

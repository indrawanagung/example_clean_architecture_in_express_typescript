import {Request, Response} from "express"
import { ErrorHandlerResponse } from "../api/error_handling";
import { SuccessHandlerResponse } from "../api/success_handler_response";
import {Logger} from "../logger/logger";
import {NoteControllerInterface} from "./note.controller";
import {StatusControllerInterface} from "./status.controller";
import {StatusServiceInterface} from "../service/status.service";

class StatusControllerImpl implements StatusControllerInterface{
    private statusService : StatusServiceInterface
    constructor(statusService : StatusServiceInterface) {
        this.statusService = statusService
    }
    findAll = async (req, res): Promise<Response> =>{
        try{
            Logger.info("controller find all status")
            const listStatusResponse = await this.statusService.findAll()
            return SuccessHandlerResponse(listStatusResponse,res)

        }catch(err){
            return ErrorHandlerResponse(err,res)
        }
    }

    findById = async (req, res): Promise<Response> =>{
        try{
            Logger.info("controller find by id status")
            const id = req.params.id
            const statusResponse = await this.statusService.findById(id)
            return SuccessHandlerResponse(statusResponse,res)

        }catch(err){
            return ErrorHandlerResponse(err,res)
        }
    }
}

export default StatusControllerImpl
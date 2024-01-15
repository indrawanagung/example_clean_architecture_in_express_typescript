import {Request, Response} from "express"

export interface StatusControllerInterface {
    findAll(req : Request, res: Response) : Promise<Response>
    findById(req : Request, res: Response) : Promise<Response>
}

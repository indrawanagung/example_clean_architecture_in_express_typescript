import {NextFunction, Request, Response} from "express";

export interface MiddlewareInterface {
    validate(req :Request, res : Response, next :NextFunction)
}
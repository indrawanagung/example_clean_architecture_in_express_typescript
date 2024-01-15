import {validate} from "class-validator";
import {BadRequestError} from "../api/error_handling";
import {Logger} from "../logger/logger";



export const ValidationRequest = async (request : any)  => {
    const errors = await validate(request)
    if (errors.length > 0) {
        for (const error of errors) {
            Logger.warn(error)
            throw BadRequestError(
                error.constraints?.min ??
                error.constraints?.isInt
            )
        }
    }
}
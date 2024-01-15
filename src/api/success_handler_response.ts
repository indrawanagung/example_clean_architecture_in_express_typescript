import {Request, Response} from "express"
import { ResponseAPI } from "../interface/response_api_interface";

 export const SuccessHandlerResponse = async (data: any , res: Response) : Promise<Response> => {
 
     const response : ResponseAPI = {
          code : 200,
          status : "OK",
          data : data,
          error : null
     }
     return res.status(response.code).send(response)

 }

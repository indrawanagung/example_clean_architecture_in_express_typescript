import { ControlllerResponseInterface } from "../api/controller_response"

export const StatusBadRequestError = (error : any) => {
     const response = {
          code : 400,
          error : error,
          data : null
     }

     return response


}
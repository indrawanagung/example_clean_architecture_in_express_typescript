import { ControlllerResponseInterface } from "../api/controller_response"

export const StatusInternalServerError = (error : any) => {
     let response = {
          code : 200,
          error : error,
          data : null
     }

     return response


}
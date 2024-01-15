export const MethodNotAllowedError = (error : any) => {
     const response = {
          code : 405,
          status : "METHOD NOT ALLOWED",
          message : error,
          data : null
     }

     return response


}
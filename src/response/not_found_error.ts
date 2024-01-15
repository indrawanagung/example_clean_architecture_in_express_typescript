export const StatusNotFoundError = (error : any) => {
     let response = {
          code : 404,
          error : error,
          data : null
     }

     return response


}
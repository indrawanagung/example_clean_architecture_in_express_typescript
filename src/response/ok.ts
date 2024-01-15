export const StatusOK = (data : any) => {
     let response = {
          code : 200,
          error : null,
          data : data
     }

     return response
}
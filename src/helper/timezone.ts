export const  ToIsoStringConvert = (date : any) : any => {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) + ' ' +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
}

export const toTimestampWithTimezoneResponse = (item : any) =>{
        if (item.created_at) {
            if(!isNaN(item.created_at)){
                item.created_at = ToIsoStringConvert(new Date(item.created_at))
            }
        }

        if (item.updated_at) {
               if(!isNaN(item.updated_at)){
                   item.updated_at = ToIsoStringConvert(new Date(item.updated_at))
               }
        }
        if (item.requested_at) {
            if(!isNaN(item.requested_at)){
                item.requested_at = ToIsoStringConvert(new Date(item.requested_at))
            }
        }

        if (item.confirmed_at) {
            if(!isNaN(item.confirmed_at)){
                item.confirmed_at= ToIsoStringConvert(new Date(item.confirmed_at))
            }
        }
}

export const toTimestampWithTimezoneResponses = (items : any) =>{
    for (const item of items) {
        toTimestampWithTimezoneResponse(item)
    }
}
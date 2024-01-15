import {DataSource} from "typeorm";
import * as express from "express"
import { Router as RouterExpress} from "express";

export default class Server {
    private database : DataSource
    private port : number
    private router : RouterExpress
    private url : string

    constructor(
        router : RouterExpress,
        database : DataSource,
        port : number,
        url : string
    ) {
        this.database = database
        this.port = port
        this.router = router
        this.url = url

    }

    public Run = async ()  => {

        //Initializing Database
        await this.database.initialize()

        const app = express()
        app.use(express.json())
        app.use(this.url, this.router);

        // start express server
        app.listen(this.port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${this.port}`);
        })
    }


}


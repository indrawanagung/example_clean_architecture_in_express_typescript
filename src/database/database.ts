import {DataSource, QueryRunner} from "typeorm";
import {NoteEntity} from "../entity/note.entity";
require('dotenv').config();
class Database {
    public getDataSource = () : DataSource => {

        return new DataSource({

            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: false,
            logging: false,
            entities: [NoteEntity],
            migrations: [],
            subscribers: [],
        })
    }
}

export default Database
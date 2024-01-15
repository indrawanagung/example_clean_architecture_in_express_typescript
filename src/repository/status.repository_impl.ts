import {DataSource, QueryRunner} from "typeorm";
import {StatusRepositoryInterface} from "./status.repository";
import {StatusEntity} from "../entity/status.entity";

class StatusRepositoryImpl implements StatusRepositoryInterface {
    async findAll(conn: QueryRunner | DataSource): Promise<StatusEntity[]> {
        return await conn.manager.query(`select * from status`)
    }

    async findById(conn: QueryRunner | DataSource, statusId : string): Promise<StatusEntity> {
        const status = await conn.manager.query(`select * from status where id = $1`, [statusId])
        if(status.length < 1) return null
        return status[0]
    }
}

export default StatusRepositoryImpl
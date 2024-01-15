import {DataSource, QueryRunner} from "typeorm";
import {StatusEntity} from "../entity/status.entity";

export interface StatusRepositoryInterface {
    findAll (conn : QueryRunner | DataSource) : Promise<StatusEntity[]>
    findById (conn : QueryRunner | DataSource, statusId : string) : Promise<StatusEntity>
}

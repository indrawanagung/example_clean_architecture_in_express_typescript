import {StatusEntity} from "../entity/status.entity";

export interface StatusServiceInterface {
   findAll() : Promise<StatusEntity[]>
   findById(statusId : string) : Promise<StatusEntity>
}
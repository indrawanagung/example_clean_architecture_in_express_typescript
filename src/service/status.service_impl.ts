
import { DataSource} from "typeorm";
import {BadRequestError, NotFoundError} from "../api/error_handling";
import {StatusServiceInterface} from "./status.service";
import {StatusRepositoryInterface} from "../repository/status.repository";
import {StatusEntity} from "../entity/status.entity";

class StatusServiceImpl implements StatusServiceInterface{

    private statusRepository : StatusRepositoryInterface
    private connection : DataSource

    constructor(
        connection : DataSource,
        statusRepository : StatusRepositoryInterface
    ) {
        this.statusRepository = statusRepository
        this.connection = connection
    }

  async findAll(): Promise<StatusEntity[]> {
        return await this.statusRepository.findAll(this.connection)
  }
  async findById(statusId : string): Promise<StatusEntity> {
        const status = await this.statusRepository.findById(this.connection, statusId)
        if(!status) throw NotFoundError(`status id ${statusId} is not found`)
        return status
  }
}

export default StatusServiceImpl
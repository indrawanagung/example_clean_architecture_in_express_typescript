import {DataSource, QueryRunner} from "typeorm";
import {NoteEntity} from "../entity/note.entity";
import {NoteResponseInterface} from "../interface/note.response.interface";

export interface NoteRepositoryInterface {
    save (conn : QueryRunner | DataSource, note : NoteEntity) : Promise<NoteEntity>
    edit (conn : QueryRunner | DataSource, note : NoteEntity) : Promise<void>
    findAll (conn : QueryRunner | DataSource) : Promise<NoteResponseInterface[]>
    findById (conn : QueryRunner | DataSource, noteId : string) : Promise<NoteResponseInterface>
    delete (conn : QueryRunner | DataSource, noteId : string) : Promise<void>
}

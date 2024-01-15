import {DataSource, QueryRunner} from "typeorm";
import {NoteRepositoryInterface} from "./note.repository";
import {NoteEntity} from "../entity/note.entity";
import {NoteResponseInterface} from "../interface/note.response.interface";

class NoteRepositoryImpl implements NoteRepositoryInterface {
    async save(conn: QueryRunner | DataSource, note: NoteEntity): Promise<NoteEntity> {
        return await conn.manager.save(note)
    }

    async edit(conn: QueryRunner | DataSource, note: NoteEntity): Promise<void> {
        await conn.manager.update(NoteEntity, {id : note.id}, note)
    }

    async findAll(conn: QueryRunner | DataSource): Promise<NoteResponseInterface[]> {
        return await conn.manager.query("select n.id, n.task_name ,n.last_updated , s.status_name  from notes n\n" +
            "inner join status s on s.id = n.status_id ")
    }

    async findById(conn: QueryRunner | DataSource, noteId: string): Promise<NoteResponseInterface> {
        const notes = await conn.manager.query(`select n.id, n.task_name ,n.last_updated , s.status_name  from notes n
            inner join status s on s.id = n.status_id and n.id = $1`,[noteId])
        if(notes.length < 1) return null
        return notes[0]
    }

    async delete(conn: QueryRunner | DataSource, noteId: string): Promise<void> {
        await conn.manager.query(`delete from notes where id = $1`,[noteId])
    }
}

export default NoteRepositoryImpl
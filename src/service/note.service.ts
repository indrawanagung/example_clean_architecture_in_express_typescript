import {StatusEntity} from "../entity/status.entity";
import {NoteResponseInterface} from "../interface/note.response.interface";
import {NoteCreateOrUpdateRequest} from "../api/note";
import {NoteEntity} from "../entity/note.entity";

export interface NoteServiceInterface {
   findAll() : Promise<NoteResponseInterface[]>
   findById(noteId : string) : Promise<NoteResponseInterface>
   save(request : NoteCreateOrUpdateRequest) : Promise<NoteEntity>
   edit(request : NoteCreateOrUpdateRequest, noteId : string) : Promise<void>
   delete(noteId : string) : Promise<void>
}
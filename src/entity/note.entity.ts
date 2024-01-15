import {
   BaseEntity,
   Entity,
   Column, PrimaryColumn
} from "typeorm";
@Entity("notes")

export class NoteEntity extends BaseEntity{
   @PrimaryColumn()
   id: string;

   @Column()
   task_name: string;

   @Column()
   status_id: string;

   @Column()
   last_updated: string;
}
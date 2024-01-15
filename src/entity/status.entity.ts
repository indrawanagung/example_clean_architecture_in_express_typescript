import {
   BaseEntity,
   Entity,
   Column,
   Unique,
   Timestamp,
   PrimaryGeneratedColumn
} from "typeorm";
import {PrimaryColumn} from "typeorm/browser";
 
@Entity("status")

export class StatusEntity extends BaseEntity{
   @PrimaryColumn()
   id: number;

   @Column()
   status_name: string;
}
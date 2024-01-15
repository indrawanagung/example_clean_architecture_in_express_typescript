import {IsInt, IsString, Length, Max, Min} from "class-validator";

export class NoteCreateOrUpdateRequest {
    @IsString()
    @Length(5)
    task_name: string;

    @IsString()
    @Length(1)
    status_id: string;
}


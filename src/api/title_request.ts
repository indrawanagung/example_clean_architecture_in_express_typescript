import {IsInt, IsString, Length, Max, Min} from "class-validator";

export class TitleRequestFindByIdRequest {

    @IsInt()
    @Min(1)
    id: number;
}

export class TitleRequestDeleteRequest {

    @IsInt()
    @Min(1)
    id: number;
}

export class TitleRequestSaveRequest {
    @IsString()
    @Length(1)
    title_name: string;

    @IsString()
    @Length(1)
    dept_name: string;

    @IsInt()
    @Min(1)
    region_id: number;

    @IsInt()
    @Min(1)
    area_id: number;

}

export class TitleRequestUpdateRequest {
    @IsInt()
    @Min(1)
    id: number;

    @IsString()
    @Length(1)
    title_name: string;

    @IsString()
    @Length(1)
    dept_name: string;

    @IsInt()
    @Min(1)
    region_id: number;

    @IsInt()
    @Min(1)
    area_id: number;

}
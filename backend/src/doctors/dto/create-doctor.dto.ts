import { IsInt, IsString, Length } from "class-validator";

export class CreateDoctorDto {
    @IsInt()
    userID: number;

    @IsString()
    @Length(1, 255)
    speciality: string;
}

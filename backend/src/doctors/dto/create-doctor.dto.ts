import { IsEmail, IsString, Length } from "class-validator";

export class CreateDoctorDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 255)
    speciality: string;
}

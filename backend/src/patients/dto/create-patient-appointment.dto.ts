import { IsString, IsDateString, IsInt } from "class-validator";

export class CreatePatientAppointmentDto {
    @IsInt()
    userID: number;

    @IsInt()
    doctorID: number;

    @IsDateString()
    date: string | Date;

    @IsString()
    user_comment: string;
}

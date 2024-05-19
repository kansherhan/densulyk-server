import { IsString, IsDateString, IsInt } from "class-validator";

export class CreatePatientAppointmentDto {
    @IsInt()
    doctorID: number;

    @IsDateString()
    date: string | Date;

    @IsString()
    userComment: string;
}

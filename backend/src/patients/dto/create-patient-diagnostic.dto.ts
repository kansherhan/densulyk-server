import { IsInt, IsString } from "class-validator";

export class CreatePatientDiagnosticDto {
    @IsInt()
    userID: number;

    @IsString()
    diagnosis_name: string;

    @IsString()
    recommendation: string;
}

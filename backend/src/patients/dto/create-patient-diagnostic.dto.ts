import { IsInt, IsString } from "class-validator";

export class CreatePatientDiagnosticDto {
    @IsInt()
    userID: number;

    @IsString()
    diagnosisName: string;

    @IsString()
    recommendation: string;
}

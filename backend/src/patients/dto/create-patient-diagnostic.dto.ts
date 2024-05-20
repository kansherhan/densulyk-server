import { IsNumberString, IsString } from "class-validator";

export class CreatePatientDiagnosticDto {
    @IsNumberString()
    userID: number;

    @IsString()
    diagnosisName: string;

    @IsString()
    recommendation: string;
}

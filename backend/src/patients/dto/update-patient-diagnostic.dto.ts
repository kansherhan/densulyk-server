import { IsString } from "class-validator";

export class UpdatePatientDiagnosticDto {
    @IsString()
    diagnosisName: string;

    @IsString()
    recommendation: string;
}

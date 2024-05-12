import { IsString } from "class-validator";

export class UpdatePatientDiagnosticDto {
    @IsString()
    diagnosis_name: string;

    @IsString()
    recommendation: string;
}

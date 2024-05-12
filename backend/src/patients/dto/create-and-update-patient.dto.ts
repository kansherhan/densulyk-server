import { IsBoolean, IsInt, IsString, IsNumber } from "class-validator";

export class CreateAndUpdatePatientDto {
    @IsInt()
    userID: number;

    @IsString()
    address: string;

    @IsString()
    phone: string;

    @IsBoolean()
    gender: boolean;

    @IsNumber()
    height: number;

    @IsNumber()
    whole: number;
}

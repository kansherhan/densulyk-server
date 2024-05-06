import { IsString, Length } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @Length(2, 30)
    readonly firstName: string;

    @IsString()
    @Length(2, 30)
    readonly lastName: string;
}

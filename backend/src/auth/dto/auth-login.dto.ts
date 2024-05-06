import { IsEmail, IsString, Length } from "class-validator";

export class AuthLoginDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(6, 255)
    readonly password: string;
}

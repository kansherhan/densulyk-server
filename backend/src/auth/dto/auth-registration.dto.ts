import { IsEmail, IsString, Length } from "class-validator";

export class AuthRegistrationDto {
    @IsString()
    @Length(2, 30)
    readonly firstName: string;

    @IsString()
    @Length(2, 30)
    readonly lastName: string;

    @Length(2, 50)
    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(6, 255)
    readonly password: string;
}

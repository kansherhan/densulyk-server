import { IsInt, IsString } from "class-validator";

export class Auth2FAVerifyDto {
    @IsInt()
    userID: number;

    @IsString()
    code: string;
}

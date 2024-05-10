import { IsInt } from "class-validator";

export class AuthEmailVerifyDto {
    @IsInt()
    userID: number;

    @IsInt()
    code: number;
}

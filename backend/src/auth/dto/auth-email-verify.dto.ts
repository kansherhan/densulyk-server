import { IsInt } from "class-validator";

export class AuthEmailVerifyDto {
    @IsInt()
    code: number;
}

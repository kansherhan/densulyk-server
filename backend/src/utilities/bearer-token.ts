import { Time } from "./time";
import { Hash } from "./hash";
import { UserToken } from "@/users/models/user-tokens.model";

export class BearerToken {
    public static generate(): string {
        const tokenLength = Number(process.env.BACKEND_TOKEN_LENGTH);

        return Hash.generate(tokenLength);
    }

    public static validateTokenLife(userToken: UserToken) {
        if (userToken) {
            const tokenLifetime = Number(process.env.BACKEND_TOKEN_LIFETIME);

            const time =
                Time.getCurrentUnixTime() -
                Time.convertToUnixTime(new Date(userToken.createdAt));

            return time < tokenLifetime;
        }

        return false;
    }
}

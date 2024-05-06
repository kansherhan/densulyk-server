import * as bcrypt from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegistrationDto } from "./dto/auth-registration.dto";

import { User } from "@/users/models/users.model";
import { UsersService } from "@/users/users.service";
import { UserToken } from "@/users/models/user-tokens.model";

import { AuthorizationException } from "@/auth/exceptions/authorization.exception";
import { HasUserException } from "@/auth/exceptions/has-user.exception";
import { BearerToken } from "@/utilities/bearer-token";

@Injectable()
export class AuthService {
    public constructor(
        private readonly usersService: UsersService,

        @InjectModel(UserToken)
        private readonly userTokenModel: typeof UserToken,
    ) {}

    public async login(authLoginDto: AuthLoginDto): Promise<UserToken> {
        const user: User = await this.validateUser(authLoginDto);

        return await this.userTokenModel.create({
            userID: user.id,
            token: BearerToken.generate(),
        });
    }

    public async registration(authRegistrationDto: AuthRegistrationDto) {
        const user = await this.usersService.getUserByEmail(
            authRegistrationDto.email,
        );

        if (user) {
            throw new HasUserException();
        }

        const newUser = await this.usersService.createUser(authRegistrationDto);

        return await this.userTokenModel.create({
            userID: newUser.id,
            token: BearerToken.generate(),
        });
    }

    private async validateUser(dto: AuthLoginDto): Promise<User> {
        const user = await this.usersService.getUserByEmail(dto.email);

        if (user) {
            const passwordEquals = await bcrypt.compare(
                dto.password,
                user.password,
            );

            if (passwordEquals) {
                return user;
            }
        }

        throw new AuthorizationException();
    }
}

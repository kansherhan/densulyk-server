import * as bcrypt from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MailerService } from "@nestjs-modules/mailer";

import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegistrationDto } from "./dto/auth-registration.dto";

import { User } from "@/users/models/users.model";
import { UsersService } from "@/users/users.service";
import { UserToken } from "@/users/models/user-tokens.model";

import { AuthorizationException } from "@/auth/exceptions/authorization.exception";
import { HasUserException } from "@/auth/exceptions/has-user.exception";
import { BearerToken } from "@/utilities/bearer-token";
import { AuthEmailVerifyDto } from "@/auth/dto/auth-email-verify.dto";
import { Random } from "@/utilities/random";

@Injectable()
export class AuthService {
    public constructor(
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,

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

        const userEmailVerificationCode = Random.getRandomInt(
            Number(process.env.BACKEND_CODE_MIN),
            Number(process.env.BACKEND_CODE_MAX),
        );

        const newUser = await this.usersService.createUser(authRegistrationDto);

        await this.usersService.createUserEmailVerification(
            newUser.id,
            userEmailVerificationCode,
        );

        await this.sendEmailVerification(
            newUser.email,
            userEmailVerificationCode,
        );

        return await this.userTokenModel.create({
            userID: newUser.id,
            token: BearerToken.generate(),
        });
    }

    async emailVerify(dto: AuthEmailVerifyDto) {
        const user = await this.usersService.getUserByID(dto.userID);

        if (user) {
            const emailVerification =
                await this.usersService.getLastUserEmailVerification(
                    dto.userID,
                );

            if (emailVerification && emailVerification.code === dto.code) {
                user.emailVerified = true;
                await user.save();
            }
        }
    }

    private async sendEmailVerification(email: string, code: number) {
        return await this.mailerService.sendMail({
            to: email,
            from: process.env.BACKEND_MAIL_USER,
            subject: "Добро пожаловать в DENSAULYK!",
            html: `Ваш код для подтверждения аккаунта: <b>${code}</b>`,
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

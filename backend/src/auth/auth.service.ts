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
import { EmailVerificationErrorException } from "@/auth/exceptions/email-verification-error.exception";
import { Random } from "@/utilities/random";
import { EmailNotVerifyException } from "@/users/exceptions/email-not-verify.exception";
import { UserAuthHistory } from "@/tasks/models/user-auth-history.model";
import { AuthenticatedRequest } from "@/types/requests";
import { ContractsService } from "@/contracts/contracts.service";
import { IAuth2FAResponse } from "@/auth/responses/Auth2FA.response";
import { Auth2FAVerifyDto } from "@/auth/dto/auth-2fa-verify.dto";
import { Auth2FAVerifyException } from "@/auth/exceptions/auth-2fa-verify.exception";

@Injectable()
export class AuthService {
    public constructor(
        private readonly usersService: UsersService,
        private readonly contractsService: ContractsService,
        private readonly mailerService: MailerService,

        @InjectModel(UserToken)
        private readonly userTokenModel: typeof UserToken,

        @InjectModel(UserAuthHistory)
        private readonly userAuthHistoryModel: typeof UserAuthHistory,
    ) {}

    public async login(
        request: AuthenticatedRequest,
        authLoginDto: AuthLoginDto,
    ): Promise<UserToken> {
        const user: User = await this.validateUser(authLoginDto, request);

        const token = await this.userTokenModel.create({
            userID: user.id,
            token: BearerToken.generate(),
        });

        if (user.emailVerified) {
            return token;
        } else {
            throw new EmailNotVerifyException(token);
        }
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

    async emailVerify(dto: AuthEmailVerifyDto): Promise<IAuth2FAResponse> {
        const emailVerification =
            await this.usersService.getLastUserEmailVerification(dto.userID);

        if (!emailVerification || emailVerification.code !== dto.code) {
            throw new EmailVerificationErrorException();
        }

        const user = emailVerification.user;

        user.emailVerified = true;
        await user.save();

        const code2FA = Random.getRandomString(6);

        await this.contractsService.addUser(user.email, code2FA);

        return { code2FA };
    }

    private async sendEmailVerification(email: string, code: number) {
        return await this.mailerService.sendMail({
            to: email,
            from: process.env.BACKEND_MAIL_USER,
            subject: "Добро пожаловать в DENSAULYK!",
            html: `Ваш код для подтверждения аккаунта: <b>${code}</b>`,
        });
    }

    private async validateUser(
        dto: AuthLoginDto,
        request: AuthenticatedRequest,
    ): Promise<User> {
        const user = await this.usersService.getUserByEmail(dto.email);

        if (user) {
            const passwordEquals = await bcrypt.compare(
                dto.password,
                user.password,
            );

            await this.createAuthHistory(request.ip, user.id, passwordEquals);

            if (passwordEquals) {
                return user;
            }
        }

        throw new AuthorizationException();
    }

    private async createAuthHistory(
        ip: string,
        userID: number,
        success: boolean,
    ): Promise<UserAuthHistory> {
        return await this.userAuthHistoryModel.create({
            ip,
            userID,
            isSuccess: success,
        });
    }

    async login2FAVerify(dto: Auth2FAVerifyDto) {
        const user = await this.usersService.getUserByID(dto.userID);

        const isVerify = await this.contractsService.verifyIdentifier(
            user.email,
            dto.code,
        );

        if (!isVerify) {
            throw new Auth2FAVerifyException();
        }
    }
}

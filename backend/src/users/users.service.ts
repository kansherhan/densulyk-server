import * as bcrypt from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { UserToken } from "@/users/models/user-tokens.model";
import { User, UserCreationAttributes } from "./models/users.model";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEmailVerification } from "@/users/models/user-email-verifications.model";
import { Patient } from "@/patients/models/patients.model";
import { Doctor } from "@/doctors/models/doctors.model";

const USER_EXCLUDE_COLUMN: string[] = ["password"];

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,

        @InjectModel(UserEmailVerification)
        private readonly userEmailVerificationsModel: typeof UserEmailVerification,

        @InjectModel(UserToken)
        private readonly userTokenModel: typeof UserToken,
    ) {}

    async getCurrentUser(user: User) {
        return await this.userModel.findOne({
            where: {
                id: user.id,
            },
            attributes: {
                exclude: USER_EXCLUDE_COLUMN,
            },
            include: [Patient, Doctor],
        });
    }

    async getUserByID(userID: number): Promise<User> {
        return await this.userModel.findOne({
            where: {
                id: userID,
            },
            include: { all: true },
            attributes: {
                exclude: USER_EXCLUDE_COLUMN,
            },
        });
    }

    async getUserByEmail(userEmail: string): Promise<User> {
        return await this.userModel.findOne({
            where: {
                email: userEmail,
            },
        });
    }

    async getUserById(userID: number): Promise<User> {
        return await this.userModel.findOne({
            where: {
                id: userID,
            },
        });
    }

    async getUserByAPIToken(userAccessToken: string): Promise<UserToken> {
        return await this.userTokenModel.findOne({
            where: {
                token: userAccessToken,
            },
            include: User,
        });
    }

    async createUser(userData: UserCreationAttributes): Promise<User> {
        const PasswordSalt = Number(process.env.BACKEND_PASSWORD_SALT);

        userData.password = await bcrypt.hash(userData.password, PasswordSalt);

        return await this.userModel.create(userData);
    }

    async createUserEmailVerification(
        userID: number,
        code: number,
    ): Promise<UserEmailVerification> {
        return this.userEmailVerificationsModel.create({
            userID,
            code,
        });
    }

    async getLastUserEmailVerification(
        userID: number,
    ): Promise<UserEmailVerification> {
        return this.userEmailVerificationsModel.findOne({
            where: {
                userID,
            },
            include: User,
            order: [["createdAt", "DESC"]],
        });
    }

    async updateCurrentUser(
        user: User,
        updateUserDto: UpdateUserDto,
    ): Promise<void> {
        await user.update(updateUserDto);
    }
}

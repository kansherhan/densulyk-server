import * as bcrypt from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { UserToken } from "@/users/models/user-tokens.model";
import { User, UserCreationAttributes } from "./models/users.model";
import { UpdateUserDto } from "./dto/update-user.dto";

const USER_EXCLUDE_COLUMN: string[] = ["password"];

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,

        @InjectModel(UserToken)
        private readonly userTokenModel: typeof UserToken,
    ) {}

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

    async getUserByAPIToken(userAccessToken: string): Promise<UserToken> {
        return await this.userTokenModel.findOne({
            where: {
                token: userAccessToken,
            },
            include: {
                all: true,
            },
        });
    }

    async createUser(userData: UserCreationAttributes): Promise<User> {
        const PasswordSalt = Number(process.env.BACKEND_PASSWORD_SALT);

        userData.password = await bcrypt.hash(userData.password, PasswordSalt);

        return await this.userModel.create(userData);
    }

    async updateCurrentUser(
        user: User,
        updateUserDto: UpdateUserDto,
    ): Promise<void> {
        await user.update(updateUserDto);
    }
}

import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { User } from "@/users/models/users.model";

export interface DoctorCreationAttributes {
    userID: number;
    speciality: string;
}

@Table({
    tableName: "doctors",
    timestamps: false,
})
export class Doctor extends Model<Doctor, DoctorCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userID: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    speciality: string;
}

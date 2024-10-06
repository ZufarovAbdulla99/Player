import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'user', timestamps: true})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        defaultValue: "user.svg"
    })
    image: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "user",
    })
    role: string;
}
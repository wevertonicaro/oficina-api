import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}

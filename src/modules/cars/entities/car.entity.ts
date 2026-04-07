import { Client } from "src/modules/clients/entities/client.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    plate: string;

    @Column()
    model: string;

    @Column()
    brand: string;

    @Column()
    year: number;

    @ManyToOne(() => Client, (client) => client.id)
    clientId: number;
}

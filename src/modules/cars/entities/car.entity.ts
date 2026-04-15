import { Client } from "src/modules/clients/entities/client.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cars')
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

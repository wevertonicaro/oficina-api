import { Car } from "src/modules/cars/entities/car.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class Part {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    code: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ManyToMany(() => Car, car => car.id)
    carId: number;
}

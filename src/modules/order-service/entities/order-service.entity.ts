import { Car } from 'src/modules/cars/entities/car.entity';
import { Employee } from 'src/modules/employees/entities/employee.entity';
import { Part } from 'src/modules/parts/entities/part.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('order_services')
export class OrderService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed', 'canceled'], default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Car, (car) => car.id)
  car: Car;

  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @ManyToMany(() => Part)
  @JoinTable()
  parts: Part[];
}
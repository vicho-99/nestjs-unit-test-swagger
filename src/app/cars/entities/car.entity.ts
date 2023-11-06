import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CarCondition } from "../../../core/enums/car-condition.enum";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying', length: 55, nullable: false })
    brand: string;

    @Column({ type: 'character varying', length: 255, nullable: false })
    model: string;

    @Column({ type: 'integer', nullable: false })
    year: number;

    @Column({ type: 'character varying', length: 55, nullable: false })
    color: string;

    @Column({ type: 'numeric', nullable: false })
    mileage: number;

    @Column({ type: 'numeric', nullable: false })
    price: number;

    @Column({ type: 'enum', enum: CarCondition, nullable: false })
    condition: string;



}

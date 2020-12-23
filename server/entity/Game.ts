import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Columns } from "./Columns";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    addedAt!: string;

    @ManyToOne(_=>Columns, column => column.items)
    column!: Columns;
}
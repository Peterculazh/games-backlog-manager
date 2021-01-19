import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity()
export class Columns {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(_ => Game, game => game.column, { nullable: false, eager: true, cascade: true })
    items!: Game[];
}
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Columns } from "./Columns";

@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true, type: "bigint" })
    addedAt!: number;

    @ManyToOne(_ => Columns, column => column.items)
    column!: Columns;

    @BeforeInsert()
    createDate() {
        this.addedAt = Date.now();
    }
}
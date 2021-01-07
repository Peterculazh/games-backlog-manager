import config from "../../config";
import { ColumnsSeed } from "../seed/Columns.seed";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Columns } from "../entity/Columns";

export class Columns1609847539826 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
        try {
            if (!config?.db?.database) {
                throw new Error("There no database name in config. Please type it in ormconfig.json in main folder");
            }

            await getRepository(Columns).save(ColumnsSeed);
        } catch (error) {
            console.log(`Happen error during migration. Error: ${error}`);
        }
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}

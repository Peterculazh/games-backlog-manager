import config from "../../config";
import { ColumnsSeed } from "../seed/Columns.seed";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Columns } from "../entity/Columns";

export class Columns1609847539826 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
        try {
            if (!config?.db?.database) {
                console.log("There no database name in config. Please type it config");
                return;
            }

            // const dbName = config.db.database;

            await getRepository(Columns).save(ColumnsSeed);
        } catch (error) {
            console.log(`Happen error during migration. Error: ${error}`);
        }
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}

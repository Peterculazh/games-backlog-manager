import { Columns } from "../entity/Columns";
// import { Game } from "../entity/Game";
import ServerContext from "../ServerContext";

export default class ColumnsService extends ServerContext {

    public async getAllColumns() {
        const columnRepository = this.di.db.connection.getRepository(Columns);
        return await columnRepository.find();
    }

    public async addColumn(data: any) {
        const columnRepository = this.di.db.connection.getRepository(Columns);
        return await columnRepository.save({...data});
    }

}
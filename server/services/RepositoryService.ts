import { Repository } from "typeorm";
import { IServerContainer } from "../container";
import { Columns } from "../entity/Columns";
import { Game } from "../entity/Game";
import ServerContext from "../ServerContext";

export default class MainService extends ServerContext {

    public ColumnsRepository: Repository<Columns>;
    public GameRepository: Repository<Game>;

    constructor(options: IServerContainer){
        super(options);
        this.ColumnsRepository = this.di.db.connection.getRepository(Columns);
        this.GameRepository = this.di.db.connection.getRepository(Game);
    }

}
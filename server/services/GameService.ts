import { Columns } from "../entity/Columns";
import { Game } from "../entity/Game";
import ServerContext from "../ServerContext";

export default class GameService extends ServerContext {

    public async getAllGames() {
        const gameRepository = this.di.db.connection.getRepository(Game);
        return await gameRepository.find();
    }

    public async addGame(data: any) {
        const gameRepository = this.di.db.connection.getRepository(Game);
        const columnRepository = this.di.db.connection.getRepository(Columns);
        const backLogColumn = await columnRepository.findOne({ name: "Backlog" });
        if (backLogColumn) {
            const game = new Game();
            game.name = data.name;
            const savedGame = await gameRepository.save(game);
            backLogColumn.items.push(savedGame);
            await columnRepository.save(backLogColumn);
            return savedGame;
        }
        throw new Error("No initial column");
    }

}
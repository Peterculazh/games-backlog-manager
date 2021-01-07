import { Game } from "../entity/Game";
import ServerContext from "../ServerContext";

export default class GameService extends ServerContext {

    public async getAllGames() {
        return await this.di.RepositoryService.GameRepository.find();
    }

    public async addGame(data: any) {
        const gameRepository = this.di.RepositoryService.GameRepository;
        const columnRepository = this.di.RepositoryService.ColumnsRepository;
        const backLogColumn = await columnRepository.findOne({ name: "Backlog" });
        if (backLogColumn) {
            const game = new Game();
            game.name = data.name;
            game.column = backLogColumn;
            const savedGame = await gameRepository.save(game);
            return savedGame;
        }
        throw new Error("No initial column");
    }

}
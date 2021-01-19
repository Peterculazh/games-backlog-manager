import { Game } from "../entity/Game";
import CustomError, { ERROR_CODE } from "../helper/error";
import ServerContext from "../ServerContext";

export default class GameService extends ServerContext {

    public async getAllGames() {
        return await this.di.RepositoryService.GameRepository.find();
    }

    public async addGame(data: { column: string, name: string }) {
        if (data.column && data.name) {
            const gameRepository = this.di.RepositoryService.GameRepository;
            const columnRepository = this.di.RepositoryService.ColumnsRepository;
            const backLogColumn = await columnRepository.findOne({ id: Number(data.column) });
            if (backLogColumn) {
                const game = new Game();
                game.name = data.name;
                game.column = backLogColumn;
                game.index = backLogColumn.items.length;
                const savedGame = await gameRepository.save(game);
                return savedGame;
            } else {
                throw new CustomError({
                    code: ERROR_CODE.E1,
                    message: "Column not found"
                }, `Column not found in "addGame"`);
            }
        } else {
            throw new CustomError({
                code: ERROR_CODE.E1,
                message: "Incorrect data"
            }, `Incorrect data in "addGame"`);
        }
    }

    public async moveGame(data: any){
        console.log("moveGame", data);
    }

}
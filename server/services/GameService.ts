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

    public async moveGame(data: {
        sourceIndex: number;
        sourceColumnId: number;
        draggableId: number;
        targetColumnId: number;
        destinationIndex: number;
    }) {
        if (data.sourceColumnId && data.targetColumnId) {
            if (data.sourceColumnId === data.targetColumnId) {
                const [game, sourceColumn] = await Promise.all([
                    this.di.RepositoryService.GameRepository.findOne({ id: data.draggableId }),
                    this.di.RepositoryService.ColumnsRepository.findOne({ id: data.sourceColumnId })
                ]);
                if (game && sourceColumn) {
                    sourceColumn.items.splice(data.sourceIndex, 1);
                    sourceColumn.items.splice(data.destinationIndex, 0, game);
                    const test = await this.di.RepositoryService.ColumnsRepository.save(sourceColumn);
                    console.log("source", test);
                    this.di.RepositoryService.GameRepository.save(game);
                    return true;
                }
            } else {
                const [game, sourceColumn, targetColumn] = await Promise.all([
                    this.di.RepositoryService.GameRepository.findOne({ id: data.draggableId }),
                    this.di.RepositoryService.ColumnsRepository.findOne({ id: data.sourceColumnId }),
                    this.di.RepositoryService.ColumnsRepository.findOne({ id: data.targetColumnId }),
                ]);
                if (game && sourceColumn && targetColumn) {
                    sourceColumn.items.splice(data.sourceIndex, 1);
                    targetColumn.items.splice(data.destinationIndex, 0, game);
                    console.log('target', targetColumn);
                    await this.di.RepositoryService.ColumnsRepository.save(sourceColumn);
                    await this.di.RepositoryService.ColumnsRepository.save(targetColumn);
                    this.di.RepositoryService.GameRepository.save(game);
                    return true;
                }
            }
        }
        return false;
    }

}
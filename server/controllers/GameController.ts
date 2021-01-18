import { GET, POST, route } from "awilix-express";
import { Request, Response } from 'express';
import CustomError, { ERROR_CODE } from "../helper/error";
import ServerContext from "../ServerContext";

@route('/api/games')
export default class RenderController extends ServerContext {

    @GET()
    @route('/all')
    async allGames(_: Request, res: Response) {
        try {
            const { GameService } = this.di;
            const games = await GameService.getAllGames();
            return res.answer({ games });
        } catch (error) {
            console.log(error);
            return res.answer({ error }, "Happened error", 500);
        }
    }

    @POST()
    @route('/add')
    async addGame(req: Request, res: Response) {
        try {
            const { GameService } = this.di;
            const game = await GameService.addGame(req.body);
            return res.answer({ game });
        } catch (error) {
            if (error instanceof CustomError) {
                if (error.code === ERROR_CODE.E1) {
                    return res.answer({ error: error.error_message }, error.error_message, 400);
                }
            } else {
                return res.answer({ error }, "Happened error", 500);
            }
        }
    }
}
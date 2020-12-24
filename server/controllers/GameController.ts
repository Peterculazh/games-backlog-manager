import { GET, POST, route } from "awilix-express";
import { Request, Response } from 'express';
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
            console.log(error);
            return res.answer({ error }, "Happened error", 500);
        }
    }
}
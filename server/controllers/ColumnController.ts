import { GET, POST, route } from "awilix-express";
import { Request, Response } from 'express';
import ServerContext from "../ServerContext";

@route('/api/columns')
export default class RenderController extends ServerContext {

    @GET()
    @route('/all')
    async allColumns(_: Request, res: Response) {
        try {
            const { ColumnService } = this.di;
            const columns = await ColumnService.getAllColumns();
            return res.answer({ columns });
        } catch (error) {
            console.log(error);
            return res.answer({ error }, "Happened error", 500);
        }
    }

    @POST()
    @route('/add-column')
    async addColumn(req: Request, res: Response) {
        try {
            const { ColumnService } = this.di;
            const column = await ColumnService.addColumn(req.body);
            return res.answer({ columns: column });
        } catch (error) {
            console.log(error);
            return res.answer({ error }, "Happened error", 500);
        }
    }
}
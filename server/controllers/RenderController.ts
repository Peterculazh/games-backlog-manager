import { GET, route } from "awilix-express";
// import { classToPlain } from "class-transformer";
import { Request, Response } from 'express';
import ServerContext from "../ServerContext";

@route('')
export default class RenderController extends ServerContext {

    @GET()
    @route('/')
    async indexPage(_: Request, res: Response) {
        try {
            // const { ColumnService } = this.di;
            // const columns = await ColumnService.getAllColumns();
            // console.log(columns);
            return res.print('/', { test: "test" });
        } catch (error) {
            console.log(error);
            return res.print('/', { error });
        }
    }
}
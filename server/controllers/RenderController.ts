import { GET, route } from "awilix-express";
import { Request, Response } from 'express';
import ServerContext from "../ServerContext";

@route('')
export default class RenderController extends ServerContext {

    @GET()
    @route('/')
    async indexPage(_: Request, res: Response) {
        return res.print('/', { test: "test" });
    }
}
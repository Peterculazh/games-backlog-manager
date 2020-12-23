import express, { Request, Response } from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import config from '../config';
import { loadControllers, scopePerRequest } from 'awilix-express';
import { IServerContainer } from './container';
import ServerContext from './ServerContext';
import Server from 'next/dist/next-server/server/next-server';
import { NextFunction } from "express-serve-static-core";
import { AwilixContainer } from "awilix";
import { parse } from 'url';


export default class ExpressServer extends ServerContext {

  private app: Server;
  private context!: AwilixContainer;
  public get nextApp() { return this.app; }

  public setContainer(value: AwilixContainer) {
    this.context = value;
  }

  constructor(opts: IServerContainer) {
    super(opts);
    this.app = next({ dev: config.dev });
    this.nextMiddleware = this.nextMiddleware.bind(this);
  }

  public async initialize() {
    // in case unit testing we need to turn off Next.JS
    this.app.prepare().then(() => {
      const handle = this.app.getRequestHandler();
      const server = express();

      server.use(cookieParser());
      server.use(bodyParser.json({ limit: '10mb' }));
      server.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
      server.use(cookieSession({
        name: 'session',
        keys: [config.jwtSecret],
        maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days
      }));
      server.use(this.nextMiddleware);
      server.use(scopePerRequest(this.context));

      const files = 'controllers/**/*.ts';
      server.use(loadControllers(files, { cwd: __dirname }));

      server.all('*', (req: Request, res: Response) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      });

      server.listen(config.port, (err: string) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${config.port}`)
      });
    }).catch(err => console.log("On starting NEXT.JS APP happened error - ", err));
  }

  private nextMiddleware(req: Request, res: Response, next: NextFunction) {
    res.print = (
      pathName: string,
      ssrData: any
    ) => {
      this.nextApp.render(req, res, pathName, { ...req.params, ...req.query, ssrData });
    };


    next();
  }
}


  // const app = next({ dev: config.dev });
  // const handle = app.getRequestHandler();

  // app.prepare().then(() => {
  //   const server = express();

  //   server.use(cookieParser());
  //   server.use(bodyParser.json({ limit: '10mb' }));
  //   server.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
  //   server.use(cookieSession({
  //     name: 'session',
  //     keys: [config.jwtSecret],
  //     maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days
  //   }));
  //   server.use(scopePerRequest(container));


  //   const files = 'controllers/**/*.' + (config.dev ? 'ts' : 'js');
  //   server.use(loadControllers(files, { cwd: __dirname }));

  //   server.all('*', (req: Request, res: Response) => {
  //     return handle(req, res)
  //   });

  //   server.listen(config.port, (err: string) => {
  //     if (err) throw err
  //     console.log(`> Ready on http://localhost:${config.port}`)
  //   })
  // });


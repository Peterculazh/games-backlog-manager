import { IServerContainer } from "./container";

declare global {
    namespace Express {
        interface Response {
            print: (pagePath: string, ssrData: any) => void;
        }
    }
}

export default class ServerContext {
    protected di: IServerContainer;

    constructor(options: IServerContainer) {
        this.di = options;
    }
}
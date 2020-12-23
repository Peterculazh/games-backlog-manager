import * as awilix from 'awilix';
import ExpressServer from './server';
import config from '../config';
import DataBase from './db';

export interface IServerContainer {
    config: any;
    server: ExpressServer;
    db: DataBase
}

const container = awilix.createContainer<IServerContainer>({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    config: awilix.asValue(config),
    server: awilix.asClass(ExpressServer).singleton(),
    db: awilix.asClass(DataBase).singleton(),
});


export default container;
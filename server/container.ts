import * as awilix from 'awilix';
import ExpressServer from './server';
import config from '../config';
import DataBase from './db';
import services, { IServicesContainer } from './services';

export interface IServerContainer extends IServicesContainer {
    config: any;
    server: ExpressServer;
    db: DataBase
}

const container = awilix.createContainer<IServerContainer>({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    ...services,
    config: awilix.asValue(config),
    server: awilix.asClass(ExpressServer).singleton(),
    db: awilix.asClass(DataBase).singleton(),
});


export default container;
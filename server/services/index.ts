import { asClass } from 'awilix';
import RepositoryService from './RepositoryService';
import ColumnsService from './ColumnService';
import GameService from './GameService';

export interface IServicesContainer{
    GameService: GameService,
    ColumnService: ColumnsService,
    RepositoryService: RepositoryService,
}

export default {
    GameService: asClass(GameService).singleton(),
    ColumnService: asClass(ColumnsService).singleton(),
    RepositoryService: asClass(RepositoryService).singleton(),
}
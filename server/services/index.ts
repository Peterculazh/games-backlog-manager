import { asClass } from 'awilix';
import ColumnsService from './ColumnService';
import GameService from './GameService';

export interface IServicesContainer{
    GameService: GameService,
    ColumnService: ColumnsService,
}

export default {
    GameService: asClass(GameService).singleton(),
    ColumnService: asClass(ColumnsService).singleton(),
}
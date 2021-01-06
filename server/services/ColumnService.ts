import MainService from "./RepositoryService";

export default class ColumnsService extends MainService {

    public async getAllColumns() {
        return await this.di.RepositoryService.ColumnsRepository.find();
    }

    public async addColumn(data: any) {
        return await this.di.RepositoryService.ColumnsRepository.save({ ...data });
    }

}
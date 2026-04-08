import { Storage } from './Storage'

export class AbstractRepository {
    protected storage = Storage.getInstance();

    constructor() {}

    public create = (_data: any) => {}
    public findAll = () => {}
    public find = (_id: string) => {}
    public update = (_id: string) => {}
    public delete = (_id: string) => {}
}
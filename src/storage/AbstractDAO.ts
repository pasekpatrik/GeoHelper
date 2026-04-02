import { Storage } from './Storage'

export class AbstractDAO {
    protected storage = Storage.getInstance();

    constructor() {}

    public create = (data: any) => {}
    public findAll = () => {}
    public find = (id: string) => {}
    public update = (id: string) => {}
    public delete = (id: string) => {}
}
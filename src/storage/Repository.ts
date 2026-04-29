import { AbstractRepository } from './AbstractRepository';

export class Repository extends AbstractRepository {
    private key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }
    
    public override create = (data: object) => {
        this.storage.setItem(this.key, data);
    }

    public override findAll = () => {
        const data = this.storage.getItems(this.key);
        
        return Array.isArray(data) ? data : [];
    }

    public override find = (id: string) => {
        return this.findAll().find(item => item.id === id);
    }

    public override update = (id: string, newData: object) => {
        const data = this.findAll()

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i] = newData
            }
        }
       
        this.storage.setItems(this.key, data);
    }

    public override delete = (id: string) => {
        const data = this.findAll();

        const result = data.filter((item) => item.id !== id);

        this.storage.setItems(this.key, result);
    }
}
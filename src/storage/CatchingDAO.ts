import { AbstractDAO } from "./AbstractDAO";
import { type CatchingInterface } from "../types/CatchingInterface";

export class CatchingDAO extends AbstractDAO {
    private key: string = 'catching';
    
    public override create = (data: CatchingInterface) => {
        this.storage.setItem(this.key, data);
    }

    public override findAll = (): CatchingInterface[] => {
        const data = this.storage.getItems(this.key);
        
        return Array.isArray(data) ? data : [];
    }

    public override find = (id: string): CatchingInterface | undefined => {
        return this.findAll().find(item => item.id === id);
    }

    // public override update: (id: string) => void;

    // public override delete: (id: string) => void;
}
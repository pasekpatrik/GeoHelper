import { CatchingDAO } from '../storage/CatchingDAO';

export class CatchingService {
    private catchingDAO = new CatchingDAO();

    public createCatching = (id: string, name: string) => {
        this.catchingDAO.create({
            id: id,
            name: name
        })
    }

    public getCatching = (id: string) => {
        return this.catchingDAO.find(id);
    }

    public getAllCatchings = () => {
        return this.catchingDAO.findAll();
    }

    public getParams = (param: string) => {
        let params = new URLSearchParams(document.location.search);
        return params.get(param); 
    }
}
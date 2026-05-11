import { Repository } from '../storage/Repository';
import { decimalToDegrees } from '../utils/calculator';

export class CatchingService {
    private repository = new Repository('catching');

    public createCatching = (id: string, name: string, latitude: number | null, longitude: number | null, isCatch: boolean) => {
        this.repository.create({
            id: id,
            name: name,
            latitude: latitude,
            longitude: longitude,
            isCatch: isCatch
        })
    }

    public getCatching = (id: string) => {
        return this.repository.find(id);
    }

    public getAllCatchings = () => {
        return this.repository.findAll();
    }

    public deleteCatching = (id: string) => {
        this.repository.delete(id);
    }

    public updateCatching(id: string, data: object) {
        this.repository.update(id, data);
    }

    public getParams = (param: string) => {
        let params = new URLSearchParams(document.location.search);
        return params.get(param);
    }

    public convertInputToDegree = (input: HTMLInputElement) => {
        const rawValue = input.value.trim();

        const matches = rawValue.match(/\d+(\.\d+)?/g);

        if (!matches) {
            return 0;
        }
        const coordinates = matches.map(num => Number(num));

        return decimalToDegrees(
            coordinates[0] ?? 0,
            coordinates[1] ?? 0,
            coordinates[2] ?? 0
        );
    }
}
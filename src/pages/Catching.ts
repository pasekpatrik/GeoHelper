import { CatchingService } from '../service/CatchingService';
import { type CatchingInterface } from '../types/CatchingInterface';
import Page from './Page';

export class Catching extends Page {
    private catchingService = new CatchingService();

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    public pageIsAvailable = () => {
       
    }

    override render = () => {
        const id: string = this.catchingService.getParams('id') ?? '';
        const catching: CatchingInterface | undefined = this.catchingService.getCatching(id);

        return `
            <h1>${catching?.name}</h1>
        `;
    }
}
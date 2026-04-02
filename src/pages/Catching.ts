import { CatchingService } from '../service/CatchingService';
import Page from './Page';

export class Catching extends Page {
    private catchingService = new CatchingService();

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    public pageIsAvailable = () => {
        const id: string = this.catchingService.getParams('id') ?? '';
        const catching = this.catchingService.getCatching(id)

        console.log(catching);
    }

    override render = () => {
        return `
            <div>Catching</div>
        `;
    }
}
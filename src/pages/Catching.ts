import Page from './Page';

export class Catching extends Page {

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    override render = () => {
        return `
            <div>Cathing</div>
        `;
    }
}
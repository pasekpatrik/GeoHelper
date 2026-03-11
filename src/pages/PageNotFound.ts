import Page from './Page';

export class PageNotFound extends Page {

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    override render = () => {
        return `
            <div>PageNotFound</div>
        `;
    }
}
import Page from './Page';
import { Storage } from '../utils/Storage';

export class Catching extends Page {
    private storage = Storage.getInstance();

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    public createCatching = () => {
        this.storage.setItem("catching", {
            id: 123,
            name: "les"
        })
    }

    override pageIsAvailable = () => {
        const url = new URL(window.location.href);
        const param = url.searchParams.get('item') ?? this.createCatching();
    
    }

    override render = () => {
        return `
            <div>Catching</div>
        `;
    }
}
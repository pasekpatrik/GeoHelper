import './Settings.css';
import Page from '../Page';

export class Settings extends Page {

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    override render = () => {
        return `
            <input id="custom-checkbox-input" type="checkbox">
	        <label id="custom-checkbox" for="custom-checkbox-input"></label>
        `;
    }
}
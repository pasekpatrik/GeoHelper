export class Storage {
    private key: string;

    constructor(key: string) {
        this.key = key;
        localStorage.setItem(key, JSON.stringify([]));
    }

    public setItem = (item: object) => {
        if (!Object.keys(item).length) {
            console.warn('Warn: item is empty');
            return;
        }

        let data = this.getItems();
        // @ts-ignore
        data.push(item);
     
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    public getItems = () : object | void => {
        let data = localStorage.getItem(this.key);

        if (!data) {
            console.warn('Warn: data does not exist');
            return;
        }

        return JSON.parse(data);
    }

    public clear = () => {
        localStorage.clear()
    }

    public getKey = () => {
        return this.key;
    }
}
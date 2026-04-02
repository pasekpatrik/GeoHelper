export class Storage {
    private static instance: Storage | null = null;

    private constructor () {}

    public static getInstance() {
        if (this.instance === null) this.instance = new Storage();

        return this.instance;
    }

    public setItem = (key: string, item: object) => {
        if (!Object.keys(item).length) {
            console.warn('Warn: item is empty');
            return;
        }

        if (!this.getItems(key)) localStorage.setItem(key, JSON.stringify([]));

        let data = this.getItems(key);
        // @ts-ignore
        data.push(item);
     
        localStorage.setItem(key, JSON.stringify(data));
    }

    public getItems = (key: string) : object | void => {
        let data = localStorage.getItem(key);

        if (!data) {
            console.warn('Warn: data does not exist');
            return;
        }

        return JSON.parse(data);
    }

    public clear = () => {
        localStorage.clear()
    }
}
import App from './app/App';

const root: HTMLElement = document.getElementById('root') ?? document.createElement('div');
const app = App.getInstance()

app.run(root)
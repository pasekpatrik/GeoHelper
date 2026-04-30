import App from './app/App';

const root = document.getElementById('root') as HTMLElement;
const app = App.getInstance();

app.run(root);
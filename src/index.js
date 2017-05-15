import { render } from 'inferno';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const history = createBrowserHistory();

render((<App history={history}/>), document.getElementById('app'));

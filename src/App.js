import { Router } from 'inferno-router';
import Component from 'inferno-component';
import axios from 'axios';
import routes from './routes';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3001/api';

class App extends Component {
  render({ history }) {
    return(
      <Router history={history}>
        {routes}
      </Router>
    );
  }
}

export default App;
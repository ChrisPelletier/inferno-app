import { Router } from 'inferno-router';
import Component from 'inferno-component';
import axios from 'axios';
import AuthService from './utils/AuthService';
import routes from './routes';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.headers.common['Authorization'] = 
					'Bearer ' + AuthService.getAccessToken();

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
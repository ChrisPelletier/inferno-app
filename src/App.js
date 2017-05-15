import { Router } from 'inferno-router';
import Component from 'inferno-component';
import routes from './routes';
import './App.css';

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
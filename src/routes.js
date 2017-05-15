import { IndexRoute, Route } from 'inferno-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';

export default (
	<Route component={ Layout }>
        <IndexRoute component={ Home }/>
    </Route>
)
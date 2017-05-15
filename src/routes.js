import { IndexRoute, Route } from 'inferno-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import DinoList from './components/DinoList/DinoList';
import About from './components/About/About';
import AuthService from './utils/AuthService';

function checkLoggin(props) {
	if (!AuthService.isLoggedIn()) {
		props.router.push('/');
	}
}

let routes = [
	{
		path: '/about',
		component: About
	},
	{
		path: '/dinosaurs',
		component: DinoList,
		onEnter: checkLoggin
	}
];

export default (
	<Route component={ Layout }>
        <IndexRoute component={ Home }/>
        {
        	routes.map((route) => (
        		<Route path={route.path}
        			   component={route.component}
        			   onEnter={route.onEnter}/>
        	))
        }
    </Route>
)
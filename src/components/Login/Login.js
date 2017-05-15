import { linkEvent } from 'inferno';
import Component from 'inferno-component';
import AuthService from './../../utils/AuthService'

class Login extends Component {
	render() {
		return(
			<a onClick={linkEvent(this, AuthService.login)}>Log In</a>
		);
	}
}

export default Login;
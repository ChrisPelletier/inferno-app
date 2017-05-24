import { linkEvent } from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import axios from 'axios';
import AuthService from './../../utils/AuthService';
import Login from './../Login/Login';
import UserNavItem from './../UserNavItem/UserNavItem';

class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      idToken: AuthService.getIdToken(),
      profile: AuthService.getProfile(),
      isLoggedIn: AuthService.isLoggedIn()
    };
  }

  componentWillMount () {
    this.auth0 = AuthService.createWebAuthInstance();
    this.setState({
      idToken: AuthService.getIdToken(),
      profile: AuthService.getProfile(),
      isLoggedIn: AuthService.isLoggedIn()
    })
    axios.interceptors.response.use(
      (response) => {
        return response;
      }, (error) => {
        if (error.response.status === 401) {
          AuthService.logOut(this);
        }
        return Promise.reject(error);
      });
  }

  componentDidMount() {
    AuthService.parseHash(this);
  }

  render(props, state) {
    return(
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {
              state.isLoggedIn ? (
                <ul class="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/dinosaurs">Dinosaurs</Link></li>
                </ul>
              ) : (
                <ul class="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
              ) 
            }
            {
              !state.isLoggedIn ? (
                <ul class="nav navbar-nav navbar-right">
                  <li><Login auth0={this.auth0} /></li>
                </ul>
              ) : (
                <ul class="nav navbar-nav navbar-right">
                  <li><UserNavItem profile={ state.profile } /></li>
                  <li><a onClick={linkEvent(this, AuthService.logOut)}>Log out</a></li>
                </ul>
              )
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
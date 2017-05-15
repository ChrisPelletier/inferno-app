// src/utils/AuthService.js

import auth0 from 'auth0-js';

function login(instance) {
	console.log(instance);
	instance.props.auth0.authorize({
		responseType: 'token id_token',
		redirectUri: 'http://localhost:3000/',
		audience: 'http://localhost:3001/api/',
		scope: 'openid profile'
	});
}

function logOut(instance) {
	instance.setState({
		idToken: null,
		profile: null
	});

	localStorage.removeItem('id_token');
	localStorage.removeItem('access_token');
	localStorage.removeItem('profile');
}

function createWebAuthInstance() {
	return new auth0.WebAuth({
		clientID: 'C1L0hZdZf4eMJizNwBl5sGqQOSSytSHF',
		domain: 'cpelletier.auth0.com'
	});
}

function parseHash(instance) {
	instance.auth0.parseHash((err, authResult) => {
		if(authResult && authResult.idToken && authResult.accessToken) {
			// Retrieve the users profile.
			instance.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
				instance.setState({
					idToken: authResult.idToken,
					profile: profile
				});

				localStorage.setItem('id_token', instance.state.idToken);
				localStorage.setItem('access_token', instance.state.accessToken);
				localStorage.setItem('profile', JSON.stringify(profile));
			}); 
		}
	});
}

const AuthService = { login, logOut, createWebAuthInstance, parseHash };
export default AuthService;
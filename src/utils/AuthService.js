// src/utils/AuthService.js

import auth0 from 'auth0-js';

const AuthService = { 
	login, 
	logOut, 
	isLoggedIn,
	createWebAuthInstance, 
	parseHash, 
	getIdToken,
	getAccessToken,
	getProfile
};

function login(instance) {
	let redirectUri = 'http://localhost:3000' + instance.context.router.location.pathname;
	instance.props.auth0.authorize({
		responseType: 'token id_token',
		redirectUri: redirectUri,
		audience: 'http://localhost:3001/api/',
		scope: 'openid profile'
	});
}

function logOut(instance) {
	instance.setState({
		idToken: null,
		profile: null,
		isLoggedIn: null
	});

	localStorage.removeItem('id_token');
	localStorage.removeItem('access_token');
	localStorage.removeItem('profile');
	instance.context.router.push('/');
}

function isLoggedIn() {
	return getIdToken() && getAccessToken() && getProfile();
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
				profile.updated_at = new Date(profile.updated_at).getTime();
				instance.setState({
					idToken: authResult.idToken,
					profile: profile,
					isLoggedIn: true
				});
				localStorage.setItem('id_token', instance.state.idToken);
				localStorage.setItem('access_token', authResult.accessToken);
				localStorage.setItem('profile', JSON.stringify(profile));
				instance.context.router.push(instance.context.router.location.pathname);
			}); 
		}
	});
}

function getIdToken() {
	return localStorage.getItem('id_token');
}

function getAccessToken() {
	return localStorage.getItem('access_token');
}

function getProfile() {
	let profile = JSON.parse(localStorage.getItem('profile'));
	if (profile) {
		profile.updated_at = new Date(profile.updated_at).toDateString();
	}
	return profile;
}

export default AuthService;
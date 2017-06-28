// @flow
import auth0 from 'auth0-js';
import config from '../Config/config';
import history from '../history';
import firebase from 'firebase';

export default class Auth {
    userProfile;
    requestedScopes = 'openid profile atmadmin';

    auth0 = new auth0.WebAuth({
        domain: config.AUTH_CONFIG.domain,
        clientID: config.AUTH_CONFIG.clientId,
        redirectUri: config.AUTH_CONFIG.callbackUrl,
        audience: config.AUTH_CONFIG.apiUrl,
        responseType: 'token id_token',
        scope: this.requestedScopes
    });


    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.userHasScopes = this.userHasScopes.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.authFetch = this.authFetch.bind(this);
        this.firebase = firebase.initializeApp(config.FIREBASE_CONFIG);
        const delegationToken = localStorage.getItem('delegation');
        if (delegationToken && delegationToken !== 'undefined') {
            firebase.auth().signInWithCustomToken(delegationToken).catch(console.error);
        }
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                const Authentication = new auth0.Authentication({domain: config.AUTH_CONFIG.domain, clientID: config.AUTH_CONFIG.clientId});
                Authentication.delegation({
                    id_token: authResult.idToken,
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    apiType: 'firebase'
                }, (err, res) => {
                    localStorage.setItem('delegation', res.idToken);
                });
                this.setSession(authResult);
                history.replace('/atm/');
            } else if (err) {
                history.replace('/atm/');
                console.log(err);
            }
        });
    }

    setSession(authResult) {
        let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        const scopes = authResult.scope || this.requestedScopes || '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
        localStorage.setItem('delegation', authResult.delegation);
        history.replace('/atm/');
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }

    getProfile(cb) {
        let accessToken = this.getAccessToken();
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('scopes');
        this.userProfile = null;
        firebase.auth().signOut();
        // navigate to the home route
        history.replace('/atm/');
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    userHasScopes(scopes) {
        const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
        return scopes.every(scope => grantedScopes.includes(scope));
    }

    authFetch(url, options) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Bearer ' + this.getAccessToken();
        }

        return fetch(url, {headers, ...options})
            .then(this.checkStatus)
            .then(response => response.json());
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}

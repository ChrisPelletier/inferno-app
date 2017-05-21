// src/utils/ApiService.js
import AuthService from './AuthService';
import axios from 'axios';

const API = 'http://localhost:3001/api/';

// GET list of all dinosaurs from API
function getDinoList() { 
  return axios.get(`${API}dinosaurs`, {
      headers: {
        'Authorization': 'Bearer ' + AuthService.getAccessToken()
      },
      responseType: 'json'
    })
    .then(_verifyResponse)
    .catch(_handleError);
}

// GET a dinosaur's detail info from API by ID
function getDino(id) {
  return axios.get(`${API}dinosaur/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + AuthService.getAccessToken()
      },
      responseType: 'json'
    })
    .then(_verifyResponse)
    .catch(_handleError);
}

// Verify that the fetched response is JSON
function _verifyResponse(res) {
  let contentType = res.headers['content-type'];

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.data;
  } else {
    _handleError({ message: 'Response was not JSON'});
  }
}

// Handle fetch errors
function _handleError(error) {
  console.error('An error occurred:', error);
  if (error.response) {
    console.log(error.response.status === 401);
    if(error.response.status === 401) {
      AuthService.logOut();
    }
  }
  throw error;
}

// Export ApiService
const ApiService = { getDinoList, getDino };
export default ApiService;
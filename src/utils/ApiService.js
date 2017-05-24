// src/utils/ApiService.js

import axios from 'axios';

// GET list of all dinosaurs from API
function getDinoList() { 
  return axios.get(`/dinosaurs`)
    .then(_verifyResponse, _handleError);
}

// GET a dinosaur's detail info from API by ID
function getDino(id) {
  return axios.get(`/dinosaur/${id}`)
    .then(_verifyResponse, _handleError);
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
  console.error('An error occurred:', error.response);
  throw error.response;
}

// Export ApiService
const ApiService = { getDinoList, getDino };
export default ApiService;
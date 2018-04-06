/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { handleApiErrors } from './api-errors'

//////////////////////////////////// Helpers ///////////////////////////////////
const handleRequest = (request) => {
  return request.then(response =>{
    // console.log(response);
    if (response.ok) {
      // Request succeeded, but did not return any data
      if (response.status === 204) {
        return Promise.resolve(response)
      }
      return response.json().then(json => {
        // console.log(json)
        return Promise.resolve(json)
      })
    } else {
      return response.json().then(json => {
        // This is due to the structure of the error response sent by django
        // console.log(json)
        var errors = []
        // Future: send code so we redirect to global 404 page?
        if (response.status === 404) {
          errors.push("This is not the page you're looking for")
        } else {
          for (var field in json) {
            for (var err in json[field]) {
              var msg = field + ": " + json[field][err]
              // console.log(msg);
              errors.push(msg)
            }
          }
        }
        return Promise.reject(errors)
      })
    }
  })
  .catch(errors => {
    // Catches rejected promises from the .then block as well
    // Check to see if error is from js or django
    errors = errors.message ?
      [errors.message] :
      errors
    // console.log(errors)
    return Promise.reject(errors)
  })
}

const auth = (token) => token ? `JWT ${token}` : undefined

const makeFormData = (data) => {
  var body = new FormData()
  for (var entry in data) {
    if (data.hasOwnProperty(entry)
        && data[entry]) {
      body.append(entry, data[entry])
    }
  }
  return body
}
///////////////////// Fetch functions /////////////////////////////////////////

const apiGet = (url, token) => {

  // call to the "fetch".  this is a "native" function for browsers
  // that's conveniently polyfilled in create-react-app if not available
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth(token), // will throw an error if no login
    },
  })
  return handleRequest(request)
}

const apiPost = (url, payload, token) => {

  // Fill form data object with the data from the request
  var body = new FormData()
  for (var entry in payload) {
    if (payload.hasOwnProperty(entry)) {
      body.append(entry, payload[entry])
    }
  }
  // Specifying content type prevents form data from working
  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': auth(token), // will throw an error if no login
    },
    body,
  })
  return handleRequest(request)
}

const apiPut = (url, payload, token) => {

  const body = makeFormData(payload)
  // Specifying content type prevents form data from working
  const request = fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': auth(token), // will throw an error if no login
    },
    body,
  })
  return handleRequest(request)
}

const apiDelete = (url, token) => {

  // call to the "fetch".  this is a "native" function for browsers
  // that's conveniently polyfilled in create-react-app if not available
  const request = fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth(token), // will throw an error if no login
    },
  })
  return handleRequest(request)
}

export { apiPost, apiGet, apiDelete, apiPut, }

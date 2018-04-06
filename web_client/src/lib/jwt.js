/* eslint-disable */
/*
 * jwt-simple
 *
 * JSON Web Token encode and decode module for node.js
 *
 * Copyright(c) 2011 Kazuhito Hokamura
 * Copyright(c) 2017 Steven Rofrano
 * MIT Licensed
 */

/**
 * module dependencies
 */
var crypto = require('crypto');

// input jwt as a string. get the payload section, decode it, and return
const decode = function (token) {
  // check token
  if (!token) {
    throw new Error('No token supplied');
  }

  // console.log("token in jwt decode")
  // console.log(token)

  // check segments
  var segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments');
  }

  // All segment should be base64
  var headerSeg = segments[0];
  var payloadSeg = segments[1];
  var signatureSeg = segments[2];

  // base64 decode and parse JSON
  // var header = JSON.parse(base64urlDecode(headerSeg));
  // var payload = JSON.parse(base64urlDecode(payloadSeg));
  var payload = JSON.parse(atob(payloadSeg))
  // console.log("payload")
  // console.log(payload)

  return payload;

}


export { decode, }

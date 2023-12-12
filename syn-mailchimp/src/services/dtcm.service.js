const httpStatus = require('http-status');
const { Tags } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('./../config/config');
// const axios  = require('axios');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createBarCode = async (userBody) => {
  // dtcmToken = generateDTCMAccessToken();
  var dtcmToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImRtbk9ZMGg5MHBNTjdiZll2X3gxRmwzR2I5MCJ9.eyJhdWQiOiJodHRwczovL2V0LWFwaXVhdC5kZXRzYW5kYm94LmNvbSIsImlzcyI6Imh0dHA6Ly9BREZTVUFULmR0Y21kb21haW4uY29tL2FkZnMvc2VydmljZXMvdHJ1c3QiLCJpYXQiOjE2OTcwMjg0NzcsImV4cCI6MTY5NzAzMjA3NywiYXBwdHlwZSI6IkNvbmZpZGVudGlhbCIsImFwcGlkIjoiRVQtdjItVUFULUFNTUVFMSIsImF1dGhtZXRob2QiOiJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvYXV0aGVudGljYXRpb25tZXRob2QvcGFzc3dvcmQiLCJhdXRoX3RpbWUiOiIyMDIzLTEwLTExVDEyOjQ3OjU3LjA5OVoiLCJ2ZXIiOiIxLjAiLCJzY3AiOiJwcm9maWxlIn0.oelN1I9t8JeG65xy9K9FstC8h2_kO0e1FXJ1vzejTWA016sEbOGQkFLPBiC3IePvGyJINBcgivv4iz5YG64nhRZQuUqW3O3EcLyw3jqpwfbfFlHNWliWvpMlc65W1Y-7NRCAi_sS7M-wyfF94vvn0DQB4LUNz5ZLtb935rz7JCgQBw9n5IQKMd4qqcOMJ61HLp6rrm6C55ORrxNMZ4nODuOkc-K5MbkYGZNHpIWeulWe8FtWLsSdWfPxbOMVz0-mbgt7U-5K0W9WgtqGu-t0QRNt8XKC1-_smcfNuZcpDq6eFgDNwQUJHhCVJgAClIuMzxJugNO70voJzarLnw38Cw";
  var customerId = createCustomer(dtcmToken);
  return customerId;
};

const createCustomer = async (dtcmToken) => {
  let data = JSON.stringify({
    "firstName": "Junaid",
    "lastName": "Khan",
    "email": "jk44@gmail.com",
    "dateOfBirth": "",
    "nationality": "IN",
    "phoneNumber": "0509135253",
    "areaCode": "",
    "city": "",
    "state": "",
    "countryCode": "PK"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://et-apiuat.detsandbox.com/customers?api_key=3rcbhsn32xmwvu42bmk2pkak',
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImRtbk9ZMGg5MHBNTjdiZll2X3gxRmwzR2I5MCJ9.eyJhdWQiOiJodHRwczovL2V0LWFwaXVhdC5kZXRzYW5kYm94LmNvbSIsImlzcyI6Imh0dHA6Ly9BREZTVUFULmR0Y21kb21haW4uY29tL2FkZnMvc2VydmljZXMvdHJ1c3QiLCJpYXQiOjE2OTcwMjg0NzcsImV4cCI6MTY5NzAzMjA3NywiYXBwdHlwZSI6IkNvbmZpZGVudGlhbCIsImFwcGlkIjoiRVQtdjItVUFULUFNTUVFMSIsImF1dGhtZXRob2QiOiJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvYXV0aGVudGljYXRpb25tZXRob2QvcGFzc3dvcmQiLCJhdXRoX3RpbWUiOiIyMDIzLTEwLTExVDEyOjQ3OjU3LjA5OVoiLCJ2ZXIiOiIxLjAiLCJzY3AiOiJwcm9maWxlIn0.oelN1I9t8JeG65xy9K9FstC8h2_kO0e1FXJ1vzejTWA016sEbOGQkFLPBiC3IePvGyJINBcgivv4iz5YG64nhRZQuUqW3O3EcLyw3jqpwfbfFlHNWliWvpMlc65W1Y-7NRCAi_sS7M-wyfF94vvn0DQB4LUNz5ZLtb935rz7JCgQBw9n5IQKMd4qqcOMJ61HLp6rrm6C55ORrxNMZ4nODuOkc-K5MbkYGZNHpIWeulWe8FtWLsSdWfPxbOMVz0-mbgt7U-5K0W9WgtqGu-t0QRNt8XKC1-_smcfNuZcpDq6eFgDNwQUJHhCVJgAClIuMzxJugNO70voJzarLnw38Cw',
      'Content-Type': 'application/json'
    },
    data : data
  };
}

//   var resp = axios.request(config)
//   .then((response) => {
//     return JSON.parse(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// console.log(resp);
// return resp;
// }


// const generateDTCMAccessToken =() => {


// let data = JSON.stringify({
//   "client_id": config.dtcmClientId,
//   "client_secret": config.dtcmClientSecret,
//   "scope": "profile",
//   "grant_type": "client_credentials",
//   "resource": "https://et-apiuat.detsandbox.com"
// });
// let configAxios = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: config.dtcmBaseURL+'adfs/oauth2/token?api_key='+config.dtcmApiKey,
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// resp = axios.request(configAxios)
// .then((response) => {
//   return response.data.access_token;
// })
// .catch((error) => {


//   throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong ');
// });

// return resp;
// }


module.exports = {
  createBarCode
};

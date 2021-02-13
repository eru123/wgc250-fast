const axios = require("axios");
const fcoder = require("./url");

const post = function(url, data) {
  const options = {
    method: "post",
    url: url,
    data: fcoder(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  return axios(options);
};
const get = function(url, data) {
  let uri = url + "?" + fcoder(data);
  return axios.get(uri);
};

const json = function(url, data) {
  return axios({
    method: "post",
    url: url,
    headers: {
      "Content-Type": " application/json"
    },
    data: data
  });
};

module.exports = { get, post, json };

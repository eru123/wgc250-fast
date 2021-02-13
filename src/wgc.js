const req = require("./req");
const host = "https://captcha.wgcorp250.com/";
const get = async id => {
  return await req.get(host, { slot_code: id });
};
const check = async (id, data) => {
  var check_uri = host + "check_answer";
  return await req.json(check_uri, data);
};
module.exports = {
  get,
  check
};

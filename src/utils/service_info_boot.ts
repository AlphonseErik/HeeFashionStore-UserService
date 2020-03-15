require('dotenv').config();
const node_env = process.env.NODE_ENV;
console.log(node_env)
const servicesURL = node_env === 'production' ? './service_info.json' : './service_info.dev.json'
const services = require(servicesURL);
export default services;

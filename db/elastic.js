const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  host: 'http://3.11.45.184:9200',
  apiVersion: '6.8',
  timeout:100000
});
module.exports = client;
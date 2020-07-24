const mongoose = require('mongoose') 

const url = 'mongodb://odatestuser:0da7estDBiM40n@18.132.0.156:27017/odatestdb'

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(res => {
    console.log('database connected', url);
  })
  .catch(e => {
    console.log(e);
  });
module.exports = mongoose;
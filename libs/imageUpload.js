
const AWS =  require( 'aws-sdk');
const multer =  require( 'multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  secretAccessKey: 'jlRS8qk7Jv09vWC8eOZQM4zh040khsfRmhuOqCyX',
  accessKeyId: 'AKIAYJ3WSSSC45UAJBL5',
  region: 'us-east-1'
});
const s3 = new AWS.S3();

// filter image type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid Mime Type, only JPEG and PNG Format are allowed'),
      false
    );
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'rekognition-vision-images',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: 'inline',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  }),
  transforms: [
    {
      id: 'original',
      transform: function(req, file, cb) {
        //Perform desired transformations
        cb(
          null,
          sharp()
            .resize(600, 600)
            .max()
        );
      }
    }
  ],
  limits: {
    fileSize: 10000000
  }
});

module.exports = upload;
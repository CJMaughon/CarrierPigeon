const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const { google } = require('googleapis');
const credentials = require('../../credentials.json');
const scopes = [
    'https://www.googleapis.com/auth/drive'
  ];
const driveAuth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);
const drive = google.drive({version: 'v3', auth});
const fs = require('fs');

// const folderId = '1bq0bYcdBjNPHAuowyTd_YGDXmEtiga-9';
// //upload
// const fileMetadata = {
//     'name': 'testpigeon_again.jpg',
//     parents: [folderId]
// };
// const media = {
//     mimeType: 'image/jpeg',
//     body: fs.createReadStream('/home/cjm/CarrierPigeon/testpigeon_again.jpg')
// };
// drive.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id'
// }, function (err, file) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('File: ', file);
//     }
// });

// var fileMetadata = {
//     'name': 'Invoices',
//     'mimeType': 'application/vnd.google-apps.folder'
//   };
//   drive.files.create({
//     resource: fileMetadata,
//     fields: 'id'
//   }, function (err, file) {
//     if (err) {
//       // Handle error
//       console.error(err);
//     } else {
//       console.log('Folder Id: ', file.id);
//     }
//   });
  
// drive.files.list({
//     q: "mimeType = 'application/vnd.google-apps.folder'",
//     pageSize: 15,
//     fields: 'nextPageToken, files(id, name)',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;
//     if (files.length) {
//       console.log('Files:');
//       files.map((file) => {
//         console.log(`${file.name} (${file.id})`);
//       });
//     } else {
//       console.log('No files found.');
//     }
//   });

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
    try {
      let test = "test";
      res.send(test);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
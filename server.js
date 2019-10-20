const express = require('express');
const connectDB = require('./config/db');

const app = express();

const { google } = require('googleapis');

const credentials = require('./credentials.json');

const scopes = [
    'https://www.googleapis.com/auth/drive'
  ];
  
const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);

const drive = google.drive({version: 'v3', auth});
const fs = require('fs');

const folderId = '1bq0bYcdBjNPHAuowyTd_YGDXmEtiga-9';
//upload
const fileMetadata = {
    'name': 'testpigeon_again.jpg',
    parents: [folderId]
};
const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('/home/cjm/CarrierPigeon/testpigeon_again.jpg')
};
drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
}, function (err, file) {
    if (err) {
        console.error(err);
    } else {
        console.log('File: ', file);
    }
});

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
  
drive.files.list({
    q: "mimeType = 'application/vnd.google-apps.folder'",
    pageSize: 15,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });




// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API running'));

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

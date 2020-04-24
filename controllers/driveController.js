const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../config.env' });
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  oAuth2Client.setCredentials(JSON.parse(process.env.TOKEN));
  return oAuth2Client;
}
let auth = authorize(JSON.parse(process.env.CREDENTIALS));

exports.getFolderContents = async (req, res) => {
  // cis006 = 1J7oOOVMhnRtRa4UmR_rDbEpatlV-M-te
  // Summer - 20 (1JOnuln7N2I2luwYc0GRE8R-_dStZaxR7)
  // Fall - 19 (1LlfjqXbaaEIvcGru8o92fxAzaJADvppp)
  const drive = google.drive({ version: 'v3', auth });

  drive.files.list(
    {
      q: `'${req.params.folderid}' in parents and trashed = false`
      // fields: 'parents'
    },
    (err, response) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = response.data.files;
      if (files.length) {
        console.log('Courses:');
        files.map((file) => {
          console.log(file);
          // console.log(`${file.name} (${file.id})`);
        });
        res.json({ status: 'success', data: files });
      } else {
        console.log('No files found.');
      }
    }
  );
};

exports.getFileParents = async (req, res) => {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.get(
    {
      fileId: req.params.fileid,
      fields: 'parents, name',
    },
    (err, response) => {
      // console.log(response);
      // res.json({ status: 'success', data: response.data.parents });
      res.json({ status: 'success', data: response.data });
    }
  );
};

exports.downloadAFile = async (req, res) => {
  const drive = google.drive({ version: 'v3', auth });
  var dir = `./downloads`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var dest = fs.createWriteStream(`${dir}/${req.params.filename}`); // file path to where need to be downloaded

  let progress = 0;

  drive.files
    .get(
      { fileId: req.params.fileid, alt: 'media' },
      { responseType: 'stream' }
    )
    .then((response) => {
      response.data
        .on('end', () => {
          console.log('Done downloading file.');

          const file = `${dir}/${req.params.filename}`; // path for which file to download to user

          res.download(file, (err) => {
            fs.unlink(path.join(file), (err) => {
              if (err) throw err;
            });
            console.log('Delete from the server, after file sent to user');
          }); // Set disposition and send it.
        })
        .on('error', (err) => {
          console.error('Error downloading file.');
        })
        .on('data', (d) => {
          progress += d.length;
          if (process.stdout.isTTY) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`Downloaded ${progress} bytes`);
          }
        })
        .pipe(dest);
    });
};

exports.openAFile = async (req, res) => {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.get(
    {
      fileId: req.params.fileid,
      fields: 'webViewLink, webContentLink, thumbnailLink, iconLink, createdTime, name',
    },
    (err, response) => {
      // console.log(response);
      // res.json({ status: 'success', data: response.data.parents });
      res.json({ status: 'success', data: response.data });
    }
  );
};

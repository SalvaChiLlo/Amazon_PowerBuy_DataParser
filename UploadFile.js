// Copyright 2016 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');


async function uploadFile(fileName, folder) {


  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const driveService = google.drive({ version: 'v3', auth });

  const requestBody = {
    'name': fileName,
    'parents': ['1cKhDOl6optWdwwINjqPEFeYJVJGcIaEk']
  }

  const media = {
    body: fs.createReadStream(fileName)
  }
  const fileSize = fs.statSync(fileName).size;
  const res = await driveService.files.create(
    {
      requestBody,
      media
    },
    {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  );
  console.log(res.data);
  return res;
}

module.exports = uploadFile;
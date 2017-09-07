const express = require('express');
const request = require('request-promise-native');
const sanitize = require('sanitize-filename');
const fs = require('mz/fs');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/p/*', async (req, res) => {
  const url = req.params[0];
  const filename = `cache/${sanitize(url)}`;

  if (await fs.exists(filename)) {
    const html = await fs.readFile(filename, 'utf8');
    res.send(html);
  } else {
    const options = {
      url,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    };
    const result = await request(options);
    res.send(result);
    fs.writeFile(filename, result);
  }
});

app.listen(3000, () => {
  console.log('App running on port 3000'); // eslint-disable-line no-console
});

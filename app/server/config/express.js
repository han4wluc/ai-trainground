
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use('/static', express.static(path.join(__dirname, '../static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('*', function(req, res){
  console.log('GET /');
  res.status(200).send(
    `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        hello hello ee
        <div id="root"></div>
        <script>
          window.__INITIAL_STATE__ = ""
        </script>
        <script src="http://localhost:8080/app/server/static/bundle.js"></script>
      </body>
    </html>
    `
  );
});

const server = app.listen(port, () => {
  console.log(`express server listening at http://localhost:${port}`);
});

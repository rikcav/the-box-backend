import express from "express";
import cors from "cors";
import https from 'https';
import fs from 'fs';

const routes = require("./routes");
const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());
routes(app);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`App listening at https://localhost:${port}`);
});
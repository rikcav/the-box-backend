import express from "express";
import cors from "cors";
import swaggerFile from "./swagger/swagger-output.json";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

const routes = require("./routes");
const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes(app);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

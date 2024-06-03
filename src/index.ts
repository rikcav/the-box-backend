import express from "express";
import cors from "cors";
import { authRoutes } from "./auth/routes";

const routes = require("./routes");
const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());
routes(app);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});
app.use(authRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

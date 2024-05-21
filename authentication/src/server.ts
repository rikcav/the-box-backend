import express from "express";
import cors from "cors";
import { handlerException } from "./errors/handler-exception";
import { env } from "./env";
import { router } from "./router";

const app = express();
const port = env.PORT;

app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});


app.use(router);
app.use(handlerException);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

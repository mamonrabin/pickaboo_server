import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import config from "./app/config/index.js";
// import { router } from "./app/routes/index.js";
const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: config.frontend_url,
    credentials: true
}))

// app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the ecommerce  server site!",
  });
});


app.use(globalErrorHandler)
app.use(notFound)

export default app;

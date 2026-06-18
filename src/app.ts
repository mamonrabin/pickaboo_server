import cookieParser from "cookie-parser";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import config from "./app/config/index.js";
import { router } from "./app/routes/index.js";
import "../src/app/config/passport.js";
const app: Application = express();


app.use(expressSession({
    secret: "ecommerce_secret_key",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: config.frontend_url,
    credentials: true
}))

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the ecommerce  server site!",
  });
});


app.use(globalErrorHandler)
app.use(notFound)

export default app;

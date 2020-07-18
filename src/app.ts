import express from "express";
import bodyParser from "body-parser";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as apiController from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Primary app routes.
 */
app.get("/", homeController.index);

/**
 * API examples routes.
 */
app.get("/:id", apiController.getApi);

export default app;

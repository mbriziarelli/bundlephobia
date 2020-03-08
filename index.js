const url = require("url");
const { default: next } = require("next");
const express = require("express");
const getSizeMiddleware = require('./buildService')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

/** @typedef {import("express").Request} Request */
/** @typedef {import("express").Response} Response */

/** @type { (req: Request, res: Response) => void } */
const handleToNextMiddleware = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  handle(req, res, parsedUrl);
}

/** @type { (err: any) => void } */
const onListening = err => {
  if (err) throw err;
  console.log("Listening on http://localhost:3000");
}

app.prepare().then(() => {
  const expressApp = express();

  expressApp
    .get("/api/size", getSizeMiddleware)
    .use(handleToNextMiddleware)
    .listen(3000, onListening);
});

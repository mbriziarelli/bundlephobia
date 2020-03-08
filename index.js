const url = require("url");
const { default: next } = require("next");
const express = require("express");
const getStats = require("./buildService")

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();

  expressApp
    .get("/api/size", async (req, res, next) => {
      const { query: { p: packageName } } = url.parse(req.url, true)

      if (typeof packageName === 'string' && packageName.length > 0) {
        res.json(await getStats(packageName));
      } else {
        res.status(400).json({
          code: 'Bad Request',
          message: `Invalid or empty package name: "${packageName}"`
        })
      }
    })
    .use((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(3000, err => {
      if (err) throw err;
      console.log("Listening on http://localhost:3000");
    });
});

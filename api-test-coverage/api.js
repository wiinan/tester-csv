const http = require("http");

const DEFAULT_USER = { userName: 'wiinan', password: 123 }

const routes = {
  "/contact:get": (req, res) => {
    res.write("contact us page");
    return res.end();
  },

  "/login:post": async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data)
      if (user.userName !== DEFAULT_USER.userName || user.password !== DEFAULT_USER.password) {
        res.writeHead(401)
        res.write("Login failed!")
        return res.end()
      }

      res.write('Login has succeeded!')
      return res.end()
    }
  },

  default: (req, res) => {
    res.write("hello world");
    return res.end();
  },
};

const handler = (req, res) => {
  const { url, method } = req;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  if (!routeKey) return;

  res.writeHead(200, { "Content-Type": "text/html" });

  return chosen(req, res);
};

const app = http
  .createServer(handler)
  .listen(4000, () => console.log("running", 4000));

module.exports = app;

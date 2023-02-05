import { createProxyMiddleware } from "http-proxy-middleware";
const proxy = {
    target: "https://lemon-carpenter-pevmg.ineuron.app:4000",
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    "/",
    createProxyMiddleware(proxy)
  );
};
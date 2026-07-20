const { buildSiteContext } = require("./_lib/site-context");

module.exports = function handler(req, res) {
  const pathname = req.query?.pathname || req.url || "/";
  const host = req.headers?.host || "";

  const context = buildSiteContext({
    pathname,
    host,
    repositoryName: "study",
  });

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(context);
};

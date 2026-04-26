const { buildSiteContext } = require("./_lib/site-context");

module.exports = function handler(req, res) {
  const pathname = req.query?.pathname || req.url || "/";
  const bodyLabel =
    typeof req.query?.bodyLabel === "string" ? req.query.bodyLabel : "";
  const host = req.headers?.host || "";

  const context = buildSiteContext({
    pathname,
    bodyLabel,
    host,
    projectRoot: process.cwd(),
    repositoryName: "study",
  });

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(context);
};

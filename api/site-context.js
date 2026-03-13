const { buildSiteContext } = require("./_lib/site-context");

module.exports = function handler(req, res) {
  const pathname = req.query?.pathname || req.url || "/";
  const bodyLabel = req.query?.bodyLabel || "book";

  const context = buildSiteContext({
    pathname,
    bodyLabel,
    projectRoot: process.cwd(),
    repositoryName: "study",
  });

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(context);
};

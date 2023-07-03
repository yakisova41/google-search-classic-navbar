const packagejson = require("./package.json");
const path = require("path");
const fs = require("fs");

function getIconBase64() {
  const icon = fs.readFileSync(path.join(__dirname, "./assets/icon128.png"));
  const buf = Buffer.from(icon).toString("base64");
  return `data:image/png;base64,${buf}`;
}

module.exports = {
  userScriptHeader: [
    ["@name", "Restore google navbar"],
    ["@version", packagejson.version],
    ["@author", "yakisova41"],
    ["@license", packagejson.license],
    ["@namespace", "https://yakisova.com"],
    [
      "@description",
      'This script replaces the "handle" in the YouTube comments section to user name',
    ],
    ["@match", "https://www.google.com/search/*"],
    ["@grant", "unsafeWindow"],
    ["@run-at", "document-start"],
  ],
  devServer: {
    port: 5173,
    host: "localhost",
    websocket: 5174,
  },
  manifest: {
    name: "__MSG_Name__",
    short_name: "name",
    version: String(packagejson.version),
    manifest_version: 3,
    description: "__MSG_Description__",
    default_locale: "en",
    icons: {
      16: "assets/icon16.png",
      48: "assets/icon48.png",
      128: "assets/icon128.png",
    },
  },
  assetsDir: path.join(__dirname, "assets"),
  noSandbox: false,
  passCSP: true,
};

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
    ["@name", "Google Search Classic Navbar"],
    ["@version", packagejson.version],
    ["@author", "yakisova41"],
    ["@license", packagejson.license],
    ["@namespace", "https://yakisova.com"],
    ["@description", "Restore the garbage UX nav bar."],
    ["@match", "https://www.google.com/*"],
    ["@match", "https://www.google.co.jp/*"],
    ["@grant", "unsafeWindow"],
    ["@run-at", "document-start"],
    ["@name:ja", "Google検索の上のメニューを元に戻す"],
    [
      "@description:ja",
      "Google検索の上のメニューを従来のデザインに無理やり戻します。",
    ],
    ["@icon", getIconBase64()],
  ],
  devServer: {
    port: 5173,
    host: "localhost",
    websocket: 5174,
  },
  manifest: {
    name: "__MSG_Name__",
    short_name: "gscn",
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
  locales: {
    ja: {
      Name: {
        message: "Google検索の上のメニューを元に戻す",
      },
      Description: {
        message: "Google検索の上のメニューを従来のデザインに無理やり戻します。",
      },
    },
    en: {
      Name: {
        message: "Google Search Classic Navbar",
      },
      Description: {
        message: "Restore the garbage UX nav bar.",
      },
    },
  },
  assetsDir: path.join(__dirname, "assets"),
  noSandbox: false,
  passCSP: true,
  extensionLoadMode: "contentScript",
};

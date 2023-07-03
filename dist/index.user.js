// ==UserScript==
// @name Google Search Classic Navbar
// @version 0.1.0-beta
// @author yakisova41
// @license MIT
// @namespace https://yakisova.com
// @description Restore the garbage UX nav bar.
// @match https://www.google.com/search*
// @match https://www.google.co.jp/search*
// @grant unsafeWindow
// @run-at document-start
// @name:ja Google検索の上のメニューを元に戻す
// @description:ja Google検索の上のメニューがキモくなったので、従来のデザインに無理やり戻します。
// ==/UserScript==

// src/classes/NavBarItems.ts
var NavBarItems = class {
  parentElement;
  tbmList = {
    all: "All",
    isch: "Images",
    vid: "Videos",
    nws: "News",
    shop: "Shop"
  };
  thisTbm = "all";
  items = [];
  itemContainerClassName = "navbar-item-container";
  itemIconOuterClassName = "navbar-item-icon-outer";
  setTbm(tbm) {
    this.thisTbm = tbm;
  }
  setParentElement(elem) {
    if (elem !== void 0 && elem !== null) {
      this.parentElement = elem;
      this.parentElement.classList.add("navbar-parent");
    }
  }
  render() {
    this.items.forEach(({ type, itemElem, matchTbm, activeElem }) => {
      if (type === "match-active" && matchTbm === this.thisTbm && activeElem !== void 0) {
        this.parentElement.appendChild(activeElem);
      }
      if (type === "match-active" && matchTbm !== this.thisTbm) {
        this.parentElement.appendChild(itemElem);
      }
      if (type === "item") {
        this.parentElement.appendChild(itemElem);
      }
    });
  }
  appendItem(itemElem) {
    this.items.push({
      type: "item",
      itemElem
    });
  }
  appendTbmActiveItem(matchTbm, itemElem, activeElem) {
    this.items.push({
      type: "match-active",
      matchTbm,
      itemElem,
      activeElem
    });
  }
  createItemElem(text, iconElem, isLink = false, href = "") {
    const itemContainer = document.createElement("div");
    itemContainer.className = this.itemContainerClassName;
    if (isLink) {
      const linkElem = document.createElement("a");
      linkElem.href = href;
      const iconOuter = document.createElement("span");
      iconOuter.appendChild(iconElem);
      iconOuter.className = this.itemIconOuterClassName;
      linkElem.appendChild(iconOuter);
      linkElem.innerHTML = linkElem.innerHTML + text;
      itemContainer.appendChild(linkElem);
      itemContainer.classList.add("navbar-link-item");
    } else {
      const iconOuter = document.createElement("span");
      iconOuter.className = this.itemIconOuterClassName;
      iconOuter.appendChild(iconElem);
      itemContainer.appendChild(iconOuter);
      itemContainer.innerHTML = itemContainer.innerHTML + text;
      itemContainer.classList.add("navbar-now-item");
    }
    return itemContainer;
  }
};

// src/classes/Search.ts
var Search = class {
  search;
  constructor(search) {
    this.search = search;
  }
  parse() {
    const searches = {};
    this.search.split("&").forEach((v) => {
      const sp = v.split("=");
      const key = sp[0].replace("?", "");
      searches[key] = sp[1];
    });
    return searches;
  }
  decord(searches) {
    let searchResult = "?";
    Object.keys(searches).forEach((key) => {
      searchResult = searchResult + `${key}=${searches[key]}&`;
    });
    searchResult.slice(0, -1);
    return searchResult;
  }
  getURL() {
    const url = new URL(location.href);
    url.search = this.search;
    return url.toString();
  }
  reload() {
    const url = new URL(location.href);
    url.search = this.search;
    location.href = url.toString();
  }
  append(key, val) {
    const parsed = this.parse();
    parsed[key] = val;
    this.search = this.decord(parsed);
  }
  delete(key) {
    const parsed = this.parse();
    delete parsed[key];
    this.search = this.decord(parsed);
  }
  get(key) {
    const parsed = this.parse();
    return parsed[key];
  }
};

// src/classes/StyleIncject.ts
var StyleInject = class {
  tbm;
  styles = {};
  setTbm(tbm) {
    this.tbm = tbm;
  }
  inject() {
    const elem = document.createElement("style");
    if (this.styles[this.tbm] !== void 0) {
      elem.innerHTML = this.styles[this.tbm].join("");
    }
    if (this.styles["*"] !== void 0) {
      elem.innerHTML = elem.innerHTML + this.styles["*"].join("");
    }
    document.head.appendChild(elem);
  }
  addStyle(tbms, style) {
    tbms.forEach((tbm) => {
      if (this.styles[tbm] === void 0) {
        this.styles[tbm] = [];
      }
      this.styles[tbm].push(style.replaceAll("	", "").replaceAll("\n", ""));
    });
  }
  injectOnLoad(tbms, callback) {
    document.addEventListener("DOMContentLoaded", () => {
      let isInject = false;
      tbms.forEach((tbm) => {
        if (tbm === "*") {
          isInject = true;
        }
        if (tbm === this.tbm) {
          isInject = true;
        }
      });
      if (isInject) {
        const elem = document.createElement("style");
        elem.innerHTML = callback().replaceAll("	", "").replaceAll("\n", "");
        document.head.appendChild(elem);
      }
    });
  }
};

// src/icons.ts
var paths = {
  all: `<path d="M16.32 14.88a8.04 8.04 0 1 0-1.44 1.44l5.76 5.76 1.44-1.44-5.76-5.76zm-6.36 1.08c-3.36 0-6-2.64-6-6s2.64-6 6-6 6 2.64 6 6-2.64 6-6 6"></path>`,
  isch: `<path d="M14 13l4 5H6l4-4 1.79 1.78L14 13zm-6.01-2.99A2 2 0 0 0 8 6a2 2 0 0 0-.01 4.01zM22 5v14a3 3 0 0 1-3 2.99H5c-1.64 0-3-1.36-3-3V5c0-1.64 1.36-3 3-3h14c1.65 0 3 1.36 3 3zm-2.01 0a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7v-.01h7a1 1 0 0 0 1-1V5"></path>`,
  vid: `<path d="M10 16.5l6-4.5-6-4.5v9zM5 20h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1zm14.5 2H5a3 3 0 0 1-3-3V4.4A2.4 2.4 0 0 1 4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.1a2.5 2.5 0 0 1-2.5 2.5"></path>`,
  maps: `<path d="M7.503 0c3.09 0 5.502 2.487 5.502 5.427 0 2.337-1.13 3.694-2.26 5.05-.454.528-.906 1.13-1.358 1.734-.452.603-.754 1.508-.98 1.96-.226.452-.377.829-.904.829-.528 0-.678-.377-.905-.83-.226-.451-.527-1.356-.98-1.959-.452-.603-.904-1.206-1.356-1.734C3.132 9.121 2 7.764 2 5.427 2 2.487 4.412 0 7.503 0zm0 1.364c-2.283 0-4.14 1.822-4.14 4.063 0 1.843.86 2.873 1.946 4.177.468.547.942 1.178 1.4 1.79.34.452.596.99.794 1.444.198-.455.453-.992.793-1.445.459-.61.931-1.242 1.413-1.803 1.074-1.29 1.933-2.32 1.933-4.163 0-2.24-1.858-4.063-4.139-4.063zm0 2.734a1.33 1.33 0 11-.001 2.658 1.33 1.33 0 010-2.658"></path>`,
  nws: `<path d="M12 11h6v2h-6v-2zm-6 6h12v-2H6v2zm0-4h4V7H6v6zm16-7.22v12.44c0 1.54-1.34 2.78-3 2.78H5c-1.64 0-3-1.25-3-2.78V5.78C2 4.26 3.36 3 5 3h14c1.64 0 3 1.25 3 2.78zM19.99 12V5.78c0-.42-.46-.78-1-.78H5c-.54 0-1 .36-1 .78v12.44c0 .42.46.78 1 .78h14c.54 0 1-.36 1-.78V12zM12 9h6V7h-6v2"></path>`,
  shop: `<path d="M21.11 2.89A3.02 3.02 0 0 0 18.95 2h-5.8c-.81 0-1.58.31-2.16.89L7.25 6.63 2.9 10.98a3.06 3.06 0 0 0 0 4.32l5.79 5.8a3.05 3.05 0 0 0 4.32.01l8.09-8.1c.58-.58.9-1.34.9-2.16v-5.8c0-.81-.32-1.59-.89-2.16zM20 10.85c0 .28-.12.54-.32.74l-3.73 3.74-4.36 4.36c-.41.41-1.08.41-1.49 0l-2.89-2.9-2.9-2.9a1.06 1.06 0 0 1 0-1.49l8.1-8.1c.2-.2.46-.3.74-.3l5.8-.01A1.05 1.05 0 0 1 20 5.05v5.8zM16 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2" style="transform-origin:0px 0px;"></path>`,
  more: `<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" style="transform-origin:0px 0px;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);"></path>`,
  bks: `<path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z"></path>`,
  flm: `<path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12.98 12.89l-4.03 4.03.42 2.95L8.24 21l-1.87-3.37L3 15.76l1.12-1.12 2.95.42 4.03-4.03L3 6.77l1.5-1.5 10.04 2.32 4.2-4.2a1.32 1.32 0 0 1 1.87 0c.52.52.52 1.36 0 1.87l-4.2 4.2 2.32 10.04-1.5 1.5-4.25-8.11z"></path>`,
  fin: `<path d="M0 0h24v24H0V0z" fill="none"></path><path clip-rule="evenodd" d="M6 15.5l-3 2.94V10h3v5.5zm5-1.84l-1.57-1.34L8 13.64V6h3v7.66zM16 12l-3 3V2h3v10zm2.81-.19L17 10h5v5l-1.79-1.79L13 20.36l-3.47-3.02L5.75 21H3l6.47-6.34L13 17.64l5.81-5.83z" fill-rule="evenodd"></path>`
};
var enablePaths = {
  all: `<path fill="#34a853" d="M10 2v2a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8"></path><path fill="#ea4335" d="M10 4V2a8 8 0 0 0-8 8h2c0-3.3 2.7-6 6-6"></path><path fill="#fbbc04" d="M4 10H2a8 8 0 0 0 8 8v-2c-3.3 0-6-2.69-6-6"></path><path fill="#4285f4" d="M22 20.59l-5.69-5.69A7.96 7.96 0 0 0 18 10h-2a6 6 0 0 1-6 6v2c1.85 0 3.52-.64 4.88-1.68l5.69 5.69L22 20.59"></path>`,
  shop: `<path fill="#fbbc04" d="M5.8 18.2l-2.9-2.9c-1.19-1.19-1.19-3.12 0-4.32l4.36-4.36 1.4 1.41-4.35 4.37c-.41.41-.41 1.08 0 1.49l2.9 2.9L5.8 18.2"></path><path fill="#4285f4" d="M21.11 2.89L19.69 4.3c.21.21.31.48.31.75v5.8c0 .28-.12.54-.32.74l-3.73 3.74-4.36 4.36c-.41.41-1.08.41-1.49 0l-2.89-2.9L5.8 18.2l2.89 2.9c.6.6 1.38.9 2.16.9.78 0 1.56-.29 2.16-.89l4.36-4.36 3.73-3.74c.58-.58.9-1.34.9-2.16v-5.8c0-.81-.32-1.59-.89-2.16"></path><circle fill="#34a853" cx="16" cy="8" r="2"></circle>`,
  isch: `<path clip-rule="evenodd" d="M0 0h24v24H0z" fill="none" style="clip-rule:evenodd;fill:none;transform-origin:0px 0px;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);"></path><path clip-rule="evenodd" d="M19 22h-7v-2h7c.55 0 1-.46 1-1V5a1 1 0 0 0-1-.99L12 4V2h7c1.66 0 3 1.36 3 3v14c0 1.65-1.35 3-3 3" fill="#4285F4" fill-rule="evenodd" style="clip-rule:evenodd;fill:rgb(66, 133, 244);fill-rule:evenodd;transform-origin:0px 0px;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);"></path><path clip-rule="evenodd" d="M12 22H5c-1.64 0-3-1.36-3-3V5c0-1.64 1.36-3 3-3h7v2H5c-.55 0-.99.45-.99 1L4 19c0 .55.45 1 1 1h7v2z" fill="#EA4335" fill-rule="evenodd" style="clip-rule:evenodd;fill:rgb(234, 67, 53);fill-rule:evenodd;transform-origin:0px 0px;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);"></path><path clip-rule="evenodd" d="M14 13l-2.25 2.75L10 14l-4 4h12z" fill="#34A853" fill-rule="evenodd" style="clip-rule:evenodd;fill:rgb(52, 168, 83);fill-rule:evenodd;transform-origin:0px 0px;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);"></path><path clip-rule="evenodd" d="M10 8c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.09.9-2 2-2s2 .9 2 2" fill="#FBBC04" fill-rule="evenodd" style="clip-rule:evenodd;fill:rgb(251, 188, 4);fill-rule:evenodd;transform-origin:0px 0px;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);"></path>`,
  vid: `<path d="M10 16.5l6-4.5-6-4.5" fill="#4285f4" style="fill:rgb(66, 133, 244);transform-origin:0px 0px;"></path><path d="M20 12h2v7.5a2.5 2.5 0 0 1-2.5 2.5H12v-2h7a1 1 0 0 0 1-1v-7" fill="#ea4335" style="fill:rgb(234, 67, 53);transform-origin:0px 0px;"></path><path d="M20 12V5a1 1 0 0 0-1-1h-7V2h7.6A2.4 2.4 0 0 1 22 4.4V12h-2" fill="#fbbc04" style="fill:rgb(251, 188, 4);transform-origin:0px 0px;"></path><path d="M12 20v2H5a3 3 0 0 1-3-3V4.4A2.4 2.4 0 0 1 4.4 2H12v2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7" fill="#34a853" style="fill:rgb(52, 168, 83);transform-origin:0px 0px;"></path>`,
  nws: `<path d="M6 7h4.072v6.588H6z" style="fill:#4285f4;stroke:none;stroke-width:13.6025;stroke-linecap:square;paint-order:stroke fill markers;fill-opacity:1"></path><path d="M12 7h6v2h-6zM12 11h6v2h-6zM6 15h12v2H6z" style="fill:#4285f4;fill-opacity:1;stroke:none;stroke-width:13.6025;stroke-linecap:square;paint-order:stroke fill markers"></path><path d="M12 19h7c.616-.054.941-.32 1-.78l.005-4.632H22v4.632c.004.765-.348 1.617-1.177 2.21-.605.434-1.083.57-1.823.57h-7v-2" style="fill:#34a853;fill-opacity:1;stroke:none;stroke-width:13.6025;stroke-linecap:square;paint-order:stroke fill markers"></path><path d="M20.005 13.588 19.99 5.78c-.054-.468-.394-.723-1-.78h-6.997l-.005-2H19c.712-.005 1.421.218 2.127.827.53.507.856 1.136.873 1.953v7.808h-1.995" style="fill:#4285f4;fill-opacity:1;stroke:none;stroke-width:13.6025;stroke-linecap:square;paint-order:stroke fill markers"></path><path d="M12 19H5c-.616-.054-.941-.32-1-.78l-.005-4.632H2v4.632c-.004.765.348 1.617 1.177 2.21.605.434 1.083.57 1.823.57h7v-2" style="fill:#fbbc04;fill-opacity:1;stroke:none;stroke-width:13.6025;stroke-linecap:square;paint-order:stroke fill markers"></path><path d="M3.995 13.588 4.01 5.78c.054-.468.393-.723.998-.78h6.985l-.005-2h-6.99c-.71-.005-1.419.218-2.123.827-.53.507-.855 1.136-.872 1.953v7.808h1.992" style="fill:#ea4335;fill-opacity:1;stroke:none;stroke-width:13.5923;stroke-linecap:square;paint-order:stroke fill markers"></path>`
};
function getIconSvgElement(path, viewBox = "0 0 24 24") {
  const svg = document.createElement("svg");
  svg.setAttribute("viewBox", viewBox);
  svg.innerHTML = path;
  return svg;
}

// src/registerNavItems.ts
function registerNavItems(itemsDom) {
  itemsDom.appendTbmActiveItem(
    "all",
    itemsDom.createItemElem(
      "All",
      getIconSvgElement(paths.all),
      true,
      createAllUrl()
    ),
    itemsDom.createItemElem("All", getIconSvgElement(enablePaths.all), false)
  );
  itemsDom.appendTbmActiveItem(
    "isch",
    itemsDom.createItemElem(
      "Images",
      getIconSvgElement(paths.isch),
      true,
      createTbmUrl("isch")
    ),
    itemsDom.createItemElem(
      "Images",
      getIconSvgElement(enablePaths.isch),
      false
    )
  );
  itemsDom.appendTbmActiveItem(
    "vid",
    itemsDom.createItemElem(
      "Videos",
      getIconSvgElement(paths.vid),
      true,
      createTbmUrl("vid")
    ),
    itemsDom.createItemElem("Videos", getIconSvgElement(enablePaths.vid), false)
  );
  itemsDom.appendItem(
    itemsDom.createItemElem(
      "Maps",
      getIconSvgElement(paths.maps, "0 0 16 16"),
      true,
      createMapUrl()
    )
  );
  itemsDom.appendTbmActiveItem(
    "nws",
    itemsDom.createItemElem(
      "News",
      getIconSvgElement(paths.nws),
      true,
      createTbmUrl("nws")
    ),
    itemsDom.createItemElem("News", getIconSvgElement(enablePaths.nws), false)
  );
  itemsDom.appendTbmActiveItem(
    "shop",
    itemsDom.createItemElem(
      "Shopping",
      getIconSvgElement(paths.shop),
      true,
      createTbmUrl("shop")
    ),
    itemsDom.createItemElem(
      "Shopping",
      getIconSvgElement(enablePaths.shop),
      false
    )
  );
}
function createAllUrl() {
  const search = new Search(location.search);
  search.delete("tbm");
  return search.getURL();
}
function createTbmUrl(tbm) {
  const search = new Search(location.search);
  search.append("tbm", tbm);
  return search.getURL();
}
function createMapUrl() {
  const search = new Search(location.search);
  const q = search.get("q");
  return "https://www.google.com/maps/?q=" + q;
}

// src/registerStyle.ts
function registerStyle(styleInjecter) {
  styleInjecter.addStyle(
    ["all", "vid", "nws"],
    `
    .main > div:nth-child(1) > div:nth-child(1) {
      height: 45px;
    }

    .main > div:nth-child(1) > div:nth-child(8) > div:nth-child(1) {
      padding-left: 0;
      height: 43px;
    }

    .main > div:nth-child(1) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) {
      align-items: center;
    }

    .main > div:nth-child(1) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
      align-items: center;
    }

    @media (min-width: 1124px) and (max-width: 1300px){
      .srp {
        --center-abs-margin: 30px!important;
      }
    }
    @media (min-width: 1410px) and (max-width: 1610px) {
      .srp {
        --center-abs-margin: 180px!important;
      }
    }
    @media (min-width: 1610px){
      .srp {
        --center-abs-margin: 180px!important;
      }
    }`
  );
  styleInjecter.addStyle(
    ["isch"],
    `
    body > div:nth-child(6) > c-wiz:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
      height:59px;
    }

    body > div:nth-child(6) > c-wiz:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
      margin-left:0;
    }
    `
  );
  styleInjecter.addStyle(
    ["shop"],
    `
    #cnt > div:nth-child(1) {
      height: 45px;
    }

    #cnt > div:nth-child(4) {
      padding: 17px 0 0px calc(var(--center-abs-margin) - 20px);
    }

    #cnt > div:nth-child(4) > div:nth-child(2) {
      margin-left:0;
    }
    `
  );
  styleInjecter.addStyle(
    ["*"],
    `
    .navbar-parent {
      display: inline;
      margin-left: 169px;
      white-space: nowrap;
      color: #70757a;
      font-size: 13px;
      -webkit-user-select: none;
  
    }
  
    .navbar-now-item {
      border-bottom: 3px solid var(--classic-google-nav-bar-primary);
      color: var(--classic-google-nav-bar-primary);
    }
  
    .navbar-item-container {
      padding: 16px 12px 12px 10px;
      font-family: Google Sans,Roboto,HelveticaNeue,Arial,sans-serif;
      height: 16px;
      line-height: 16px;
      margin: 11px 1px 0;
      display: inline-block;
      font-size: 13px;
    }
  
    .navbar-item-icon-outer {
      display: inline-block;
      fill: currentColor;
      height: 16px;
      width: 16px;
      margin-right: 5px;
      vertical-align: text-bottom;
    }
  
    .navbar-now-item > navbar-item-icon-outer {
      fill: currentColor;
    }
  
    .navbar-item-container > a {
      text-decoration: none;
      color: var(--classic-google-nav-bar-text)!important;
      -webkit-tap-highlight-color: rgba(0,0,0,.10);
    }
    `
  );
}

// src/theme.ts
function attachTheme(styleInjecter) {
  styleInjecter.injectOnLoad(["*"], () => {
    const theme = getComputedStyle(document.body).backgroundColor === "rgb(32, 33, 36)" ? "dark" : "right";
    const styles = {
      dark: `
        :root {
          --classic-google-nav-bar-text:#bdc1c6;
          --classic-google-nav-bar-primary:#8ab4f8;
        }
      `,
      right: `
        :root {
          --classic-google-nav-bar-text:#202124;
          --classic-google-nav-bar-primary:#4285f4;
        }
      `
    };
    return styles[theme];
  });
}

// src/index.ts
function main() {
  console.log("google navbar");
  const searchManager = new Search(location.search);
  const tbm = searchManager.get("tbm");
  const styleInjecter = new StyleInject();
  const itemsDom = new NavBarItems();
  if (tbm === void 0) {
    styleInjecter.setTbm("all");
  } else {
    styleInjecter.setTbm(tbm);
  }
  registerStyle(styleInjecter);
  attachTheme(styleInjecter);
  styleInjecter.inject();
  const navbarSelectors = {
    all: ".main > div:nth-child(1) > div:nth-child(8)",
    isch: "body > div:nth-child(6) > c-wiz > div",
    vid: ".main > div:nth-child(1) > div:nth-child(8)",
    shop: "#main > div:nth-child(1) > div:nth-child(4)"
  };
  const navbarItemsSelectors = {
    all: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)",
    isch: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)",
    vid: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)",
    shop: "div:nth-child(2)"
  };
  document.addEventListener("DOMContentLoaded", () => {
    switch (tbm) {
      case void 0: {
        const navbar = document.querySelector(navbarSelectors.all);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.all);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("all");
        break;
      }
      case "isch": {
        const navbar = document.querySelector(navbarSelectors.isch);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.isch);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("isch");
        break;
      }
      case "vid": {
        const navbar = document.querySelector(navbarSelectors.vid);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.vid);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("vid");
        break;
      }
      case "shop": {
        const navbar = document.querySelector(navbarSelectors.shop);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.shop);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("shop");
        break;
      }
      case "nws": {
        const navbar = document.querySelector(navbarSelectors.all);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.all);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("nws");
        break;
      }
    }
    registerNavItems(itemsDom);
    itemsDom.render();
  });
}
function removeOriginalItems(itemsParent) {
  if (itemsParent === null || itemsParent === void 0)
    return;
  const items = itemsParent.querySelectorAll("div, a, span");
  items.forEach((item) => {
    item.remove();
  });
}

// node_modules/ts-extension-builder/tmp/entry.ts
var args = {};
if (typeof GM_info !== "undefined" && GM_info.script.grant !== void 0) {
  GM_info.script.grant.forEach((propatyName) => {
    let keyName = propatyName.split("GM_")[1];
    if (keyName === "xmlhttpRequest") {
      keyName = "xmlHttpRequest";
    }
    args[propatyName] = GM[keyName];
  });
}
main(args);

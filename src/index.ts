import { NavBarItems } from "./classes/NavBarItems";
import { Search } from "./classes/Search";
import { StyleInject } from "./classes/StyleIncject";
import registerNavItems from "./registerNavItems";
import registerStyle from "./registerStyle";
import attachTheme from "./theme";

export default function main() {
  console.log("google navbar");

  const searchManager = new Search(location.search);
  const tbm = searchManager.get("tbm");

  const styleInjecter = new StyleInject();

  const itemsDom = new NavBarItems();

  if (tbm === undefined) {
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
    shop: "#main > div:nth-child(1) > div:nth-child(4)",
  };

  const navbarItemsSelectors = {
    all: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)",
    isch: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)",
    vid: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)",
    shop: "div:nth-child(2)",
  };

  document.addEventListener("DOMContentLoaded", () => {
    switch (tbm) {
      case undefined: {
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

function removeOriginalItems(itemsParent: Element | null | undefined) {
  if (itemsParent === null || itemsParent === undefined) return;

  const items = itemsParent.querySelectorAll("div, a, span");
  items.forEach((item) => {
    item.remove();
  });
}

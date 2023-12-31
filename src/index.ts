import { NavBarItems } from "./classes/NavBarItems";
import { Search } from "./classes/Search";
import { StyleInject } from "./classes/StyleIncject";
import registerNavItems from "./registerNavItems";
import registerStyle from "./registerStyle";
import attachTheme from "./theme";
import { trustedTypes } from "trusted-types";

export default function main() {
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

  document.addEventListener("DOMContentLoaded", () => {
    const navbarNthChild = getNavbarNthChild();

    const navbarSelectors = {
      all: [
        `.main > div:nth-child(1) > div:nth-child(${navbarNthChild})`,
        ".main > div:nth-child(1) > div:nth-child(3)",
      ],
      isch: "body > div:nth-child(6) > c-wiz > div:nth-child(2)",
      vid: `.main > div:nth-child(1) > div:nth-child(${navbarNthChild})`,
      shop: "#main > div:nth-child(1) > div:nth-child(4)",
      bks: `.main > div:nth-child(1) > div:nth-child(9)`,
    };

    const navbarItemsSelectors = {
      all: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)",
      isch: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)",
      vid: "div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)",
      shop: "div:nth-child(2)",
    };

    switch (tbm) {
      case undefined: {
        const navbar = getElement(navbarSelectors.all);
        setUniqueSelector(navbar);
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
        setUniqueSelector(navbar);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.vid);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("vid");
        break;
      }

      case "shop": {
        const navbar = document.querySelector(navbarSelectors.shop);
        setUniqueSelector(navbar);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.shop);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("shop");
        break;
      }

      case "nws": {
        const navbar = getElement(navbarSelectors.all);
        setUniqueSelector(navbar);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.all);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("nws");
        break;
      }

      case "bks": {
        const navbar = document.querySelector(navbarSelectors.bks);
        setUniqueSelector(navbar);
        const itemsParent = navbar?.querySelector(navbarItemsSelectors.all);
        removeOriginalItems(itemsParent);
        itemsDom.setParentElement(itemsParent);
        itemsDom.setTbm("bks");
        break;
      }
    }
    registerNavItems(itemsDom);

    setTimeout(() => {
      itemsDom.render();
    });
  });
}

function removeOriginalItems(itemsParent: Element | null | undefined) {
  if (itemsParent === null || itemsParent === undefined) return;

  const items = itemsParent.querySelectorAll("div, a, span");
  items.forEach((item) => {
    item.remove();
  });
}

function getElement(selectorsList: string[]): null | Element {
  let returnElem: null | Element = null;

  selectorsList.forEach((selector) => {
    const elem = document.querySelector(selector);
    if (elem !== null && returnElem === null) {
      returnElem = elem;
    }
  });

  return returnElem;
}

function getNavbarNthChild() {
  let nthChild = 0;
  let isFound = false;

  const children = document.querySelectorAll("#main > #cnt > *");

  if (children !== undefined) {
    children.forEach((child, index) => {
      if (
        child?.querySelector(
          'div[role="navigation"] > div > #abss-dropdown_1'
        ) !== null &&
        !isFound
      ) {
        nthChild = index + 1;
        isFound = true;
      }

      if (
        child?.querySelector(
          'div[role="navigation"] > div[data-st-cnt="mode"] > div[data-st-tgt="mode"] > div[data-id="trc"]'
        ) !== null
      ) {
        nthChild = index + 1;
        isFound = true;
      }
    });
  }

  return nthChild;
}

function setUniqueSelector(navbar: Element | null) {
  if (navbar !== null) {
    navbar.classList.add("google-classic-navbar-parent-outer");
  }
}

let trustedPolicy;
if (window.trustedTypes === undefined) {
  trustedPolicy = {
    createHTML: (input: string) => {
      return input;
    },
  };
} else {
  trustedPolicy = window.trustedTypes.createPolicy(
    "google-classic-navbar-trusted-policy",
    {
      createHTML: (input: string) => {
        return input;
      },
    }
  );
}
export const exportedTrustedPolicy = trustedPolicy;

declare global {
  interface Window {
    trustedTypes: typeof trustedTypes;
  }
}

export interface TrustedElement extends ElemToTrusted {
  innerHTML: string | TrustedHTML;
}

interface ElemToTrusted extends Element {
  innerHTML: any;
}

import { TrustedElement, trustedPolicy } from "src";
import { getIconSvgElement, enablePaths, paths } from "../icons";
import { Search } from "./Search";

interface NavBarItem {
  type: "item" | "match-active";
  itemElem: Element | TrustedElement;
  activeElem?: Element | TrustedElement;
  matchTbm?: string;
}

export class NavBarItems {
  private parentElement!: Element;
  private tbmList: Record<string, string> = {
    all: "All",
    isch: "Images",
    vid: "Videos",
    nws: "News",
    shop: "Shop",
  };
  private thisTbm: string = "all";
  private items: NavBarItem[] = [];

  private itemContainerClassName = "navbar-item-container";
  private itemIconOuterClassName = "navbar-item-icon-outer";

  public setTbm(tbm: string) {
    this.thisTbm = tbm;
  }

  public setParentElement(elem: Element | null | undefined) {
    if (elem !== undefined && elem !== null) {
      this.parentElement = elem;
      this.parentElement.classList.add("navbar-parent");
    }
  }

  public render() {
    this.items.forEach(({ type, itemElem, matchTbm, activeElem }) => {
      if (
        type === "match-active" &&
        matchTbm === this.thisTbm &&
        activeElem !== undefined
      ) {
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

  public appendItem(itemElem: Element | TrustedElement) {
    this.items.push({
      type: "item",
      itemElem,
    });
  }

  public appendTbmActiveItem(
    matchTbm: string,
    itemElem: Element | TrustedElement,
    activeElem: Element | TrustedElement
  ) {
    this.items.push({
      type: "match-active",
      matchTbm,
      itemElem,
      activeElem,
    });
  }

  public createItemElem(
    text: string,
    iconElem: HTMLElement | TrustedElement,
    isLink = false,
    href = ""
  ) {
    const itemContainer: TrustedElement = document.createElement("div");
    itemContainer.className = this.itemContainerClassName;

    if (isLink) {
      const linkElem: TrustedElement = document.createElement("a");
      linkElem.setAttribute("href", href);

      const iconOuter = document.createElement("span");
      iconOuter.appendChild(iconElem);
      iconOuter.className = this.itemIconOuterClassName;
      linkElem.appendChild(iconOuter);

      linkElem.innerHTML = trustedPolicy.createHTML(linkElem.innerHTML + text);
      itemContainer.appendChild(linkElem);
      itemContainer.classList.add("navbar-link-item");
    } else {
      const iconOuter = document.createElement("span");
      iconOuter.className = this.itemIconOuterClassName;
      iconOuter.appendChild(iconElem);

      itemContainer.appendChild(iconOuter);

      itemContainer.innerHTML = trustedPolicy.createHTML(
        itemContainer.innerHTML + text
      );
      itemContainer.classList.add("navbar-now-item");
    }
    return itemContainer;
  }
}

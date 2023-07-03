import { getIconSvgElement, enablePaths, paths } from "../icons";
import { Search } from "./Search";

interface NavBarItem {
  type: "item" | "match-active";
  itemElem: Element;
  activeElem?: Element;
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

  public appendItem(itemElem: Element) {
    this.items.push({
      type: "item",
      itemElem,
    });
  }

  public appendTbmActiveItem(
    matchTbm: string,
    itemElem: Element,
    activeElem: Element
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
    iconElem: HTMLElement,
    isLink = false,
    href = ""
  ) {
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
}

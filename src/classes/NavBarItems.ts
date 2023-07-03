import { getIconSvgElement, enablePaths, paths } from "../icons"
import { Search } from "./Search";

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

  private itemContainerClassName = "navbar-item-container";
  private itemIconOuterClassName = "navbar-item-icon-outer";

  public setTbm(tbm: string) {
    this.thisTbm = tbm;
  }

  public setParentElement(elem: Element | null | undefined) {
    if(elem !== undefined && elem !== null){
    this.parentElement = elem;
    this.parentElement.classList.add("navbar-parent");      
    }

  }

  public render() {
    this.appendItems();
  }

  private createItemElem(
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

  private appendItems() {
    const tbmNames = Object.keys(this.tbmList);

    tbmNames.forEach((tbmName) => {
      if (tbmName === this.thisTbm) {
        // not link
        const item = this.createItemElem(
          this.tbmList[tbmName],
          getIconSvgElement(enablePaths[tbmName]),
          false
        );
        this.parentElement.appendChild(item);
      } else {
        // link
        const search = new Search(location.search);

        if (tbmName !== "all") {
          search.append("tbm", tbmName);
        } else {
          search.delete("tbm");
        }

        const href = search.getURL();

        const item = this.createItemElem(
          this.tbmList[tbmName],
          getIconSvgElement(paths[tbmName]),
          true,
          href
        );
        this.parentElement.appendChild(item);
      }
    });
  }
}

import { NavBarItems } from "./classes/NavBarItems";
import { Search } from "./classes/Search";
import { enablePaths, getIconSvgElement, paths } from "./icons";
import { translate } from "./lang";

export default function registerNavItems(itemsDom: NavBarItems) {
  itemsDom.appendTbmActiveItem(
    "all",
    itemsDom.createItemElem(
      translate("All"),
      getIconSvgElement(paths.all),
      true,
      createAllUrl()
    ),
    itemsDom.createItemElem(
      translate("All"),
      getIconSvgElement(enablePaths.all),
      false
    )
  );

  itemsDom.appendTbmActiveItem(
    "isch",
    itemsDom.createItemElem(
      translate("Images"),
      getIconSvgElement(paths.isch),
      true,
      createTbmUrl("isch")
    ),
    itemsDom.createItemElem(
      translate("Images"),
      getIconSvgElement(enablePaths.isch),
      false
    )
  );

  itemsDom.appendTbmActiveItem(
    "vid",
    itemsDom.createItemElem(
      translate("Videos"),
      getIconSvgElement(paths.vid),
      true,
      createTbmUrl("vid")
    ),
    itemsDom.createItemElem(
      translate("Videos"),
      getIconSvgElement(enablePaths.vid),
      false
    )
  );

  itemsDom.appendItem(
    itemsDom.createItemElem(
      translate("Maps"),
      getIconSvgElement(paths.maps, "0 0 16 16"),
      true,
      createMapUrl()
    )
  );

  itemsDom.appendTbmActiveItem(
    "nws",
    itemsDom.createItemElem(
      translate("News"),
      getIconSvgElement(paths.nws),
      true,
      createTbmUrl("nws")
    ),
    itemsDom.createItemElem(
      translate("News"),
      getIconSvgElement(enablePaths.nws),
      false
    )
  );

  itemsDom.appendTbmActiveItem(
    "shop",
    itemsDom.createItemElem(
      translate("Shopping"),
      getIconSvgElement(paths.shop),
      true,
      createTbmUrl("shop")
    ),
    itemsDom.createItemElem(
      translate("Shopping"),
      getIconSvgElement(enablePaths.shop),
      false
    )
  );

  itemsDom.appendTbmActiveItem(
    "bks",
    itemsDom.createItemElem(
      translate("Books"),
      getIconSvgElement(paths.bks),
      true,
      createTbmUrl("bks")
    ),
    itemsDom.createItemElem(
      translate("Books"),
      getIconSvgElement(enablePaths.bks),
      false
    )
  );
}

function createAllUrl() {
  const search = new Search(location.search);
  search.delete("tbm");
  return search.getURL();
}

function createTbmUrl(tbm: string) {
  const search = new Search(location.search);
  search.append("tbm", tbm);
  return search.getURL();
}

function createMapUrl() {
  const search = new Search(location.search);
  const q = search.get("q");
  return "https://www.google.com/maps/?q=" + q;
}

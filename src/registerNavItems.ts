import { NavBarItems } from "./classes/NavBarItems";
import { Search } from "./classes/Search";
import { enablePaths, getIconSvgElement, paths } from "./icons";

export default function registerNavItems(itemsDom: NavBarItems) {
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

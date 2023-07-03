export class Search {
  private search: string;

  constructor(search: string) {
    this.search = search;
  }

  public parse() {
    const searches: Record<string, string> = {};
    this.search.split("&").forEach((v) => {
      const sp = v.split("=");
      const key = sp[0].replace("?", "");
      searches[key] = sp[1];
    });
    return searches;
  }

  public decord(searches: Record<string, string>) {
    let searchResult = "?";
    Object.keys(searches).forEach((key) => {
      searchResult = searchResult + `${key}=${searches[key]}&`;
    });
    searchResult.slice(0, -1);
    return searchResult;
  }

  public getURL() {
    const url = new URL(location.href);
    url.search = this.search;
    return url.toString();
  }

  public reload() {
    const url = new URL(location.href);
    url.search = this.search;
    location.href = url.toString();
  }

  public append(key: string, val: string) {
    const parsed = this.parse();
    parsed[key] = val;
    this.search = this.decord(parsed);
  }

  delete(key: string) {
    const parsed = this.parse();
    delete parsed[key];
    this.search = this.decord(parsed);
  }

  get(key: string): string | undefined {
    const parsed = this.parse();
    return parsed[key];
  }
}

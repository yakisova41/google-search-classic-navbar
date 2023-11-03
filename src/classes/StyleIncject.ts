import { TrustedElement, exportedTrustedPolicy } from "src";

export class StyleInject {
  private tbm!: string;
  private styles: Record<string, string[]> = {};

  public setTbm(tbm: string) {
    this.tbm = tbm;
  }

  public inject() {
    const elem: TrustedElement = document.createElement("style");

    if (this.styles[this.tbm] !== undefined) {
      elem.innerHTML = exportedTrustedPolicy.createHTML(
        this.styles[this.tbm].join("")
      );
    }

    if (this.styles["*"] !== undefined) {
      elem.innerHTML = exportedTrustedPolicy.createHTML(
        elem.innerHTML + this.styles["*"].join("")
      );
    }

    const head = document.head;

    if (head === null) {
      const i = setInterval(() => {
        if (document.head !== null) {
          document.head.appendChild(elem);
          clearInterval(i);
        }
      }, 100);
    } else {
      document.head.appendChild(elem);
    }
  }

  public addStyle(tbms: string[], style: string) {
    tbms.forEach((tbm) => {
      if (this.styles[tbm] === undefined) {
        this.styles[tbm] = [];
      }

      this.styles[tbm].push(style.replaceAll("\t", "").replaceAll("\n", ""));
    });
  }

  public injectOnLoad(tbms: string[], callback: () => string) {
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
        const elem: TrustedElement = document.createElement("style");
        elem.innerHTML = exportedTrustedPolicy.createHTML(
          callback().replaceAll("\t", "").replaceAll("\n", "")
        );
        document.head.appendChild(elem);
      }
    });
  }
}

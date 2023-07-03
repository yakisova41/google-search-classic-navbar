import { StyleInject } from "./classes/StyleIncject";

export default function attachTheme(styleInjecter: StyleInject) {
  styleInjecter.injectOnLoad(["*"], () => {
    const theme =
      getComputedStyle(document.body).backgroundColor === "rgb(32, 33, 36)"
        ? "dark"
        : "right";

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
      `,
    };

    return styles[theme];
  });
}

import { StyleInject } from "./classes/StyleIncject";

export default function registerStyle(styleInjecter: StyleInject) {
  styleInjecter.addStyle(
    ["all", "vid", "nws", "bks"],
    `
    .main > div:nth-child(1) > div:nth-child(1) {
      height: 45px;
    }

    .google-classic-navbar-parent-outer > div:nth-child(1) {
      padding-left: 0;
      height: 43px;
    }


    .google-classic-navbar-parent-outer > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
      align-items: center;
    }


    .main > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) {
      padding-left: 0;
      height: 43p;
    }


    .main > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
      align-items: center;
    }

    .main > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .navbar-item-container {
      margin: 9px 1px 0!important;
    }

    @media (min-width: 1124px) and (max-width: 1300px){
      .srp {
        --center-abs-margin: 30px!important;
      }
    }
    @media (min-width: 1410px) and (max-width: 1610px) {
      .srp {
        --center-abs-margin: 180px!important;
      }
    }
    @media (min-width: 1610px){
      .srp {
        --center-abs-margin: 180px!important;
      }
    }`
  );

  styleInjecter.addStyle(
    ["isch"],
    `
    body > div:nth-child(6) > c-wiz:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
      height:59px;
    }

    body > div:nth-child(6) > c-wiz:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
      margin-left:0;
    }
    `
  );

  styleInjecter.addStyle(
    ["shop"],
    `
    #cnt > div:nth-child(1) {
      height: 45px;
    }

    #cnt > div:nth-child(4) {
      padding: 23px 0 0px calc(var(--center-abs-margin) - 20px);
    }

    #cnt > div:nth-child(4) > div:nth-child(2) {
      margin-left:0;
    }
    `
  );

  styleInjecter.addStyle(
    ["*"],
    `
    .navbar-parent {
      display: inline;
      margin-left: 169px;
      white-space: nowrap;
      color: #70757a;
      font-size: 13px;
      -webkit-user-select: none;
  
    }
  
    .navbar-now-item {
      border-bottom: 3px solid var(--classic-google-nav-bar-primary);
      color: var(--classic-google-nav-bar-primary);
    }
  
    .navbar-item-container {
      padding: 16px 12px 12px 10px;
      font-family: Google Sans,Roboto,HelveticaNeue,Arial,sans-serif;
      height: 16px;
      line-height: 16px;
      margin: 11px 1px 0;
      display: inline-block;
      font-size: 13px;
    }
  
    .navbar-item-icon-outer {
      display: inline-block;
      fill: currentColor;
      height: 16px;
      width: 16px;
      margin-right: 5px;
      vertical-align: text-bottom;
    }
  
    .navbar-now-item > navbar-item-icon-outer {
      fill: currentColor;
    }
  
    .navbar-item-container > a {
      text-decoration: none;
      color: var(--classic-google-nav-bar-text)!important;
      -webkit-tap-highlight-color: rgba(0,0,0,.10);
    }
    `
  );
}

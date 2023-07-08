const langList: Record<string, Record<string, string>> = {
  All: {
    ja: "すべて",
    de: "Alle",
    es: "Todo",
    fr: "Tous",
    ko: "전체",
    zh: "全部",
  },
  Images: {
    ja: "画像",
    de: "Bilder",
    es: "Imágenes",
    ko: "이미지",
    zh: "图片",
  },
  Videos: {
    ja: "動画",
    fr: "Vidéos",
    ko: "동영상",
    zh: "视频",
  },
  Maps: {
    ja: "地図",
    ko: "지도",
    zh: "地图",
  },
  News: {
    ja: "ニュース",
    es: "Noticias",
    fr: "Actualités",
    ko: "뉴스",
    zh: "新闻",
  },
  Shopping: {
    ja: "ショッピング",
    ko: "쇼핑",
    zh: "购物",
  },
  Books: {
    ja: "書籍",
    de: "Bücher",
    es: "Libros",
    fr: "Livres",
    ko: "쇼핑",
    zh: "图书",
  },
};

export function translate(text: string): string {
  const lang = navigator.language;
  if (langList[text][lang] !== undefined) {
    return langList[text][lang];
  } else {
    return text;
  }
}

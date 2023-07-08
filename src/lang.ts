const langList: Record<string, Record<string, string>> = {
  All: {
    ja: "すべて",
  },
  Images: {
    ja: "画像",
  },
  Videos: {
    ja: "動画",
  },
  Maps: {
    ja: "地図",
  },
  News: {
    ja: "ニュース",
  },
  Shopping: {
    ja: "ショッピング",
  },
  Books: {
    ja: "書籍",
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

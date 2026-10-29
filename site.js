/* つくしとちょこのおうち 共通スクリプト：言語切替（日本語 / English）とBGM
   ・翻訳したい要素に data-i18n="キー"（文字）/ data-i18n-html="キー"（改行あり）/ data-i18n-aria="キー" / data-i18n-alt="キー" を付けます
   ・訳文は下の DICT に追加します
   ・BGMは PLAYLIST の曲を順番にくり返し再生します。空のあいだはボタンが「準備中」になります */
(function () {
  const PLAYLIST = [
    { src: "audio/tsukushi-song.mp3", title: { ja: "私はサビ猫つくしです", en: "I'm Tsukushi the Tortie" } },
    { src: "audio/hidamari.mp3", title: { ja: "それでも、陽だまりは続く", en: "Still, the Sunny Spot Goes On" } },
    { src: "audio/bekko.mp3", title: { ja: "べっ甲のきみ", en: "My Tortoiseshell Love" } }
    // 曲を増やすときは、ここに { src: "audio/ファイル名.mp3", title: { ja: "曲名", en: "Song title" } } を追加します
  ];

  const DICT = {
    ja: {
      "title.index": "つくしとちょこのおうち",
      "title.album": "つくしとちょこのアルバム",
      "title.stamps": "つくしのLINEスタンプ",
      "nav.links": "つくしとちょこのリンク集",
      "link.ig": "毎日の2匹",
      "link.tt": "Live配信",
      "link.yt": "じっくり動画",
      "link.line": "LINEスタンプ",
      "link.line.sub": "スタンプ・絵文字",
      "badge.sale": "販売中",
      "badge.soon": "準備中",
      "hero.s1": "今日も6割",
      "hero.s2": "にゃん♪",
      "hero.tsukushi": "つくし",
      "hero.choco": "ちょこ",
      "hero.tsukushi.alt": "サビ猫のつくし",
      "hero.choco.alt": "白茶猫のちょこ",
      "hero.hello": "はじめまして！",
      "hero.name": "つくちょこ<wbr>日和",
      "hero.sub": "TSUKUSHI & CHOCO",
      "hero.lead": "「今日も6割、つくしとちょこと私。」サビ猫のつくしと、白茶猫のちょこ。女の子2匹ののんびりした毎日をお届けします。",
      "profile.tsukushi.kind": "サビ猫",
      "profile.choco.kind": "白茶猫",
      "profile.breed": "毛色",
      "profile.sex": "性別", "profile.sex.v": "女の子",
      "profile.bday": "誕生日",
      "profile.bday.choco": "2016.9.13（推定）",
      "profile.char": "性格",
      "profile.tsukushi.char": "ちょっとビビりで甘えん坊",
      "profile.choco.status": "いま",
      "profile.choco.status.v": "おうち慣れ中（2026年9月に家族になりました）",
      "profile.tsukushi.say": "保護猫カフェ出身のお姫さま。リビングの定位置でまったり。",
      "profile.choco.say": "新しい家族。ケージを出て、おうちを少しずつ探検中。",
      "story": "<b>2匹は少しずつ、少しずつ、</b>距離を縮めています。",
      "live.tag": "LIVE",
      "live.title": "毎週火曜と金曜にTikTokでライブ配信中！",
      "live.go": "TikTokで見る",
      "albumcard.title": "つくしとちょこのアルバム",
      "albumcard.text": "爪とぎトンネル、エビのおもちゃ、ふわふわベッド。2匹の写真を集めています。",
      "albumcard.go": "アルバムを見る →",
      "footer": "© 2026 つくしとちょこのおうち",
      "back": "← トップへ",
      "album.title": "つくしとちょこのアルバム",
      "album.book": "えらんだ写真",
      "album.prev": "‹ まえ",
      "album.next": "つぎ ›",
      "album.prev.aria": "前の写真",
      "album.next.aria": "次の写真",
      "album.list": "写真の一覧",
      "album.tabs": "表示の切り替え",
      "album.all": "すべて",
      "album.photo": "写真",
      "album.video": "動画",
      "album.empty": "写真と動画はこれから追加していきます。お楽しみに！",
      "album.bookempty": "写真はこれから<br>追加していきます",
      "stamps.title": "LINEスタンプ・絵文字",
      "stamps.lead": "サビ猫つくしのLINEスタンプと絵文字です。気になるものはLINE STOREでチェックしてにゃ。",
      "stamps.sticker": "スタンプ",
      "stamps.emoji": "絵文字",
      "stamps.sets": "{n}種類",
      "stamps.count": "{n}個入り",
      "stamps.buy": "LINE STOREで見る →",
      "stamps.ph": "プレビューはLINE STOREで見られます",
      "tools.lang": "言語",
      "bgm.label": "BGMを流す",
      "bgm.play": "BGMを再生",
      "bgm.pause": "BGMを一時停止",
      "bgm.none": "BGMは準備中です",
      "bgm.soon": "BGM準備中"
    },
    en: {
      "title.index": "Tsukushi & Choco's Home",
      "title.album": "Tsukushi & Choco's Album",
      "title.stamps": "Tsukushi's LINE Stickers",
      "nav.links": "Tsukushi & Choco's links",
      "link.ig": "Daily photos",
      "link.tt": "Live streams",
      "link.yt": "Videos",
      "link.line": "LINE Stickers",
      "link.line.sub": "Stickers & emoji",
      "badge.sale": "On sale",
      "badge.soon": "Soon",
      "hero.s1": "60% every day",
      "hero.s2": "Meow♪",
      "hero.tsukushi": "Tsukushi",
      "hero.choco": "Choco",
      "hero.tsukushi.alt": "Tsukushi, a tortoiseshell cat",
      "hero.choco.alt": "Choco, an orange-and-white cat",
      "hero.hello": "Nice to meet you!",
      "hero.name": "Tsukuchoko<wbr> Days",
      "hero.sub": "つくしとちょこ",
      "hero.lead": "\"60% again today: Tsukushi, Choco, and me.\" Tsukushi the tortoiseshell and Choco the orange-and-white. Sharing the easygoing days of two girls.",
      "profile.tsukushi.kind": "Tortoiseshell",
      "profile.choco.kind": "Orange & white",
      "profile.breed": "Coat",
      "profile.sex": "Sex", "profile.sex.v": "Girl",
      "profile.bday": "Birthday",
      "profile.bday.choco": "2016.9.13 (estimated)",
      "profile.char": "Personality",
      "profile.tsukushi.char": "A little timid and very cuddly",
      "profile.choco.status": "Now",
      "profile.choco.status.v": "Settling in (joined the family in Sept 2026)",
      "profile.tsukushi.say": "A princess from a rescue cat café. Relaxing in her usual spot in the living room.",
      "profile.choco.say": "Our newest family member, exploring the house little by little.",
      "story": "<b>Little by little,</b> the two are getting closer.",
      "live.tag": "LIVE",
      "live.title": "Live on TikTok every Tuesday and Friday!",
      "live.go": "Watch on TikTok",
      "albumcard.title": "Tsukushi & Choco's Album",
      "albumcard.text": "The scratcher tunnel, the shrimp toy, the fluffy bed. A collection of photos of the two.",
      "albumcard.go": "View the album →",
      "footer": "© 2026 Tsukushi & Choco's Home",
      "back": "← Home",
      "album.title": "Tsukushi & Choco's Album",
      "album.book": "Selected photo",
      "album.prev": "‹ Prev",
      "album.next": "Next ›",
      "album.prev.aria": "Previous photo",
      "album.next.aria": "Next photo",
      "album.list": "All photos",
      "album.tabs": "Filter",
      "album.all": "All",
      "album.photo": "Photos",
      "album.video": "Videos",
      "album.empty": "Photos and videos are coming soon. Stay tuned!",
      "album.bookempty": "Photos are<br>coming soon",
      "stamps.title": "LINE Stickers & Emoji",
      "stamps.lead": "LINE stickers and emoji of Tsukushi the tortoiseshell. Check them out on the LINE STORE!",
      "stamps.sticker": "Stickers",
      "stamps.emoji": "Emoji",
      "stamps.sets": "{n} sets",
      "stamps.count": "{n} items",
      "stamps.buy": "View on LINE STORE →",
      "stamps.ph": "See the preview on the LINE STORE",
      "tools.lang": "Language",
      "bgm.label": "Play music",
      "bgm.play": "Play music",
      "bgm.pause": "Pause music",
      "bgm.none": "Music is coming soon",
      "bgm.soon": "Music soon"
    }
  };

  const LANGS = { ja: "日本語", en: "EN" };
  const listeners = [];

  function readLang() {
    try { const v = localStorage.getItem("tc-lang"); if (v && DICT[v]) return v; } catch (e) {}
    return (navigator.language || "ja").toLowerCase().startsWith("ja") ? "ja" : "en";
  }
  let lang = readLang();

  function t(key, vars) {
    let s = (DICT[lang] && DICT[lang][key]) ?? DICT.ja[key] ?? key;
    if (vars) for (const k in vars) s = s.replace("{" + k + "}", vars[k]);
    return s;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAlt)); if ("alt" in el) el.alt = t(el.dataset.i18nAlt); });
    const titleKey = document.querySelector("[data-page-title]")?.dataset.pageTitle;
    if (titleKey) document.title = t(titleKey);
    document.querySelectorAll(".tools .seg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    seg.setAttribute("aria-label", t("tools.lang"));
    updateBgm();
    listeners.forEach(fn => fn(lang));
  }

  function setLang(next) {
    if (!DICT[next] || next === lang) return;
    lang = next;
    try { localStorage.setItem("tc-lang", lang); } catch (e) {}
    apply();
  }

  /* ---------- ツール（左下） ---------- */
  const tools = document.createElement("div");
  tools.className = "tools";
  const seg = document.createElement("div");
  seg.className = "seg";
  seg.setAttribute("role", "group");
  for (const code in LANGS) {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.lang = code;
    b.lang = code;
    b.textContent = LANGS[code];
    b.addEventListener("click", () => setLang(code));
    seg.append(b);
  }
  const bgm = document.createElement("button");
  bgm.type = "button";
  bgm.className = "bgm";
  bgm.setAttribute("aria-pressed", "false");
  bgm.innerHTML = '<span class="note" aria-hidden="true">♪</span><span class="bgm-label"></span>';
  tools.append(seg, bgm);
  document.body.append(tools);

  /* ---------- BGM（ボタンを押したときだけ再生） ---------- */
  const audio = new Audio();
  audio.preload = "none";
  audio.volume = 0.5;
  let track = 0;
  let available = PLAYLIST.length ? null : false; // null=未確認, true/false

  if (PLAYLIST.length) {
    fetch(PLAYLIST[0].src, { method: "HEAD" })
      .then(r => { available = r.ok; updateBgm(); })
      .catch(() => { available = false; updateBgm(); });
  }

  function updateBgm() {
    const playing = !audio.paused;
    const song = PLAYLIST.length ? (PLAYLIST[track].title[lang] || PLAYLIST[track].title.ja) : "";
    bgm.querySelector(".bgm-label").textContent = available === false ? t("bgm.soon") : (playing ? song : t("bgm.label"));
    bgm.disabled = available === false;
    bgm.setAttribute("aria-pressed", playing);
    bgm.setAttribute("aria-label", available === false ? t("bgm.none") : t(playing ? "bgm.pause" : "bgm.play"));
    bgm.title = available === false ? t("bgm.none") : "";
  }
  bgm.addEventListener("click", () => {
    if (available === false) return;
    if (audio.paused) {
      if (!audio.src) audio.src = PLAYLIST[track].src;
      audio.play().catch(() => { available = false; updateBgm(); });
    } else {
      audio.pause();
    }
  });
  // 1曲終わったら次の曲へ。最後の曲のあとは最初に戻る
  audio.addEventListener("ended", () => {
    track = (track + 1) % PLAYLIST.length;
    audio.src = PLAYLIST[track].src;
    audio.play().catch(updateBgm);
  });
  audio.addEventListener("play", updateBgm);
  audio.addEventListener("pause", updateBgm);

  window.SITE = { t, get lang() { return lang; }, onLang: fn => listeners.push(fn), lineUrl: url => url.replace(/\/ja$/, "/" + lang) };
  apply();
})();

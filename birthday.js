/* つくし・ちょこの誕生日デコレーション（トップページ）
   ・毎年それぞれの誕生日から3日間（日本時間）、自動で飾りつけます。年齢も自動で計算します
     つくし：3月11日〜13日（桜の花かんむり・花びら）　ちょこ：9月13日〜15日（コスモスの花かんむり・チョコのつぶ）
   ・見た目だけ確かめたいときは、アドレスの最後に #birthday-tsukushi か #birthday-choco を付けて開きます */
(function () {
  if (!window.SITE) return;
  const CATS = {
    tsukushi: { born: 2019, month: 3, day: 11, slot: 0, colors: ["#f6b8c8", "#fbd3dd", "#ffe9ee", "#f29bb2"] },
    choco:    { born: 2016, month: 9, day: 13, slot: 1, colors: ["#7a4a2e", "#a86b43", "#e9a35e", "#f2cf7e"] }
  };
  const DAYS = 3;
  const JST = 9 * 60 * 6e4;
  const j = new Date(Date.now() + JST);
  const now = { y: j.getUTCFullYear(), m: j.getUTCMonth() + 1, d: j.getUTCDate() };

  const hash = location.hash.replace("#birthday-", "");
  const key = CATS[hash] ? hash
    : Object.keys(CATS).find(k => CATS[k].month === now.m && now.d >= CATS[k].day && now.d < CATS[k].day + DAYS);
  if (!key) return;
  const cat = CATS[key];
  const isDay = !!CATS[hash] || now.d === cat.day;
  const age = now.y - cat.born;
  const { t } = SITE;

  document.documentElement.classList.add("birthday", "bday-" + key);

  // 1) リンクの下に、ぬい目のついたお祝いワッペン
  const banner = document.createElement("section");
  banner.className = "bday-patch";
  banner.innerHTML =
    '<span class="bday-cake" aria-hidden="true"><svg viewBox="0 0 64 64">' +
      '<path d="M32 4 C35 9 36 12 32 15 C28 12 29 9 32 4 Z" fill="#f2a24a"/>' +
      '<rect x="29.5" y="15" width="5" height="12" rx="2" fill="#fffdf9" stroke="#3a2a22" stroke-width="1.5"/>' +
      '<rect x="10" y="27" width="44" height="14" rx="5" fill="var(--bday-c1)" stroke="#3a2a22" stroke-width="2"/>' +
      '<rect x="6" y="40" width="52" height="18" rx="6" fill="var(--bday-c2)" stroke="#3a2a22" stroke-width="2"/>' +
      '<path d="M10 33 q4 4 8 0 t8 0 t8 0 t8 0 t8 0" fill="none" stroke="#fffdf9" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M10 49 h44" stroke="#3a2a22" stroke-width="1.5" stroke-dasharray="3 3"/>' +
    '</svg></span>' +
    '<span class="bday-text"><b></b><small></small></span>';
  const hero = document.querySelector(".hero");
  if (hero) hero.before(banner);

  // 2) 誕生日の子の写真に花かんむりと、年齢入りのリボン（ロゼット）
  const holder = document.querySelectorAll(".duo .cat")[cat.slot];
  let rosette;
  if (holder) {
    holder.classList.add("bday-star");
    const crown = document.createElement("span");
    crown.className = "bday-crown";
    crown.setAttribute("aria-hidden", "true");
    crown.innerHTML = key === "tsukushi" ? sakuraCrown() : cosmosCrown();
    holder.prepend(crown);
    rosette = document.createElement("span");
    rosette.className = "bday-rosette";
    rosette.setAttribute("aria-hidden", "true");
    rosette.innerHTML = '<svg viewBox="0 0 80 110">' +
      '<path d="M26 60 L14 106 L28 96 L36 108 L42 64 Z" fill="var(--bday-c2)" stroke="#3a2a22" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M54 60 L66 106 L52 96 L44 108 L38 64 Z" fill="var(--bday-c1)" stroke="#3a2a22" stroke-width="2" stroke-linejoin="round"/>' +
      '<circle cx="40" cy="40" r="36" fill="var(--bday-c1)" stroke="#3a2a22" stroke-width="2"/>' +
      '<circle cx="40" cy="40" r="28" fill="#fffdf9" stroke="var(--bday-c2)" stroke-width="3" stroke-dasharray="4 3"/>' +
      '</svg><b></b>';
    holder.querySelector(".frame").after(rosette);
  }

  // 3) 開いたときに1回だけ、つくしは桜の花びら・ちょこはチョコのつぶが舞います（動きを減らす設定の人には出しません）
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const box = document.createElement("div");
    box.className = "bday-fall bday-fall-" + key;
    box.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.background = cat.colors[i % cat.colors.length];
      p.style.animationDelay = (Math.random() * 1.6).toFixed(2) + "s";
      p.style.animationDuration = (3.6 + Math.random() * 2.4).toFixed(2) + "s";
      p.style.setProperty("--x", (Math.random() * 200 - 100).toFixed(0) + "px");
      p.style.setProperty("--r", (Math.random() * 540 - 270).toFixed(0) + "deg");
      p.style.setProperty("--s", (0.7 + Math.random() * 0.6).toFixed(2));
      box.append(p);
    }
    document.body.append(box);
    setTimeout(() => box.remove(), 8000);
  }

  function render() {
    const name = t("hero." + key);
    banner.querySelector("b").textContent = t(isDay ? "bday.today" : "bday.after", { name, n: age });
    banner.querySelector("small").textContent = t("bday.sub." + key);
    if (rosette) rosette.querySelector("b").textContent = t("bday.age", { n: age });
    const s1 = document.querySelector(".sticker.s1");
    if (s1) s1.textContent = t("bday.sticker", { name, n: age });
  }
  SITE.onLang(render);
  render();

  function sakuraCrown() {
    const flower = (x, y, r, c) => {
      let s = "";
      for (let i = 0; i < 5; i++) s += `<ellipse cx="${x}" cy="${y - r * .55}" rx="${r * .42}" ry="${r * .58}" fill="${c}" stroke="#3a2a22" stroke-width="1.2" transform="rotate(${i * 72} ${x} ${y})"/>`;
      return s + `<circle cx="${x}" cy="${y}" r="${r * .22}" fill="#f2cf7e"/>`;
    };
    return '<svg viewBox="0 0 200 70">' +
      '<path d="M8 52 Q100 6 192 52" fill="none" stroke="#8fae7a" stroke-width="5" stroke-linecap="round"/>' +
      // つくし（植物）を2本
      '<path d="M58 40 v-22" stroke="#c9a46a" stroke-width="4" stroke-linecap="round"/><ellipse cx="58" cy="14" rx="5" ry="9" fill="#a8764a" stroke="#3a2a22" stroke-width="1.2"/>' +
      '<path d="M142 40 v-22" stroke="#c9a46a" stroke-width="4" stroke-linecap="round"/><ellipse cx="142" cy="14" rx="5" ry="9" fill="#a8764a" stroke="#3a2a22" stroke-width="1.2"/>' +
      flower(24, 46, 16, "#f6b8c8") + flower(78, 30, 18, "#fbd3dd") + flower(122, 30, 18, "#f6b8c8") + flower(176, 46, 16, "#fbd3dd") + flower(100, 22, 20, "#f29bb2") +
      '</svg>';
  }
  function cosmosCrown() {
    const flower = (x, y, r, c) => {
      let s = "";
      for (let i = 0; i < 8; i++) s += `<path d="M${x} ${y} L${x - r * .28} ${y - r * .8} Q${x} ${y - r * 1.05} ${x + r * .28} ${y - r * .8} Z" fill="${c}" stroke="#3a2a22" stroke-width="1.1" stroke-linejoin="round" transform="rotate(${i * 45} ${x} ${y})"/>`;
      return s + `<circle cx="${x}" cy="${y}" r="${r * .26}" fill="#f2c14e" stroke="#3a2a22" stroke-width="1.1"/>`;
    };
    return '<svg viewBox="0 0 200 70">' +
      '<path d="M8 52 Q100 6 192 52" fill="none" stroke="#7f9c6b" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M44 40 q6 -14 18 -16 M156 40 q-6 -14 -18 -16" fill="none" stroke="#7f9c6b" stroke-width="3" stroke-linecap="round"/>' +
      flower(24, 46, 18, "#f7c6d4") + flower(72, 30, 18, "#fffdf9") + flower(128, 30, 18, "#e98fb0") + flower(176, 46, 18, "#fffdf9") + flower(100, 24, 21, "#f7c6d4") +
      '</svg>';
  }
})();

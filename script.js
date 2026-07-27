(() => {
  "use strict";

  const translations = {
    ru: {
      pageTitle: "Елене — 29",
      pageDescription: "Особенное письмо для Елены в день её рождения.",
      gateEyebrow: "Личная доставка из Набеля в Северодвинск",
      gateDate: "28 июля · только для Елены",
      envelopeTo: "Елене",
      postmark: "Северодвинск · 28.07.2026",
      openHint: "Нажми, чтобы открыть",
      openAria: "Открыть письмо для Елены",
      videoTitle: "Маленькое вступление",
      videoError: "Видео не запустилось, но письмо всё равно ждёт тебя.",
      mute: "Без звука",
      unmute: "Со звуком",
      muteAria: "Выключить звук видео",
      unmuteAria: "Включить звук видео",
      skip: "Пропустить",
      heroKicker: "Письмо с края Белого моря",
      heroTitle: "Елена, с днём рождения.",
      heroDedication: "Для самой красивой женщины из тех, кого мне посчастливилось знать.",
      heroAlt: "Елена задувает свечи 29 на праздничном торте",
      heroAlt2: "Елена задувает свечи 29 — кадр 2",
      heroAlt3: "Елена задувает свечи 29 — кадр 3",
      heroAlt4: "Елена задувает свечи 29 — кадр 4",
      burstSlideshowAria: "Серия снимков Елены в день рождения",
      portraitCaption: "Сияние найдено. Источник — Елена.",
      scroll: "Читать письмо",
      scrollAria: "Перейти к письму",
      heroReplay: "Посмотреть видео ещё раз",
      letterKicker: "То, что стоит сказать вслух",
      letterTitle: "Северное сияние бывает не только в небе.",
      letterSalutation: "Елена,",
      letterP1: "сегодня тебе двадцать девять. И это прекрасный повод остановить обычный день на минуту и сказать то, что иногда теряется между делами, сообщениями и расстояниями.",
      letterP2: "Ты — самая красивая женщина из тех, кого мне посчастливилось знать. А в твоих зелёных глазах, кажется, живёт собственное северное сияние — редкое, спокойное и совершенно невозможное для забвения.",
      letterQuote: "Красота привлекает взгляд. Но настоящее чудо — это свет, который человек оставляет после себя.",
      letterP3: "Пусть новый год твоей жизни принесёт тебе больше лёгкости, искреннего смеха и тихой уверенности в себе. Пусть рядом будут люди, которые видят, ценят и берегут тебя такой, какая ты есть.",
      letterP4: "Желаю тебе приключений, о которых захочется рассказывать; спокойствия, к которому приятно возвращаться; и счастливых неожиданностей, которые случаются именно вовремя.",
      letterFootnote: "Ни одно северное сияние не было потревожено при доставке этого письма.",
      wishesKicker: "Небольшая карта на следующий год",
      wishesTitle: "29 северных огоньков",
      wishesIntro: "У каждого — одно короткое пожелание. Можно открыть один, несколько или все. Счастье не требует прохождения квеста.",
      skyMapAria: "Созвездие из двадцати девяти пожеланий",
      wishPrompt: "Коснись любого огонька",
      wishAria: "Открыть пожелание {number} из 29",
      openedLabel: "Открыто",
      ofLabel: "из 29",
      finalKicker: "Остался один огонёк",
      finalTitle: "Самое важное пожелание",
      finalLead: "Некоторые слова должны появляться только после маленького чуда.",
      finalButton: "Зажечь последний огонёк",
      finalWish: "Пусть в этом году жизнь будет к тебе такой же доброй, какой ты заслуживаешь.",
      finalBirthday: "С двадцатидевятилетием, Елена.",
      signature: "От человека, которому очень повезло тебя знать.",
      replay: "Посмотреть вступление ещё раз",
      return: "Вернуться к конверту",
      footer: "Сделано с теплом для Елены · 28.07.2026",
      storybookKicker: "После письма — четыре истории",
      storybookTitle: "Книжная полка Янины и Елены",
      storybookIntro: "Четыре короткие иллюстрированные истории, собранные с предельной серьёзностью и совершенно несерьёзным настроением.",
      storybookCoverAlt: "Иллюстрированная обложка сборника историй Янины и Елены",
      storybookCoverCaption: "Архив совершенно правдивых приключений",
      storybookStatsAria: "Четыре книги, сорок страниц",
      storybookBooksLabel: "книги",
      storybookPagesTotal: "страниц всего",
      storybookShelfAria: "Четыре книги Янины и Елены",
      storybookVolume: "Том",
      storybookBook1Title: "Книга первая",
      storybookBook1Teaser: "Здесь всё начинается — достаточно невинно, чтобы никто не заподозрил продолжение.",
      storybookBook2Title: "Книга вторая",
      storybookBook2Teaser: "Продолжение, в котором здравый смысл ненадолго вышел из комнаты.",
      storybookBook3Title: "Книга третья",
      storybookBook3Teaser: "К этому моменту история уже точно знает, что делает. Наверное.",
      storybookBook4Title: "Книга четвёртая",
      storybookBook4Teaser: "Финал с очень важным видом, аккуратной обложкой и последним неожиданным поворотом.",
      storybookTenPages: "10 страниц",
      storybookRead: "Читать",
      storybookDownload: "Скачать",
      storybookFootnote: "Любое сходство с реальными приключениями следует считать отличной работой автора.",
      readerEyebrow: "Книжная полка Янины и Елены",
      readerCloseAria: "Закрыть программу чтения",
      readerFrameTitle: "Встроенная программа чтения PDF",
      readerLoading: "Открываем книгу…",
      readerFallback: "Если встроенная книга не отображается, открой её в новой вкладке.",
      readerOpenTab: "Открыть отдельно",
      club30Kicker: "Увидимся в следующем году",
      club30Title: "Добро пожаловать в клуб 30-ти",
      timerDays: "Дни",
      timerHours: "Часы",
      timerMinutes: "Минуты",
      timerSeconds: "Секунды"
    },
    en: {
      pageTitle: "For Elena — 29",
      pageDescription: "A special birthday letter for Elena.",
      gateEyebrow: "A personal delivery from Nabeul to Severodvinsk",
      gateDate: "28 July · for Elena only",
      envelopeTo: "For Elena",
      postmark: "Severodvinsk · 28.07.2026",
      openHint: "Tap to open",
      openAria: "Open Elena's letter",
      videoTitle: "A little introduction",
      videoError: "The video could not start, but your letter is still waiting.",
      mute: "Mute",
      unmute: "Sound on",
      muteAria: "Mute the video",
      unmuteAria: "Turn on video sound",
      skip: "Skip",
      heroKicker: "A letter from the White Sea",
      heroTitle: "Happy birthday, Elena.",
      heroDedication: "For the most beautiful woman I have ever been lucky enough to know.",
      july: "July",
      heroAlt: "Elena blowing out number 29 candles on her birthday cake",
      heroAlt2: "Elena blowing out candles 29 — shot 2",
      heroAlt3: "Elena blowing out candles 29 — shot 3",
      heroAlt4: "Elena blowing out candles 29 — shot 4",
      burstSlideshowAria: "Burst photo sequence of Elena",
      portraitCaption: "Glow located. Source: Elena.",
      scroll: "Read the letter",
      scrollAria: "Go to the letter",
      heroReplay: "Watch the video again",
      letterKicker: "What deserves to be said out loud",
      letterTitle: "The northern lights do not live only in the sky.",
      letterSalutation: "Elena,",
      letterP1: "today you turn twenty-nine. It is a beautiful reason to pause an ordinary day for a moment and say what sometimes gets lost between plans, messages, and distances.",
      letterP2: "You are the most beautiful woman I have ever been lucky enough to know. And your green eyes seem to hold northern lights of their own—rare, serene, and completely impossible to forget.",
      letterQuote: "Beauty catches the eye. The true wonder is the light a person leaves behind.",
      letterP3: "May this new year of your life bring you more ease, honest laughter, and quiet confidence in yourself. May you be surrounded by people who truly see, value, and cherish you exactly as you are.",
      letterP4: "I wish you adventures worth retelling, calm you will always enjoy returning to, and happy surprises that arrive at precisely the right moment.",
      letterFootnote: "No northern lights were disturbed during the delivery of this letter.",
      wishesKicker: "A small map for the year ahead",
      wishesTitle: "29 northern lights",
      wishesIntro: "Each one carries a tiny wish. Open one, a few, or all of them. Happiness does not require completing a quest.",
      skyMapAria: "A constellation of twenty-nine birthday wishes",
      wishPrompt: "Touch any little light",
      wishAria: "Open wish {number} of 29",
      openedLabel: "Opened",
      ofLabel: "of 29",
      finalKicker: "One little light remains",
      finalTitle: "The most important wish",
      finalLead: "Some words should appear only after a small piece of magic.",
      finalButton: "Light the final glow",
      finalWish: "May life be as kind to you this year as you deserve it to be.",
      finalBirthday: "Happy twenty-ninth, Elena.",
      signature: "From someone who feels very lucky to know you.",
      replay: "Watch the introduction again",
      return: "Return to the envelope",
      footer: "Made warmly for Elena · 28.07.2026",
      storybookKicker: "After the letter—four little stories",
      storybookTitle: "Yanina & Elena’s Storybook Shelf",
      storybookIntro: "Four short illustrated stories, assembled with complete seriousness and an entirely unserious frame of mind.",
      storybookCoverAlt: "Illustrated cover of Yanina and Elena's storybook collection",
      storybookCoverCaption: "An archive of completely true adventures",
      storybookStatsAria: "Four books, forty pages",
      storybookBooksLabel: "books",
      storybookPagesTotal: "pages in all",
      storybookShelfAria: "Four storybooks about Yanina and Elena",
      storybookVolume: "Volume",
      storybookBook1Title: "Book One",
      storybookBook1Teaser: "Everything begins here—innocently enough that nobody suspects a sequel.",
      storybookBook2Title: "Book Two",
      storybookBook2Teaser: "The continuation in which common sense briefly leaves the room.",
      storybookBook3Title: "Book Three",
      storybookBook3Teaser: "By now the story definitely knows what it is doing. Probably.",
      storybookBook4Title: "Book Four",
      storybookBook4Teaser: "A finale with a very important expression, a neat cover, and one last turn.",
      storybookTenPages: "10 pages",
      storybookRead: "Read",
      storybookDownload: "Download",
      storybookFootnote: "Any resemblance to real adventures should be considered excellent work by the author.",
      readerEyebrow: "Yanina & Elena’s Storybook Shelf",
      readerCloseAria: "Close the storybook reader",
      readerFrameTitle: "Embedded PDF storybook reader",
      readerLoading: "Opening the book…",
      readerFallback: "If the embedded book does not appear, open it in a new tab.",
      readerOpenTab: "Open separately",
      club30Kicker: "See you next year",
      club30Title: "Welcome to the club of 30",
      timerDays: "Days",
      timerHours: "Hours",
      timerMinutes: "Minutes",
      timerSeconds: "Seconds"
    }
  };

  const wishes = {
    ru: [
      "Больше дней, которые захочется запомнить.",
      "Смеха, после которого болят щёки.",
      "Спокойствия, которое не нужно заслуживать.",
      "Людей, рядом с которыми можно быть собой.",
      "Путешествий с красивым светом и хорошими историями.",
      "Утра, которое начинается без спешки.",
      "Решений, после которых становится легче.",
      "Вдохновения, приходящего без приглашения.",
      "Смелости выбирать то, что радует тебя.",
      "Нежности к себе — особенно в сложные дни.",
      "Неожиданностей только приятного сорта.",
      "Уюта, который всегда ждёт дома.",
      "Мечты, которая вдруг станет планом.",
      "Свободы менять мнение и направление.",
      "Музыки, идеально подходящей к моменту.",
      "Уверенности, тихой и настоящей.",
      "Десертов, которые слишком хороши, чтобы делиться.",
      "Поводов наряжаться просто так.",
      "Зелёного света для важных желаний.",
      "Моря рядом — хотя бы иногда.",
      "Сообщений, которым искренне рада.",
      "Отдыха без чувства вины.",
      "Дела, которым можно гордиться.",
      "Удачи, умеющей находить твой адрес.",
      "Фотографий, на которых счастье настоящее.",
      "Тепла — даже посреди северной зимы.",
      "Любви к себе без мелкого шрифта и условий.",
      "Маленьких чудес в самых обычных местах.",
      "Года, который будет к тебе удивительно добр."
    ],
    en: [
      "More days you will want to remember.",
      "Laughter that makes your cheeks ache.",
      "Peace you never have to earn.",
      "People around whom you can be entirely yourself.",
      "Journeys with beautiful light and good stories.",
      "Mornings that begin without a rush.",
      "Decisions that leave you feeling lighter.",
      "Inspiration that arrives uninvited.",
      "Courage to choose what brings you joy.",
      "Gentleness with yourself, especially on hard days.",
      "Surprises of the pleasant kind only.",
      "A sense of comfort always waiting at home.",
      "A dream that suddenly becomes a plan.",
      "Freedom to change your mind and direction.",
      "Music that fits the moment perfectly.",
      "Confidence that is quiet and real.",
      "Desserts far too good to share.",
      "Reasons to dress beautifully for no reason at all.",
      "Green lights for the wishes that matter.",
      "The sea nearby, at least every now and then.",
      "Messages you are genuinely happy to receive.",
      "Rest without a trace of guilt.",
      "Work you can feel proud of.",
      "Luck that always knows your address.",
      "Photographs where the happiness is real.",
      "Warmth, even in the middle of a northern winter.",
      "Self-love without fine print or conditions.",
      "Tiny miracles in perfectly ordinary places.",
      "A year that is wonderfully kind to you."
    ]
  };

  const wishCoordinates = [
    [17, 19], [25, 13], [35, 12], [43, 17], [46, 25], [43, 34], [36, 42],
    [28, 49], [21, 56], [17, 64], [18, 72], [27, 78], [37, 78], [47, 78],
    [62, 21], [70, 14], [80, 14], [87, 21], [90, 31], [87, 40], [79, 47],
    [69, 45], [62, 38], [60, 29], [66, 22], [86, 50], [83, 61], [78, 71], [70, 79]
  ];

  const gate = document.querySelector("#gate");
  const openLetterButton = document.querySelector("#openLetter");
  const videoOverlay = document.querySelector("#videoOverlay");
  const introVideo = document.querySelector("#introVideo");
  const muteVideoButton = document.querySelector("#muteVideo");
  const skipVideoButton = document.querySelector("#skipVideo");
  const videoError = document.querySelector("#videoError");
  const transitionFlash = document.querySelector(".transition-flash");
  const mainContent = document.querySelector("#mainContent");
  const hero = document.querySelector("#hero");
  const skyMap = document.querySelector("#skyMap");
  const wishCard = document.querySelector("#wishCard");
  const openedCount = document.querySelector("#openedCount");
  const constellation = document.querySelector("#wishes");
  const finale = document.querySelector("#finale");
  const finalButton = document.querySelector("#lightFinalGlow");
  const finalMessage = document.querySelector("#finalMessage");
  const replayButtons = [...document.querySelectorAll("[data-replay-video]")];
  const returnButton = document.querySelector("#returnToStart");
  const pawTrail = document.querySelector("#pawTrail");
  const bookCards = [...document.querySelectorAll("[data-book-src]")];
  const readerDialog = document.querySelector("#storybookReader");
  const readerFrame = document.querySelector("#readerFrame");
  const readerLoading = document.querySelector("#readerLoading");
  const readerCloseButton = document.querySelector("#readerClose");
  const readerBookNumber = document.querySelector("#readerBookNumber");
  const readerBookTitle = document.querySelector("#readerBookTitle");
  const readerOpenTab = document.querySelector("#readerOpenTab");
  const readerDownload = document.querySelector("#readerDownload");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let currentLanguage = getStoredLanguage();
  let currentWishIndex = null;
  let isRevealing = false;
  let activeBookIndex = null;
  let readerTrigger = null;
  const openedWishes = new Set();

  mainContent.inert = true;
  gate.setAttribute("aria-hidden", "false");

  function getStoredLanguage() {
    try {
      const stored = localStorage.getItem("elena-letter-language");
      return stored === "en" ? "en" : "ru";
    } catch (_error) {
      return "ru";
    }
  }

  function storeLanguage(language) {
    try {
      localStorage.setItem("elena-letter-language", language);
    } catch (_error) {
      // The site remains fully functional when storage is unavailable.
    }
  }

  function applyLanguage(language) {
    currentLanguage = language;
    const copy = translations[language];

    document.documentElement.lang = language;
    document.title = copy.pageTitle;
    document.querySelector('meta[name="description"]').setAttribute("content", copy.pageDescription);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (copy[key] !== undefined) element.textContent = copy[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const key = element.dataset.i18nAria;
      if (copy[key] !== undefined) element.setAttribute("aria-label", copy[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.dataset.i18nAlt;
      if (copy[key] !== undefined) element.setAttribute("alt", copy[key]);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const key = element.dataset.i18nTitle;
      if (copy[key] !== undefined) element.setAttribute("title", copy[key]);
    });

    languageButtons.forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    updateMuteControl();
    updateWishButtons();

    if (currentWishIndex === null) {
      wishCard.querySelector("p").textContent = copy.wishPrompt;
      wishCard.querySelector(".wish-card__number").textContent = "✦";
    } else {
      showWish(currentWishIndex, false);
    }

    updateReaderCopy();
    storeLanguage(language);
  }

  function updateMuteControl() {
    const muted = introVideo.muted;
    const copy = translations[currentLanguage];
    muteVideoButton.classList.toggle("is-muted", muted);
    muteVideoButton.querySelector("[data-i18n]").textContent = muted ? copy.unmute : copy.mute;
    muteVideoButton.setAttribute("aria-label", muted ? copy.unmuteAria : copy.muteAria);
  }

  function createWishLights() {
    wishCoordinates.forEach(([x, y], index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "wish-light";
      button.dataset.wishIndex = String(index);
      button.style.left = `${x}%`;
      button.style.top = `${y}%`;
      button.style.setProperty("--i", String(index));
      button.style.setProperty("--scatter-x", `${((index * 73) % 230) - 115}px`);
      button.style.setProperty("--scatter-y", `${((index * 47) % 190) - 95}px`);

      button.addEventListener("click", () => showWish(index, true));
      button.addEventListener("focus", () => showWish(index, false));
      button.addEventListener("mouseenter", () => showWish(index, false));
      skyMap.appendChild(button);
    });
  }

  function updateWishButtons() {
    const template = translations[currentLanguage].wishAria;
    document.querySelectorAll(".wish-light").forEach((button, index) => {
      button.setAttribute("aria-label", template.replace("{number}", String(index + 1)));
      button.setAttribute("aria-pressed", String(openedWishes.has(index)));
    });
  }

  function showWish(index, markOpened) {
    currentWishIndex = index;
    if (markOpened || !openedWishes.has(index)) openedWishes.add(index);

    document.querySelectorAll(".wish-light").forEach((button, buttonIndex) => {
      button.classList.toggle("is-open", openedWishes.has(buttonIndex));
      button.setAttribute("aria-pressed", String(openedWishes.has(buttonIndex)));
    });

    wishCard.querySelector(".wish-card__number").textContent = String(index + 1).padStart(2, "0");
    wishCard.querySelector("p").textContent = wishes[currentLanguage][index];
    openedCount.textContent = String(openedWishes.size);
  }

  function createPawTrail() {
    const pawPositions = [
      [2, 72, -18], [18, 40, 11], [34, 64, -14], [51, 29, 13], [68, 50, -10], [85, 16, 12]
    ];

    pawPositions.forEach(([left, top, rotation]) => {
      const paw = document.createElement("span");
      paw.className = "paw";
      paw.style.left = `${left}%`;
      paw.style.top = `${top}%`;
      paw.style.setProperty("--paw-rotation", `${rotation}deg`);
      for (let i = 0; i < 4; i += 1) paw.appendChild(document.createElement("i"));
      pawTrail.appendChild(paw);
    });
  }

  function updateReaderCopy() {
    if (activeBookIndex === null) return;
    const card = bookCards[activeBookIndex];
    if (!card) return;
    readerBookNumber.textContent = String(activeBookIndex + 1).padStart(2, "0");
    readerBookTitle.textContent = translations[currentLanguage][card.dataset.bookTitleKey];
  }

  function openReader(trigger) {
    const card = trigger.closest("[data-book-src]");
    if (!card) return;

    activeBookIndex = Number(card.dataset.bookIndex);
    readerTrigger = trigger;
    const source = card.dataset.bookSrc;

    updateReaderCopy();
    readerOpenTab.setAttribute("href", source);
    readerDownload.setAttribute("href", source);
    readerLoading.hidden = false;
    readerDialog.hidden = false;
    document.body.classList.add("reader-open");
    mainContent.inert = true;
    readerFrame.setAttribute("src", `${source}#view=FitH&toolbar=1&navpanes=0`);

    window.setTimeout(() => readerCloseButton.focus({ preventScroll: true }), 30);
  }

  function closeReader(restoreFocus = true) {
    if (readerDialog.hidden) return;
    readerDialog.hidden = true;
    document.body.classList.remove("reader-open");
    readerFrame.setAttribute("src", "about:blank");
    readerLoading.hidden = false;
    mainContent.inert = !document.body.classList.contains("site-revealed");

    if (restoreFocus && readerTrigger) readerTrigger.focus({ preventScroll: true });
  }

  function trapReaderFocus(event) {
    if (readerDialog.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeReader();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = [readerCloseButton, readerFrame, readerOpenTab, readerDownload];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function playVideo(fromGate) {
    isRevealing = false;
    videoError.hidden = true;
    videoOverlay.hidden = false;
    videoOverlay.classList.remove("is-closing");
    videoOverlay.classList.toggle("from-gate", fromGate);
    videoOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-active");
    mainContent.inert = true;

    introVideo.currentTime = 0;
    introVideo.loop = false;
    introVideo.muted = false;
    introVideo.volume = 1;
    updateMuteControl();

    if (fromGate) gate.classList.add("is-opening");

    const playRequest = introVideo.play();
    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(() => {
        videoError.hidden = false;
        introVideo.controls = true;
      });
    }

    window.setTimeout(() => skipVideoButton.focus(), fromGate ? 700 : 120);
  }

  function revealSite() {
    if (isRevealing) return;
    isRevealing = true;
    introVideo.pause();
    videoOverlay.classList.add("is-closing");
    transitionFlash.classList.remove("is-active");
    void transitionFlash.offsetWidth;
    transitionFlash.classList.add("is-active");

    document.body.classList.remove("is-gated");
    document.body.classList.remove("video-active");
    document.body.classList.add("site-revealed");
    mainContent.removeAttribute("aria-hidden");
    mainContent.inert = false;
    gate.classList.add("is-leaving");
    gate.setAttribute("aria-hidden", "true");
    window.scrollTo(0, 0);

    window.setTimeout(() => {
      videoOverlay.hidden = true;
      videoOverlay.classList.remove("is-closing", "from-gate");
      videoOverlay.setAttribute("aria-hidden", "true");
      introVideo.controls = false;
      hero.querySelector(".hero__copy").classList.add("is-visible");
      hero.querySelector(".hero__portrait").classList.add("is-visible");
      mainContent.focus({ preventScroll: true });
    }, reduceMotion.matches ? 30 : 760);

    window.setTimeout(() => {
      gate.hidden = true;
    }, reduceMotion.matches ? 40 : 1000);
  }

  function resetExperience() {
    isRevealing = false;
    closeReader(false);
    introVideo.pause();
    videoOverlay.hidden = true;
    videoOverlay.setAttribute("aria-hidden", "true");
    transitionFlash.classList.remove("is-active");

    document.body.classList.add("is-gated");
    document.body.classList.remove("video-active");
    document.body.classList.remove("site-revealed");
    mainContent.setAttribute("aria-hidden", "true");
    mainContent.inert = true;

    gate.hidden = false;
    gate.classList.remove("is-opening", "is-leaving");
    gate.setAttribute("aria-hidden", "false");

    openedWishes.clear();
    currentWishIndex = null;
    openedCount.textContent = "0";
    document.querySelectorAll(".wish-light").forEach((button) => {
      button.classList.remove("is-open");
      button.setAttribute("aria-pressed", "false");
    });
    wishCard.querySelector(".wish-card__number").textContent = "✦";
    wishCard.querySelector("p").textContent = translations[currentLanguage].wishPrompt;

    finale.classList.remove("is-lit");
    finalMessage.hidden = true;
    finalButton.setAttribute("aria-expanded", "false");
    pawTrail.classList.remove("is-visible");

    window.scrollTo(0, 0);
    window.setTimeout(() => openLetterButton.focus({ preventScroll: true }), 80);
  }

  function trapVideoFocus(event) {
    if (videoOverlay.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      revealSite();
      return;
    }

    if (event.key !== "Tab") return;
    const controls = [muteVideoButton, skipVideoButton].filter((element) => !element.disabled);
    const first = controls[0];
    const last = controls[controls.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setupRevealObservers() {
    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
      constellation.classList.add("is-assembled");
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -7% 0px" });

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    const constellationObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        constellation.classList.add("is-assembled");
        observer.disconnect();
      }
    }, { threshold: 0.23 });
    constellationObserver.observe(constellation);
  }

  function setupPointerLight() {
    if (reduceMotion.matches) return;
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty("--pointer-x", x.toFixed(3));
      hero.style.setProperty("--pointer-y", y.toFixed(3));
    });
    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--pointer-x", "0");
      hero.style.setProperty("--pointer-y", "0");
    });
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  openLetterButton.addEventListener("click", () => playVideo(true));
  replayButtons.forEach((button) => button.addEventListener("click", () => playVideo(false)));
  skipVideoButton.addEventListener("click", revealSite);
  introVideo.addEventListener("ended", revealSite);
  introVideo.addEventListener("error", () => {
    videoError.hidden = false;
  });
  muteVideoButton.addEventListener("click", () => {
    introVideo.muted = !introVideo.muted;
    updateMuteControl();
  });
  videoOverlay.addEventListener("keydown", trapVideoFocus);

  bookCards.forEach((card) => {
    card.querySelector("[data-book-open]").addEventListener("click", (event) => openReader(event.currentTarget));
  });
  readerDialog.querySelectorAll("[data-reader-close]").forEach((button) => {
    button.addEventListener("click", () => closeReader());
  });
  readerFrame.addEventListener("load", () => {
    if (!readerDialog.hidden) readerLoading.hidden = true;
  });
  document.addEventListener("keydown", trapReaderFocus);

  finalButton.addEventListener("click", () => {
    finale.classList.add("is-lit");
    finalMessage.hidden = false;
    pawTrail.classList.add("is-visible");
    finalMessage.tabIndex = -1;
    finalButton.setAttribute("aria-expanded", "true");
    window.setTimeout(() => finalMessage.focus({ preventScroll: true }), reduceMotion.matches ? 20 : 600);
  });

  function initHeroBurstSlideshow() {
    const container = document.getElementById("heroBurstSlideshow");
    if (!container) return;

    const images = container.querySelectorAll(".hero__burst-img");
    const shutter = document.getElementById("burstShutter");
    const counter = document.getElementById("burstCounter");
    const dot = container.querySelector(".hero__burst-dot");
    const photoMat = container.closest(".hero__photo-mat");

    if (!images || images.length === 0) return;

    const angles = [1.4, -0.6, 2.1, -1.2];
    let currentIndex = 0;
    let timer = null;
    let isPaused = false;
    const intervalTime = 1200;

    function goToFrame(index, flash = true) {
      if (index === currentIndex && images[index].classList.contains("is-active")) return;

      images.forEach((img, i) => {
        if (i === index) {
          img.classList.add("is-active");
        } else {
          img.classList.remove("is-active");
        }
      });

      currentIndex = index;

      if (counter) {
        counter.textContent = `${isPaused ? "PAUSED" : "BURST"} ${currentIndex + 1}/${images.length}`;
      }

      if (photoMat && angles[currentIndex % angles.length] !== undefined) {
        photoMat.style.setProperty("--photo-rot", `${angles[currentIndex % angles.length]}deg`);
      }

      if (flash && shutter && !reduceMotion.matches) {
        shutter.classList.add("is-flashing");
        requestAnimationFrame(() => {
          setTimeout(() => {
            shutter.classList.remove("is-flashing");
          }, 60);
        });
      }
    }

    function nextFrame() {
      const next = (currentIndex + 1) % images.length;
      goToFrame(next, true);
    }

    function startSlideshow() {
      if (timer || isPaused) return;
      timer = window.setInterval(nextFrame, intervalTime);
    }

    function stopSlideshow() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function togglePause() {
      isPaused = !isPaused;
      if (dot) {
        dot.classList.toggle("is-paused", isPaused);
      }
      if (counter) {
        counter.textContent = `${isPaused ? "PAUSED" : "BURST"} ${currentIndex + 1}/${images.length}`;
      }
      if (isPaused) {
        stopSlideshow();
      } else {
        nextFrame();
        startSlideshow();
      }
    }

    container.addEventListener("click", () => {
      togglePause();
    });

    container.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePause();
      }
    });

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startSlideshow();
            } else {
              stopSlideshow();
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(container);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopSlideshow();
      } else if (!isPaused) {
        startSlideshow();
      }
    });

    startSlideshow();
  }

  returnButton.addEventListener("click", resetExperience);

  createWishLights();
  createPawTrail();
  setupRevealObservers();
  setupPointerLight();
  initHeroBurstSlideshow();
  applyLanguage(currentLanguage);

  // Countdown Timer Logic
  const countdownDate = new Date("2027-07-28T00:00:00").getTime();
  const daysEl = document.getElementById("timer-days");
  const hoursEl = document.getElementById("timer-hours");
  const minutesEl = document.getElementById("timer-minutes");
  const secondsEl = document.getElementById("timer-seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      daysEl.textContent = "000";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(3, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

})();

(() => {
  "use strict";

  const section = document.querySelector("#birthdayFight");
  const overlay = document.querySelector("#fightOverlay");
  if (!section || !overlay) return;

  const COPY = {
    en: {
      kicker: "A secret birthday bonus round",
      title: "Aurora Showdown",
      intro: "Guide Elena through a playful best-of-three sparring match against Yanina. Read the distance, block at the right moment, and charge the Aurora move before the 29-second bell.",
      badge: "Mobile birthday fighter",
      previewTitle: "Elena vs. Yanina",
      previewMeta: "Best of three · 29-second rounds · adaptive opponent",
      start: "Start fight",
      rotateNote: "The fight opens in landscape mode",
      topTitle: "Aurora Showdown · White Sea",
      close: "Close game",
      mute: "Mute sound",
      unmute: "Turn sound on",
      loading: "Preparing the arena",
      rotateTitle: "Turn your phone sideways",
      rotateText: "The White Sea arena needs a little more horizon. The fight will continue automatically in landscape.",
      special: "Aurora",
      resultEyebrow: "Birthday sparring complete",
      winTitle: "Elena shines!",
      winText: "You outread Yanina and lit the White Sea with a perfect birthday finish.",
      loseTitle: "Yanina takes it!",
      loseText: "She adapted quickly. Mix blocks, quick punches, and long kicks before trying again.",
      replay: "Fight again",
      return: "Back to the story",
      round: "ROUND",
      fight: "FIGHT!",
      ready: "READY?",
      ko: "AURORA K.O.",
      time: "TIME!",
      elenaRound: "ELENA TAKES THE ROUND",
      yaninaRound: "YANINA TAKES THE ROUND",
      draw: "EVENLY MATCHED",
      energy: "AURORA"
    },
    ru: {
      kicker: "Секретный праздничный бонус-раунд",
      title: "Северное сияние: поединок",
      intro: "Помоги Елене победить Янину в дружеском поединке до двух побед. Держи дистанцию, вовремя ставь блок и заряди сияние до звонка на 29-й секунде.",
      badge: "Мобильный праздничный файтинг",
      previewTitle: "Елена против Янины",
      previewMeta: "До двух побед · раунды по 29 секунд · адаптивная соперница",
      start: "Начать бой",
      rotateNote: "Игра откроется в альбомном режиме",
      topTitle: "Поединок под сиянием · Белое море",
      close: "Закрыть игру",
      mute: "Выключить звук",
      unmute: "Включить звук",
      loading: "Готовим арену",
      rotateTitle: "Поверни телефон",
      rotateText: "Арене у Белого моря нужно немного больше горизонта. Бой продолжится автоматически в альбомном режиме.",
      special: "Сияние",
      resultEyebrow: "Праздничный поединок завершён",
      winTitle: "Елена сияет!",
      winText: "Ты разгадала тактику Янины и завершила бой идеальной праздничной победой.",
      loseTitle: "Победа Янины!",
      loseText: "Она быстро приспособилась. Чередуй блок, быстрый удар и дальний удар ногой — и попробуй ещё раз.",
      replay: "Сыграть ещё",
      return: "Вернуться к истории",
      round: "РАУНД",
      fight: "БОЙ!",
      ready: "ГОТОВА?",
      ko: "СИЯНИЕ — НОКАУТ",
      time: "ВРЕМЯ!",
      elenaRound: "РАУНД ЗА ЕЛЕНОЙ",
      yaninaRound: "РАУНД ЗА ЯНИНОЙ",
      draw: "РАВНЫЙ БОЙ",
      energy: "СИЯНИЕ"
    }
  };

  const dom = {
    start: section.querySelector("[data-fight-start]"),
    close: overlay.querySelector("[data-fight-close]"),
    mute: overlay.querySelector("[data-fight-mute]"),
    loading: overlay.querySelector("#fightLoading"),
    result: overlay.querySelector("#fightResult"),
    resultTitle: overlay.querySelector("#fightResultTitle"),
    resultText: overlay.querySelector("#fightResultText"),
    replay: overlay.querySelector("[data-fight-replay]"),
    resultClose: overlay.querySelector("[data-fight-result-close]"),
    special: overlay.querySelector('[data-control="special"]')
  };

  // The character sheets are embedded as data URLs so the fight also works
  // when index.html is opened directly through file:// without a web server.
  const FIGHTER_TEXTURES = Array.isArray(window.AURORA_FIGHTER_ASSETS)
    ? window.AURORA_FIGHTER_ASSETS
    : [];

  const inputState = {
    left: false,
    right: false,
    up: false,
    down: false,
    block: false
  };

  let game = null;
  let sceneRef = null;
  let isOpen = false;
  let isMuted = false;
  let audioContext = null;

  function language() {
    return document.documentElement.lang === "en" ? "en" : "ru";
  }

  function t(key) {
    return COPY[language()][key] || COPY.en[key] || key;
  }

  function applyCopy() {
    document.querySelectorAll("[data-fight-copy]").forEach((element) => {
      const key = element.dataset.fightCopy;
      if (COPY[language()][key]) element.textContent = COPY[language()][key];
    });
    document.querySelectorAll("[data-fight-aria]").forEach((element) => {
      const key = element.dataset.fightAria;
      if (COPY[language()][key]) element.setAttribute("aria-label", COPY[language()][key]);
    });
    dom.mute.textContent = isMuted ? "♪" : "♫";
    dom.mute.setAttribute("aria-label", isMuted ? t("unmute") : t("mute"));
    if (sceneRef) sceneRef.refreshCopy();
  }

  function unlockAudio() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioContext = new AudioContextClass();
    }
    if (audioContext?.state === "suspended") audioContext.resume().catch(() => {});
  }

  function tone(frequency, duration = 0.08, type = "sine", volume = 0.05, delay = 0) {
    if (isMuted || !audioContext) return;
    const start = audioContext.currentTime + delay;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function hitSound(blocked, special) {
    if (special) {
      tone(220, 0.18, "sawtooth", 0.055);
      tone(440, 0.22, "sine", 0.04, 0.06);
      tone(680, 0.28, "sine", 0.025, 0.11);
    } else if (blocked) {
      tone(180, 0.07, "square", 0.035);
    } else {
      tone(105, 0.09, "square", 0.045);
      tone(220, 0.06, "triangle", 0.03, 0.02);
    }
  }

  function clearInputs() {
    Object.keys(inputState).forEach((key) => { inputState[key] = false; });
    overlay.querySelectorAll(".fight-control").forEach((button) => button.classList.remove("is-pressed"));
  }

  function isPortrait() {
    return window.matchMedia("(orientation: portrait) and (max-width: 900px)").matches;
  }

  function refreshOrientation() {
    if (!sceneRef || !isOpen) return;
    sceneRef.setOrientationBlocked(isPortrait());
  }

  async function enterFullscreenAndLandscape() {
    try {
      if (overlay.requestFullscreen && !document.fullscreenElement) await overlay.requestFullscreen();
    } catch (_error) {
      // The fixed overlay still provides a full-screen-like experience.
    }
    try {
      if (screen.orientation?.lock) await screen.orientation.lock("landscape");
    } catch (_error) {
      // The rotate overlay is the reliable fallback on browsers that deny locking.
    }
  }

  async function openGame() {
    isOpen = true;
    overlay.hidden = false;
    document.body.classList.add("fight-open");
    clearInputs();
    unlockAudio();
    applyCopy();
    void enterFullscreenAndLandscape();

    if (!game) createGame();
    else {
      sceneRef?.resumeExperience();
      refreshOrientation();
    }
  }

  async function closeGame() {
    isOpen = false;
    clearInputs();
    sceneRef?.pauseExperience();
    overlay.hidden = true;
    document.body.classList.remove("fight-open");
    try {
      if (screen.orientation?.unlock) screen.orientation.unlock();
    } catch (_error) {}
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch (_error) {}
    dom.start.focus({ preventScroll: true });
  }

  function bindHoldButton(button) {
    const control = button.dataset.control;
    const release = (event) => {
      if (event) event.preventDefault();
      if (control in inputState) inputState[control] = false;
      button.classList.remove("is-pressed");
    };

    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture?.(event.pointerId);
      button.classList.add("is-pressed");
      unlockAudio();
      if (control in inputState) inputState[control] = true;
      if (["punch", "kick", "special"].includes(control)) sceneRef?.command(control);
      if (control === "up") sceneRef?.command("jump");
    });
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", release);
    button.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  overlay.querySelectorAll("[data-control]").forEach(bindHoldButton);
  dom.start.addEventListener("click", openGame);
  dom.close.addEventListener("click", closeGame);
  dom.resultClose.addEventListener("click", closeGame);
  dom.replay.addEventListener("click", () => {
    dom.result.hidden = true;
    unlockAudio();
    sceneRef?.resetMatch();
  });
  dom.mute.addEventListener("click", () => {
    isMuted = !isMuted;
    applyCopy();
  });

  window.addEventListener("blur", clearInputs);
  window.addEventListener("resize", refreshOrientation);
  window.addEventListener("orientationchange", () => window.setTimeout(refreshOrientation, 120));
  document.addEventListener("visibilitychange", () => {
    if (!sceneRef || !isOpen) return;
    if (document.hidden) sceneRef.pauseExperience();
    else sceneRef.resumeExperience();
  });

  new MutationObserver(applyCopy).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  applyCopy();

  function createGame() {
    if (!window.Phaser) {
      dom.loading.textContent = "The game library could not load.";
      return;
    }

    game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: "fight-game-canvas",
      width: 960,
      height: 540,
      backgroundColor: "#03101a",
      transparent: false,
      antialias: true,
      render: { pixelArt: false, roundPixels: false, powerPreference: "high-performance" },
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 960, height: 540 },
      input: { activePointers: 5, touch: { capture: true } },
      scene: [FightScene],
      audio: { noAudio: true }
    });
  }

  class FightScene extends Phaser.Scene {
    constructor() {
      super("AuroraFight");
      this.groundY = 510;
      this.orientationBlocked = false;
      this.experiencePaused = false;
      this.roundActive = false;
      this.roundNumber = 1;
      this.roundSeconds = 29;
      this.playerWins = 0;
      this.aiWins = 0;
      this.aiThinkAt = 0;
      this.lastSecond = 29;
      this.pendingRound = null;
      this.fighterLoadFailed = false;
    }

    preload() {
      if (FIGHTER_TEXTURES.length !== 2) {
        this.fighterLoadFailed = true;
        return;
      }
      this.load.on("loaderror", () => {
        this.fighterLoadFailed = true;
      });
      FIGHTER_TEXTURES.forEach((asset) => {
        this.load.spritesheet(asset.key, asset.src, {
          frameWidth: asset.frameWidth,
          frameHeight: asset.frameHeight
        });
      });
    }

    create() {
      sceneRef = this;
      if (this.fighterLoadFailed || FIGHTER_TEXTURES.some((asset) => !this.textures.exists(asset.key))) {
        dom.loading.textContent = language() === "ru"
          ? "Не удалось подготовить бойцов. Обнови страницу и попробуй снова."
          : "The fighters could not be prepared. Refresh the page and try again.";
        return;
      }
      this.createArena();
      this.createFighters();
      this.createHud();
      this.createKeyboard();
      dom.loading.hidden = true;
      this.refreshCopy();
      this.resetMatch();
      refreshOrientation();
    }

    createArena() {
      const texture = this.textures.createCanvas("white-sea-arena", 960, 540);
      const ctx = texture.context;
      const sky = ctx.createLinearGradient(0, 0, 0, 540);
      sky.addColorStop(0, "#020a1a");
      sky.addColorStop(0.55, "#073558");
      sky.addColorStop(1, "#b7dddf");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 960, 540);

      let seed = 29;
      const random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
      ctx.fillStyle = "rgba(255,255,235,.78)";
      for (let i = 0; i < 88; i += 1) {
        const radius = random() * 1.5 + 0.25;
        ctx.beginPath();
        ctx.arc(random() * 960, random() * 260, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.filter = "blur(13px)";
      [
        ["rgba(76,255,183,.34)", 78, 0],
        ["rgba(68,205,255,.22)", 120, 70],
        ["rgba(157,113,255,.18)", 54, 120]
      ].forEach(([color, y, offset]) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 30;
        ctx.beginPath();
        ctx.moveTo(-80, y + offset * 0.12);
        ctx.bezierCurveTo(170, y + 130, 310, y - 80, 520, y + 55);
        ctx.bezierCurveTo(700, y + 160, 800, y - 50, 1040, y + 50);
        ctx.stroke();
      });
      ctx.restore();

      ctx.fillStyle = "#09233a";
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.lineTo(0, 278);
      for (let x = 0; x <= 960; x += 48) {
        ctx.lineTo(x, 300 - Math.sin(x * 0.017) * 38 - random() * 35);
      }
      ctx.lineTo(960, 340);
      ctx.closePath();
      ctx.fill();

      const ice = ctx.createLinearGradient(0, 310, 0, 540);
      ice.addColorStop(0, "#4d839b");
      ice.addColorStop(0.45, "#a8cbd1");
      ice.addColorStop(1, "#25495b");
      ctx.fillStyle = ice;
      ctx.fillRect(0, 320, 960, 220);
      ctx.strokeStyle = "rgba(225,250,255,.35)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 26; i += 1) {
        const x = random() * 960;
        const y = 345 + random() * 190;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 35 + random() * 120, y + random() * 10 - 5);
        ctx.stroke();
      }
      texture.refresh();

      this.add.image(480, 270, "white-sea-arena").setDepth(0);
      this.auroraVeil = this.add.rectangle(480, 170, 1100, 190, 0x4dffc0, 0.035).setBlendMode(Phaser.BlendModes.ADD).setDepth(1);
      this.tweens.add({ targets: this.auroraVeil, alpha: { from: 0.02, to: 0.09 }, x: { from: 440, to: 520 }, duration: 4300, yoyo: true, repeat: -1, ease: "Sine.InOut" });

      const snowTexture = this.textures.createCanvas("snow-dot", 8, 8);
      const snowCtx = snowTexture.context;
      snowCtx.fillStyle = "rgba(255,255,255,.9)";
      snowCtx.beginPath();
      snowCtx.arc(4, 4, 2.1, 0, Math.PI * 2);
      snowCtx.fill();
      snowTexture.refresh();
      this.add.particles(0, -10, "snow-dot", {
        x: { min: 0, max: 960 },
        speedX: { min: -15, max: 12 },
        speedY: { min: 18, max: 42 },
        lifespan: { min: 8500, max: 13500 },
        frequency: 170,
        quantity: 1,
        scale: { start: 0.18, end: 0.7 },
        alpha: { start: 0.55, end: 0 },
        blendMode: "ADD"
      }).setDepth(8);

      this.add.ellipse(480, 510, 720, 36, 0x06131b, 0.34).setDepth(2);
    }

    createFighters() {
      this.player = this.makeFighter({
        name: "ELENA",
        texture: "elena-fighter",
        x: 300,
        scale: 0.57,
        speed: 225,
        reach: 118,
        kickReach: 178,
        color: 0x73f2c1,
        isPlayer: true
      });
      this.ai = this.makeFighter({
        name: "YANINA",
        texture: "yanina-fighter",
        x: 660,
        scale: 0.68,
        speed: 205,
        reach: 108,
        kickReach: 165,
        color: 0xd4b0ff,
        isPlayer: false
      });
      this.ai.sprite.setFlipX(true);
    }

    makeFighter(config) {
      const sprite = this.add.sprite(config.x, this.groundY, config.texture, 0)
        .setOrigin(0.5, 1)
        .setScale(config.scale)
        .setDepth(6);
      return {
        ...config,
        sprite,
        health: 100,
        energy: 0,
        state: "idle",
        busyUntil: 0,
        velocityY: 0,
        jumpOffset: 0,
        blocking: false,
        crouching: false,
        lastAttackAt: -1000,
        combo: 0
      };
    }

    createHud() {
      this.hud = this.add.graphics().setDepth(20);
      this.elenaName = this.add.text(35, 18, "ELENA", { fontFamily: "Georgia, serif", fontSize: "20px", color: "#fff2c5", fontStyle: "bold" }).setDepth(21);
      this.yaninaName = this.add.text(925, 18, "YANINA", { fontFamily: "Georgia, serif", fontSize: "20px", color: "#fff2c5", fontStyle: "bold" }).setOrigin(1, 0).setDepth(21);
      this.timerText = this.add.text(480, 13, "29", { fontFamily: "Georgia, serif", fontSize: "42px", color: "#fff1b4", stroke: "#143931", strokeThickness: 5 }).setOrigin(0.5, 0).setDepth(21);
      this.roundText = this.add.text(480, 183, "", { fontFamily: "Georgia, serif", fontSize: "52px", color: "#fff2c0", stroke: "#07131c", strokeThickness: 9, align: "center" }).setOrigin(0.5).setDepth(25);
      this.statusText = this.add.text(480, 85, "", { fontFamily: "system-ui, sans-serif", fontSize: "13px", color: "#9fffdc", fontStyle: "bold", letterSpacing: 2 }).setOrigin(0.5).setDepth(21);
    }

    createKeyboard() {
      this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        up: Phaser.Input.Keyboard.KeyCodes.UP,
        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
        punch: Phaser.Input.Keyboard.KeyCodes.J,
        kick: Phaser.Input.Keyboard.KeyCodes.K,
        block: Phaser.Input.Keyboard.KeyCodes.L,
        special: Phaser.Input.Keyboard.KeyCodes.SPACE
      });
    }

    refreshCopy() {
      if (!this.roundText) return;
      this.statusText?.setText(`${t("round")} ${this.roundNumber}  ·  ${t("energy")}`);
    }

    resetMatch() {
      this.playerWins = 0;
      this.aiWins = 0;
      this.roundNumber = 1;
      this.pendingRound?.remove(false);
      dom.result.hidden = true;
      this.startRound();
    }

    startRound() {
      this.roundActive = false;
      this.roundSeconds = 29;
      this.lastSecond = 29;
      this.resetFighter(this.player, 300);
      this.resetFighter(this.ai, 660);
      this.ai.sprite.setFlipX(true);
      this.timerText.setText("29");
      this.statusText.setText(`${t("round")} ${this.roundNumber}  ·  ${t("energy")}`);
      this.roundText.setAlpha(1).setScale(1).setText(`${t("round")} ${this.roundNumber}`);
      tone(330, 0.09, "sine", 0.03);
      this.time.delayedCall(720, () => {
        this.roundText.setText(t("ready"));
        tone(440, 0.1, "sine", 0.03);
      });
      this.time.delayedCall(1450, () => {
        this.roundText.setText(t("fight"));
        tone(660, 0.13, "triangle", 0.045);
        this.roundActive = true;
        this.tweens.add({ targets: this.roundText, alpha: 0, scale: 1.24, duration: 560, ease: "Quad.Out" });
      });
    }

    resetFighter(fighter, x) {
      fighter.x = x;
      fighter.health = 100;
      fighter.energy = 0;
      fighter.state = "idle";
      fighter.busyUntil = 0;
      fighter.velocityY = 0;
      fighter.jumpOffset = 0;
      fighter.blocking = false;
      fighter.crouching = false;
      fighter.sprite.setFrame(0).setAlpha(1).setTint(0xffffff).setScale(fighter.scale).setPosition(x, this.groundY);
    }

    command(action) {
      if (!this.roundActive || this.orientationBlocked || this.experiencePaused) return;
      if (action === "jump") this.jump(this.player);
      else if (action === "special") this.attack(this.player, this.ai, "special");
      else if (action === "punch" || action === "kick") this.attack(this.player, this.ai, action);
    }

    jump(fighter) {
      if (fighter.jumpOffset === 0 && this.time.now >= fighter.busyUntil) {
        fighter.velocityY = 690;
        fighter.state = "jump";
        tone(260, 0.07, "sine", 0.02);
      }
    }

    attack(attacker, defender, kind) {
      const now = this.time.now;
      if (!this.roundActive || now < attacker.busyUntil || attacker.jumpOffset > 12 || attacker.health <= 0) return;
      const specs = {
        punch: { frame: 1, damage: 8, reach: attacker.reach, windup: 105, recovery: 390, energy: 14, knockback: 18 },
        kick: { frame: 2, damage: 14, reach: attacker.kickReach, windup: 190, recovery: 670, energy: 19, knockback: 34 },
        special: { frame: 2, damage: 22, reach: 255, windup: 270, recovery: 870, energy: 0, knockback: 62 }
      };
      const spec = specs[kind];
      if (kind === "special" && attacker.energy < 100) return;
      if (kind === "special") attacker.energy = 0;
      attacker.state = kind;
      attacker.blocking = false;
      attacker.busyUntil = now + spec.recovery;
      attacker.lastAttackAt = now;
      attacker.sprite.setFrame(spec.frame);
      tone(kind === "punch" ? 170 : kind === "kick" ? 135 : 260, 0.06, "triangle", 0.018);

      if (kind === "special") this.specialFlash(attacker);
      this.time.delayedCall(spec.windup, () => {
        if (!this.roundActive || attacker.health <= 0 || attacker.state !== kind) return;
        this.resolveHit(attacker, defender, kind, spec);
      });
      this.time.delayedCall(spec.recovery, () => {
        if (attacker.health > 0 && !["hit", "win"].includes(attacker.state)) {
          attacker.state = "idle";
          attacker.sprite.setFrame(0);
        }
      });
    }

    resolveHit(attacker, defender, kind, spec) {
      const distance = Math.abs(attacker.x - defender.x);
      const verticalGap = Math.abs(attacker.jumpOffset - defender.jumpOffset);
      if (distance > spec.reach || verticalGap > 105) {
        attacker.combo = 0;
        return;
      }

      const blocked = defender.blocking;
      const damage = blocked ? Math.max(2, Math.round(spec.damage * 0.22)) : spec.damage;
      defender.health = Math.max(0, defender.health - damage);
      attacker.energy = Math.min(100, attacker.energy + (blocked ? Math.round(spec.energy * 0.45) : spec.energy));
      defender.energy = Math.min(100, defender.energy + Math.round(damage * 1.5));
      attacker.combo = this.time.now - attacker.lastAttackAt < 760 ? attacker.combo + 1 : 1;

      const direction = attacker.x < defender.x ? 1 : -1;
      defender.x = Phaser.Math.Clamp(defender.x + direction * (blocked ? spec.knockback * 0.38 : spec.knockback), 95, 865);
      if (!blocked) {
        defender.state = "hit";
        defender.blocking = false;
        defender.busyUntil = this.time.now + (kind === "special" ? 610 : 390);
        defender.sprite.setFrame(4);
        this.time.delayedCall(kind === "special" ? 610 : 390, () => {
          if (defender.health > 0 && defender.state === "hit") {
            defender.state = "idle";
            defender.sprite.setFrame(0);
          }
        });
      } else {
        defender.sprite.setFrame(3);
      }

      hitSound(blocked, kind === "special");
      if (navigator.vibrate) navigator.vibrate(kind === "special" ? [24, 18, 32] : blocked ? 10 : 22);
      this.hitSpark((attacker.x + defender.x) * 0.5, this.groundY - 215 + defender.jumpOffset * -1, blocked, kind === "special");
      this.cameras.main.shake(kind === "special" ? 150 : 75, kind === "special" ? 0.009 : 0.004);
      if (defender.health <= 0) this.finishRound(attacker, t("ko"));
    }

    specialFlash(attacker) {
      const flash = this.add.rectangle(480, 270, 960, 540, attacker.color, 0.06).setBlendMode(Phaser.BlendModes.ADD).setDepth(18);
      this.tweens.add({ targets: flash, alpha: 0, duration: 520, onComplete: () => flash.destroy() });
      for (let i = 0; i < 18; i += 1) {
        const spark = this.add.circle(attacker.x, this.groundY - 190, Phaser.Math.Between(2, 6), Phaser.Display.Color.RandomRGB(110, 255).color, 0.8).setDepth(19);
        this.tweens.add({ targets: spark, x: attacker.x + Phaser.Math.Between(-130, 130), y: this.groundY - 190 + Phaser.Math.Between(-150, 110), alpha: 0, scale: 0.2, duration: Phaser.Math.Between(380, 650), onComplete: () => spark.destroy() });
      }
    }

    hitSpark(x, y, blocked, special) {
      const color = special ? 0x77ffd0 : blocked ? 0xd8efff : 0xffe2a1;
      const ring = this.add.circle(x, y, 8, color, 0.9).setStrokeStyle(3, 0xffffff, 0.8).setDepth(22);
      this.tweens.add({ targets: ring, scale: special ? 6.5 : 3.2, alpha: 0, duration: special ? 380 : 210, ease: "Quad.Out", onComplete: () => ring.destroy() });
      for (let i = 0; i < (special ? 15 : 8); i += 1) {
        const particle = this.add.circle(x, y, Phaser.Math.Between(2, 4), color, 0.9).setDepth(22);
        const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const distance = Phaser.Math.Between(28, special ? 105 : 65);
        this.tweens.add({ targets: particle, x: x + Math.cos(angle) * distance, y: y + Math.sin(angle) * distance, alpha: 0, duration: Phaser.Math.Between(180, 390), onComplete: () => particle.destroy() });
      }
    }

    setBlock(fighter, active) {
      const canBlock = this.time.now >= fighter.busyUntil && fighter.jumpOffset < 8 && fighter.health > 0;
      fighter.blocking = active && canBlock;
      if (fighter.blocking) {
        fighter.state = "block";
        fighter.sprite.setFrame(3);
      } else if (fighter.state === "block") {
        fighter.state = "idle";
        fighter.sprite.setFrame(0);
      }
    }

    updatePlayer(delta) {
      const player = this.player;
      const now = this.time.now;
      const keyboardBlock = this.keys.block.isDown;
      this.setBlock(player, inputState.block || keyboardBlock);
      if (Phaser.Input.Keyboard.JustDown(this.keys.punch)) this.command("punch");
      if (Phaser.Input.Keyboard.JustDown(this.keys.kick)) this.command("kick");
      if (Phaser.Input.Keyboard.JustDown(this.keys.special)) this.command("special");
      if (Phaser.Input.Keyboard.JustDown(this.keys.up)) this.command("jump");

      const left = inputState.left || this.keys.left.isDown;
      const right = inputState.right || this.keys.right.isDown;
      const down = inputState.down || this.keys.down.isDown;
      player.crouching = down && player.jumpOffset === 0 && now >= player.busyUntil;
      if (player.crouching) player.sprite.setScale(player.scale, player.scale * 0.88);
      else player.sprite.setScale(player.scale);

      if (now >= player.busyUntil && !player.blocking && !player.crouching) {
        const direction = (right ? 1 : 0) - (left ? 1 : 0);
        if (direction !== 0) {
          const nextX = player.x + direction * player.speed * (delta / 1000);
          const maxX = this.ai.x - 104;
          player.x = Phaser.Math.Clamp(nextX, 92, maxX);
        }
      }
    }

    updateAI(delta) {
      const ai = this.ai;
      const player = this.player;
      const now = this.time.now;
      if (now < ai.busyUntil || ai.health <= 0) return;
      const distance = Math.abs(ai.x - player.x);
      const level = Math.min(0.9, 0.58 + this.playerWins * 0.09 + (this.roundNumber - 1) * 0.045);

      if (now >= this.aiThinkAt) {
        this.aiThinkAt = now + Phaser.Math.Between(135, 270);
        ai.blocking = false;

        const playerThreat = ["punch", "kick", "special"].includes(player.state) && distance < 215;
        if (playerThreat && Math.random() < level * 0.62) {
          this.setBlock(ai, true);
          ai.busyUntil = now + Phaser.Math.Between(220, 430);
          this.time.delayedCall(ai.busyUntil - now, () => this.setBlock(ai, false));
          return;
        }

        if (distance > 205) ai.intent = "approach";
        else if (distance < 92 && Math.random() < 0.28) ai.intent = "retreat";
        else if (ai.energy >= 100 && distance < 245 && Math.random() < 0.62) ai.intent = "special";
        else if (distance < 132 && Math.random() < 0.54 + level * 0.2) ai.intent = Math.random() < 0.56 ? "punch" : "kick";
        else if (distance < 190 && Math.random() < 0.42) ai.intent = "kick";
        else ai.intent = Math.random() < 0.58 ? "feint" : "approach";
      }

      if (ai.intent === "approach") {
        const nextX = ai.x - ai.speed * (0.82 + level * 0.2) * (delta / 1000);
        ai.x = Math.max(player.x + 104, nextX);
      } else if (ai.intent === "retreat") {
        ai.x = Math.min(868, ai.x + ai.speed * 0.72 * (delta / 1000));
      } else if (ai.intent === "punch" || ai.intent === "kick" || ai.intent === "special") {
        const chosen = ai.intent;
        ai.intent = "feint";
        this.attack(ai, player, chosen);
        if (chosen === "punch" && distance < 125 && Math.random() < level * 0.52) {
          this.time.delayedCall(440, () => this.attack(ai, player, Math.random() < 0.55 ? "punch" : "kick"));
        }
      }
    }

    updateJump(fighter, delta) {
      if (fighter.jumpOffset <= 0 && fighter.velocityY <= 0) {
        fighter.jumpOffset = 0;
        return;
      }
      fighter.jumpOffset += fighter.velocityY * (delta / 1000);
      fighter.velocityY -= 1820 * (delta / 1000);
      if (fighter.jumpOffset <= 0) {
        fighter.jumpOffset = 0;
        fighter.velocityY = 0;
        if (fighter.state === "jump") fighter.state = "idle";
      }
    }

    finishRound(winner, banner) {
      if (!this.roundActive) return;
      this.roundActive = false;
      clearInputs();
      const loser = winner === this.player ? this.ai : this.player;
      winner.state = "win";
      winner.sprite.setFrame(5);
      loser.state = "hit";
      loser.sprite.setFrame(4);
      if (winner === this.player) this.playerWins += 1;
      else this.aiWins += 1;
      this.roundText.setText(banner).setScale(0.82).setAlpha(0);
      this.tweens.add({ targets: this.roundText, alpha: 1, scale: 1, duration: 360, ease: "Back.Out" });
      tone(winner === this.player ? 660 : 260, 0.17, "triangle", 0.045);
      tone(winner === this.player ? 880 : 190, 0.22, "sine", 0.035, 0.12);

      const matchFinished = this.playerWins >= 2 || this.aiWins >= 2;
      this.pendingRound = this.time.delayedCall(1850, () => {
        if (matchFinished) this.showResult(this.playerWins > this.aiWins);
        else {
          this.roundNumber += 1;
          this.startRound();
        }
      });
    }

    showResult(playerWon) {
      dom.resultTitle.textContent = playerWon ? t("winTitle") : t("loseTitle");
      dom.resultText.textContent = playerWon ? t("winText") : t("loseText");
      dom.result.hidden = false;
      dom.replay.focus({ preventScroll: true });
    }

    setOrientationBlocked(blocked) {
      this.orientationBlocked = blocked;
      if (blocked) this.scene.pause();
      else if (!this.experiencePaused && this.scene.isPaused()) this.scene.resume();
    }

    pauseExperience() {
      this.experiencePaused = true;
      if (!this.scene.isPaused()) this.scene.pause();
    }

    resumeExperience() {
      this.experiencePaused = false;
      if (!this.orientationBlocked && this.scene.isPaused()) this.scene.resume();
    }

    drawHud() {
      const hud = this.hud;
      hud.clear();
      hud.fillStyle(0x020910, 0.72);
      hud.fillRoundedRect(24, 44, 360, 26, 13);
      hud.fillRoundedRect(576, 44, 360, 26, 13);
      hud.fillStyle(0x173a3b, 0.92);
      hud.fillRoundedRect(30, 50, 348, 14, 7);
      hud.fillRoundedRect(582, 50, 348, 14, 7);

      const pHealth = Math.max(0, this.player.health) / 100;
      const aHealth = Math.max(0, this.ai.health) / 100;
      hud.fillStyle(pHealth < 0.28 ? 0xff9b7b : 0x74f1bf, 1);
      hud.fillRoundedRect(30, 50, 348 * pHealth, 14, 7);
      hud.fillStyle(aHealth < 0.28 ? 0xff9b7b : 0xc79cff, 1);
      hud.fillRoundedRect(930 - 348 * aHealth, 50, 348 * aHealth, 14, 7);

      hud.fillStyle(0x050d15, 0.7);
      hud.fillRoundedRect(30, 74, 214, 7, 4);
      hud.fillRoundedRect(716, 74, 214, 7, 4);
      hud.fillStyle(0x80f8d0, 0.95);
      hud.fillRoundedRect(30, 74, 214 * (this.player.energy / 100), 7, 4);
      hud.fillStyle(0x9c91ff, 0.95);
      hud.fillRoundedRect(930 - 214 * (this.ai.energy / 100), 74, 214 * (this.ai.energy / 100), 7, 4);

      for (let i = 0; i < 2; i += 1) {
        hud.fillStyle(i < this.playerWins ? 0xffdc78 : 0x4b5c61, 1);
        hud.fillCircle(265 + i * 19, 78, 5);
        hud.fillStyle(i < this.aiWins ? 0xffdc78 : 0x4b5c61, 1);
        hud.fillCircle(695 - i * 19, 78, 5);
      }
      dom.special.classList.toggle("is-ready", this.player.energy >= 100);
    }

    update(_time, delta) {
      if (!this.player || this.orientationBlocked || this.experiencePaused) return;
      const safeDelta = Math.min(delta, 34);
      this.updateJump(this.player, safeDelta);
      this.updateJump(this.ai, safeDelta);

      if (this.roundActive) {
        this.updatePlayer(safeDelta);
        this.updateAI(safeDelta);
        this.roundSeconds = Math.max(0, this.roundSeconds - safeDelta / 1000);
        const displaySecond = Math.ceil(this.roundSeconds);
        if (displaySecond !== this.lastSecond) {
          this.lastSecond = displaySecond;
          this.timerText.setText(String(displaySecond).padStart(2, "0"));
          if (displaySecond <= 5 && displaySecond > 0) tone(510, 0.045, "square", 0.022);
        }
        if (this.roundSeconds <= 0) {
          if (this.player.health === this.ai.health) {
            const winner = this.player.energy >= this.ai.energy ? this.player : this.ai;
            this.finishRound(winner, t("draw"));
          } else {
            this.finishRound(this.player.health > this.ai.health ? this.player : this.ai, t("time"));
          }
        }
      }

      const bob = this.roundActive ? Math.sin(this.time.now * 0.006) * 2.3 : 0;
      this.player.sprite.setPosition(this.player.x, this.groundY - this.player.jumpOffset + bob);
      this.ai.sprite.setPosition(this.ai.x, this.groundY - this.ai.jumpOffset - bob * 0.8);
      this.player.sprite.setFlipX(this.player.x > this.ai.x);
      this.ai.sprite.setFlipX(this.ai.x > this.player.x);
      this.drawHud();
    }
  }
})();

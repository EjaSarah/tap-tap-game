const colors = [
  {
    name: "red",
    quotes: [
      "Hot like fire 🔥",
      "Red like pepper 🌶️",
      "Paint the town red 🎨",
      "You’re a redhead superstar ❤️‍🔥",
      "Scarlet spark — go bold ✨",
      "Heartbeat hustle ❤️",
      "Cherry pop! 🍒",
      "Razzle-dazzle red 🎆",
      "Dangerously delicious 🍎",
      "Blaze your trail 🔥",
    ],
  },
  {
    name: "blue",
    quotes: [
      "Cool as the ocean 🌊",
      "Sky's the limit ☁️",
      "Blue vibes only 💙",
      "Ocean breeze energy 🐬",
      "Chill and serene 🧊",
      "Blueberry pop 🫐",
      "Midnight calm 🌌",
      "Sail away 🚤",
      "True-blue friend 🤝",
      "Notes of blue 🎵",
    ],
  },
  {
    name: "green",
    quotes: [
      "Fresh like mint 🌿",
      "Green and growing 🌱",
      "Nature's hug 🌳",
      "Lucky clover 🍀",
      "Garden-party vibes 🌼",
      "Eco-friendly mood 🌍",
      "Emerald energy 💚",
      "Leafy calm 🍃",
      "Spring bloom 🌸",
      "Go green, feel great 🌾",
    ],
  },
  {
    name: "purple",
    quotes: [
      "Royal purple 👑",
      "Mystical magic 🔮",
      "Lavender dreams 💜",
      "Unicorn sparkle 🦄",
      "Grape delight 🍇",
      "Cosmic wonder 🌌",
      "Purple rain ✨",
      "Violet vibes 🎭",
      "Luxury mood 💎",
      "Creative purple burst 🎨",
    ],
  },
  {
    name: "orange",
    quotes: [
      "Zesty orange 🍊",
      "Sunset glow 🌅",
      "Pumpkin party 🎃",
      "Fruity fun 🍹",
      "Warm and toasty 🔥",
      "Autumn sparkle 🍂",
      "Citrus pop 🍋",
      "Foxy energy 🦊",
      "Bounce like a ball 🏀",
      "Golden playtime ✨",
    ],
  },
  {
    name: "pink",
    quotes: [
      "Bubblegum vibes 🍬",
      "Pink power 💕",
      "Rosy glow 🌹",
      "Sweet like candy 🍭",
      "Blush crush 🌸",
      "Pink sparkles ✨",
      "Cotton candy sky ☁️",
      "Peachy-pink smile 😊",
      "Dreamy pink mood 💭",
      "Think pink 💖",
    ],
  },
  {
    name: "yellow",
    quotes: [
      "Sunny vibes ☀️",
      "Golden glow ✨",
      "Lemon zest 🍋",
      "Bright like sunshine 🌞",
      "Yellow mellow 🌼",
      "Banana fun 🍌",
      "Spark of joy 🌟",
      "Golden bloom 🌻",
      "Happiness unlocked 😃",
      "Light up the room 💡",
    ],
  },
  {
    name: "teal",
    quotes: [
      "Tropical teal 🌴",
      "Ocean depths 🌊",
      "Chill teal vibes 🧊",
      "Exotic calm 🐠",
      "Seaside dream 🏝️",
      "Mystic teal ✨",
      "Cool breeze 💨",
      "Lagoon mood 🐚",
      "Blue-green harmony 🎶",
      "Teal-tastic energy 💎",
    ],
  },
  {
    name: "gold",
    quotes: [
      "Golden treasure 🏆",
      "Shine bright like gold ✨",
      "Crown yourself 👑",
      "24-karat vibes 💛",
      "Sparkle season 🌟",
      "Golden hour glow 🌅",
      "Worth your weight in gold ⚖️",
      "Precious spark 💎",
      "Golden win 🥇",
      "Rich vibes 💰",
    ],
  },
  {
    name: "silver",
    quotes: [
      "Shimmer silver 🌙",
      "Moonlit magic 🌌",
      "Shiny vibes ✨",
      "Frosty sparkle ❄️",
      "Silver lining 🌤️",
      "Cool and chic 💎",
      "Starlight silver ⭐",
      "Elegant shine 💍",
      "Silver streak ⚡",
      "Mirror mood 🪞",
    ],
  },
];

// Chance to generate a random RGB "Mystery Blend" instead of a preset color
const surpriseChance = 0.18; // ~18% chance

// milestone messages for 10,20,...,100
const milestoneMessages = {
  10: "🎉 Woohoo! You hit 10 taps — keep it going!",
  20: "👏 Amazing! 20 taps already!",
  30: "🔥 30 taps — you're on fire!",
  40: "🌟 40 taps — superstar!",
  50: "💯 50 taps — halfway to 100!",
  60: "🚀 60 taps — flying high!",
  70: "⚡ 70 taps — unstoppable!",
  80: "🥳 80 taps — you rock!",
  90: "🏆 90 taps — almost there!",
  100: "🎊 100 taps — champion!",
};

// ---------- DOM Elements ----------
const tapArea = document.getElementById("tap-area");
const colorName = document.getElementById("color-name");
const colorQuote = document.getElementById("color-quote");
const tapCountDisplay = document.getElementById("tap-count");
const milestoneBox =
  document.getElementById("milestone") ||
  (() => {
    const el = document.createElement("div");
    el.id = "milestone";
    document.body.appendChild(el);
    return el;
  })();
const footer = document.getElementById("footer");
const tapSound = document.getElementById("tap-sound");
const toggleBtn = document.getElementById("toggle-mode");

// ---------- State ----------
let tapCount = 0;
let autoMode = false;
let autoInterval = null;
let usedQuotes = {}; // { colorName: [usedQuotes...] }
let lastQuote = null; // used to avoid immediate repeat

// ---------- Utility helpers ----------
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomRGB() {
  const r = randomInt(256);
  const g = randomInt(256);
  const b = randomInt(256);
  return `rgb(${r}, ${g}, ${b})`;
}

// pick a random preset color object, or a Mystery Blend
function getRandomColorObj() {
  if (Math.random() < surpriseChance) {
    // Mystery Blend with its own 10 fun quotes
    return {
      name: "Mystery Blend",
      quotes: [
        "Surprise mix! 🎲",
        "Unexpected magic ✨",
        "Blended beauty 🎨",
        "Mystery mood 🌈",
        "Secret sauce 🕵️‍♀️",
        "Hidden gem 💎",
        "Lucky blend 🍀",
        "Color twist 🔄",
        "Random joy 🎉",
        "Mystery unlocked 🔓",
      ],
      value: generateRandomRGB(),
    };
  }
  const chosen = colors[randomInt(colors.length)];
  // value is what we set as background (name can be a color word or hex)
  return { ...chosen, value: chosen.name };
}

// Ensure a quote for a specific color does not repeat until all 10 are used
function getUniqueQuote(colorName, quotesArray) {
  if (!usedQuotes[colorName]) usedQuotes[colorName] = [];

  // try to avoid immediate repeat of lastQuote as well
  let available = quotesArray.filter(
    (q) => !usedQuotes[colorName].includes(q) && q !== lastQuote
  );

  // if none available (because of lastQuote or all used), relax the lastQuote restriction
  if (available.length === 0) {
    available = quotesArray.filter((q) => !usedQuotes[colorName].includes(q));
  }

  // if still none available, we've used all quotes: reset and start fresh
  if (available.length === 0) {
    usedQuotes[colorName] = [];
    available = quotesArray.slice();
    // remove lastQuote only if there are multiple to choose from
    if (available.length > 1) {
      available = available.filter((q) => q !== lastQuote);
    }
  }

  const picked = available[randomInt(available.length)];
  usedQuotes[colorName].push(picked);
  lastQuote = picked;
  return picked;
}

// Show milestone message in the center using #milestone element (uses CSS animation)
function showMilestone(message) {
  // do nothing if there's no message or autoMode
  if (!message || autoMode) return;

  milestoneBox.textContent = message;
  milestoneBox.style.display = "block";
  // add a small reflow to re-trigger animation if needed
  void milestoneBox.offsetWidth;

  // hide after animation / display time
  setTimeout(() => {
    milestoneBox.style.display = "none";
  }, 2000); // matches CSS popFade timing
}

// update footer with dynamic date/time
function updateFooter() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = now.toLocaleDateString(undefined, options);
  const timeStr = now.toLocaleTimeString();
  if (footer) {
    footer.textContent = `© ${now.getFullYear()} | Designed with love 💓 from Nigeria by SarahDesigns | ${dateStr}, ${timeStr} | Want to build something awesome? email: ejesarah3@gmail.com`;
  }
}
setInterval(updateFooter, 1000);
updateFooter();

// ---------- Core update: color + quote ----------
/**
 * updateColorAndQuote({ isTap })
 * - isTap true => user tapped: increment count, play sound, milestone checks
 * - isTap false => automatic change (auto mode): no increment, no sound, no milestone
 */
function updateColorAndQuote({ isTap = false } = {}) {
  const colorObj = getRandomColorObj(); // { name, quotes, value }
  const quote = getUniqueQuote(colorObj.name, colorObj.quotes);

  // apply color (value is either the named color or rgb string)
  tapArea.style.backgroundColor = colorObj.value;
  colorName.textContent = colorObj.name;
  colorQuote.textContent = quote;

  // little dance animation for the quote
  colorQuote.classList.add("dance");
  setTimeout(() => colorQuote.classList.remove("dance"), 800);

  // only if this change was triggered by a user tap do we update tapCount, play sound, and show milestone
  if (isTap) {
    tapCount++;
    tapCountDisplay.textContent = `👆 ${tapCount}`;

    // play sound (wrap in catch to avoid console errors if autoplay blocked)
    if (tapSound) {
      tapSound.currentTime = 0;
      tapSound.play().catch(() => {});
    }

    // if we've hit a 10-multiple milestone (10..100), show appropriate cheer
    if (tapCount % 10 === 0 && tapCount <= 100) {
      const msg = milestoneMessages[tapCount];
      showMilestone(msg);
    }
  }
}

// ---------- Event listeners ----------
// Handle user taps on the tapArea (but ignore taps while autoMode is active)
tapArea.addEventListener("click", (e) => {
  // protect accidental clicks on the toggle button if it's inside the tap area
  if (e.target === toggleBtn) return;

  if (!autoMode) {
    updateColorAndQuote({ isTap: true });
  }
});

// Toggle Auto Mode button
toggleBtn.addEventListener("click", () => {
  autoMode = !autoMode;

  if (autoMode) {
    // Enter Auto Mode: change text, start interval that calls updateColorAndQuote WITHOUT isTap
    toggleBtn.textContent = "Switch to Tap Mode";
    // ensure we clear any previous interval
    if (autoInterval) clearInterval(autoInterval);

    // Immediately show one change and then continue
    updateColorAndQuote({ isTap: false });
    autoInterval = setInterval(() => {
      updateColorAndQuote({ isTap: false });
    }, 1500); // change every 1.5s
  } else {
    // Return to Tap Mode: stop interval and update button text
    toggleBtn.textContent = "Switch to Auto Mode";
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }
});

// ---------- Initialization (set initial values) ----------
tapCountDisplay.textContent = `👆 ${tapCount}`;
colorName.textContent = "Tap to start 🎨";
colorQuote.textContent = "Ready when you are...";

// If you want the page to start in auto mode on load, call toggleBtn.click() here
// toggleBtn.click(); // Uncomment to start in auto mode automatically

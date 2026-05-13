/* CUSTOMIZATION */

const birthdayDate = new Date("August 14, 2026 12:00:00 AM");
const secretPassword = "gunasri";
const birthdayName = "Sharanya 💖";

const openButtonText = "Open Surprise 💝";

/* ELEMENTS */

const introScreen = document.getElementById("introScreen");
const startIntroBtn = document.getElementById("startIntroBtn");

const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const openSurpriseBtn = document.getElementById("openSurpriseBtn");

const passwordBox = document.getElementById("passwordBox");
const secretInput = document.getElementById("secretInput");
const checkPasswordBtn = document.getElementById("checkPasswordBtn");
const passwordMessage = document.getElementById("passwordMessage");

const daysBox = document.getElementById("days");
const hoursBox = document.getElementById("hours");
const minutesBox = document.getElementById("minutes");
const secondsBox = document.getElementById("seconds");
const birthdayDateText = document.getElementById("birthdayDateText");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;
openSurpriseBtn.textContent = openButtonText;

/* INTRO */

startIntroBtn.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  createSparkles();
});

/* DATE WITH AM/PM */

birthdayDateText.textContent =
  "Unlock Date & Time: " +
  birthdayDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

/* COUNTDOWN */

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = birthdayDate.getTime() - now;

  if (distance <= 0) {
    clearInterval(countdownTimer);

    daysBox.textContent = "00";
    hoursBox.textContent = "00";
    minutesBox.textContent = "00";
    secondsBox.textContent = "00";

    document.querySelector(".unlock-text").textContent =
      "Countdown completed! Enter secret nickname 💝";

    passwordBox.classList.remove("hidden");
    createConfetti();
    return;
  }

  daysBox.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");

  hoursBox.textContent = String(
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");

  minutesBox.textContent = String(
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");

  secondsBox.textContent = String(
    Math.floor((distance % (1000 * 60)) / 1000)
  ).padStart(2, "0");
}

/* PASSWORD */

checkPasswordBtn.addEventListener("click", () => {
  const userValue = secretInput.value.trim().toLowerCase();

  if (userValue === secretPassword.toLowerCase()) {
    passwordMessage.textContent = "Correct! Surprise unlocked 🎉";
    openSurpriseBtn.classList.remove("hidden");
    createConfetti();
  } else {
    passwordMessage.textContent = "Wrong nickname. Try again 💕";
  }
});

/* STEPS */

const steps = document.querySelectorAll(".surprise-step");
const nextButtons = document.querySelectorAll(".next-btn");
let currentStep = 0;

openSurpriseBtn.addEventListener("click", () => {
  lockScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");

  steps.forEach(step => step.classList.remove("active"));
  currentStep = 0;
  steps[currentStep].classList.add("active");

  playMusic();
  revealName();
  startTyping();
  createConfetti();
});

nextButtons.forEach(button => {
  button.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep++;

    if (currentStep < steps.length) {
      steps[currentStep].classList.add("active");
      createConfetti();
      createSparkles();

      if (currentStep === steps.length - 1) {
        startFireworks();
      }
    }
  });
});

/* MUSIC */

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicBtn.innerHTML = "🔊 Play Music";
    musicPlaying = false;
  } else {
    playMusic();
  }
});

function playMusic() {
  bgMusic.play();
  musicPlaying = true;
  musicBtn.innerHTML = "🔈 Pause Music";
}

/* NAME REVEAL */

function revealName() {
  const nameBox = document.getElementById("nameReveal");
  nameBox.textContent = "";

  let i = 0;
  const nameInterval = setInterval(() => {
    nameBox.textContent += birthdayName.charAt(i);
    i++;

    if (i >= birthdayName.length) {
      clearInterval(nameInterval);
    }
  }, 180);
}

/* TYPING TEXT */

const typingWords = "You are special... You are loved... You are unforgettable... in My Life ❤️😍😘";
let typingIndex = 0;

function startTyping() {
  const typingText = document.getElementById("typingText");
  typingText.textContent = "";
  typingIndex = 0;

  function typeLetter() {
    if (typingIndex < typingWords.length) {
      typingText.textContent += typingWords.charAt(typingIndex);
      typingIndex++;
      setTimeout(typeLetter, 80);
    }
  }

  typeLetter();
}

/* QUESTIONS */

let answeredCount = 0;

function answerQuestion(button) {
  if (button.disabled) return;

  button.disabled = true;
  button.textContent = "Answered 💖";
  button.style.background = "#06d6a0";
  answeredCount++;

  if (answeredCount >= 2) {
    document.getElementById("questionMessage").textContent =
      "Aww! Your answers made this surprise sweeter 💕";
    document.getElementById("questionNext").classList.remove("hidden");
  }
}

/* LOVE METER */

const startMeterBtn = document.getElementById("startMeterBtn");
const meterFill = document.getElementById("meterFill");
const meterText = document.getElementById("meterText");
const meterNext = document.getElementById("meterNext");

startMeterBtn.addEventListener("click", () => {
  let value = 0;

  const meterInterval = setInterval(() => {
    value++;
    meterFill.style.width = value + "%";
    meterText.textContent = value + "%";

    if (value >= 100) {
      clearInterval(meterInterval);
      meterText.textContent = "100% Infinite Love 💖";
      meterNext.classList.remove("hidden");
      createConfetti();
    }
  }, 25);
});

/* CHAT */

const chatMessages = [
  "You: Happy Birthday My Love 😘💖",
  "Sharanya💘✨: Awww Thank you Pichi 😘",
  "You: You are the only one in whole world I Like you pichi 🥰✨",
  "Sharanya💘✨: I also Like you so much pichi 💞",
  "You: Eppudu Happy ga untu nanu Happy ga chusuko pichi 💖",
  "Sharanya💘✨: Okay chusukunta pichi 😍"
];

const chatBox = document.getElementById("chatBox");
const startChatBtn = document.getElementById("startChatBtn");
const chatNext = document.getElementById("chatNext");

startChatBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
  let index = 0;

  const chatInterval = setInterval(() => {
    const msg = document.createElement("div");
    msg.className = "chat-msg";
    msg.textContent = chatMessages[index];
    chatBox.appendChild(msg);

    index++;

    if (index >= chatMessages.length) {
      clearInterval(chatInterval);
      chatNext.classList.remove("hidden");
    }
  }, 900);
});

/* SLIDESHOW */

const slideImage = document.getElementById("slideImage");
const slideCaption = document.getElementById("slideCaption");

const slides = [
  { image: "images/photo18.jpeg", caption: "Every smile tells a beautiful story 💖" },
  { image: "images/photo14.jpeg", caption: "Some memories are forever special ✨" },
  { image: "images/photo13.jpeg", caption: "You make every moment brighter 🌸" },
  { image: "images/photo19.jpeg", caption: "Happiness looks beautiful on you 🥰" }
];

let slideIndex = 0;

function showSlide() {
  slideImage.src = slides[slideIndex].image;
  slideCaption.textContent = slides[slideIndex].caption;
}

showSlide();

setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide();
}, 2500);

/* GIFT */

const giftBox = document.getElementById("giftBox");
const giftContent = document.getElementById("giftContent");
const giftNext = document.getElementById("giftNext");

giftBox.addEventListener("click", () => {
  giftBox.classList.add("open");
  giftContent.classList.remove("hidden");
  giftNext.classList.remove("hidden");
  createConfetti();
});

/* ENVELOPE */

const envelope = document.getElementById("envelope");
const letterNext = document.getElementById("letterNext");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  letterNext.classList.remove("hidden");
  createSparkles();
});

/* BALLOONS */

let poppedBalloons = 0;

const balloonWishes = [
  "Wish 1: Always keep smiling pichi 💖",
  "Wish 2: May your dreams come true and Universe make it happen ✨",
  "Wish 3: You deserve endless happiness my Love 🌸",
  "Wish 4: Happy Birthday once again pichi 🎂"
];

function popBalloon(button) {
  if (button.disabled) return;

  button.textContent = "💥";
  button.disabled = true;

  document.getElementById("balloonWish").textContent =
    balloonWishes[poppedBalloons];

  poppedBalloons++;
  createConfetti();

  if (poppedBalloons >= 4) {
    document.getElementById("balloonNext").classList.remove("hidden");
  }
}

/* CAKE */

const cake = document.getElementById("cake");
const cutCakeBtn = document.getElementById("cutCakeBtn");
const cakeMessage = document.getElementById("cakeMessage");
const cakeNext = document.getElementById("cakeNext");

cutCakeBtn.addEventListener("click", () => {
  cake.classList.add("cut");
  cakeMessage.textContent = "Cake cut successfully! Make a wish 🎂✨";
  cakeNext.classList.remove("hidden");
  createConfetti();
});

/* DOWNLOAD CARD */

function downloadCard() {
  const text =
    "Happy Birthday 💖\n\nMay your life be filled with love, laughter, blessings, and unforgettable memories.\n\nKeep smiling always!";

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "birthday-card.txt";
  link.click();
}

/* REPLAY */

function replaySurprise() {
  steps[currentStep].classList.remove("active");
  currentStep = 0;
  steps[currentStep].classList.add("active");
  revealName();
  startTyping();
  createConfetti();
}

/* EFFECTS */

function createConfetti() {
  const container = document.getElementById("confettiContainer");

  for (let i = 0; i < 90; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-20px";
    confetti.style.backgroundColor = randomColor();
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

function createSparkles() {
  for (let i = 0; i < 35; i++) {
    const sparkle = document.createElement("div");
    sparkle.textContent = "✨";
    sparkle.className = "trail";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1200);
  }
}

function randomColor() {
  const colors = ["#ff006e", "#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#ffffff", "#ffafcc"];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* CURSOR HEART TRAIL */

document.addEventListener("mousemove", (e) => {
  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.className = "trail";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
});

/* FIREWORKS */

function startFireworks() {
  const fireworkInterval = setInterval(() => {
    createConfetti();
    createSparkles();
  }, 1200);

  setTimeout(() => clearInterval(fireworkInterval), 7000);
}

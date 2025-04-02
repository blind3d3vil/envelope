// The magic number 😉
const correctPasscode = 3000;

// Check if they got the number right
function checkPasscode() {
  let input = document.getElementById("passcode");
  let inputVal = input.value;
  let errorMsg = document.getElementById("error-msg");
  let errorContainer = document.querySelector(".error-container");
  let wrapper = document.querySelector(".wrapper");

  if (parseInt(inputVal) === correctPasscode) {
    wrapper.classList.add("show-envelope");
    // Reset error state
    errorMsg.classList.remove("show");
    errorContainer.classList.remove("show");
  } else {
    errorMsg.innerText = "Na Ah, Wrong number Azizam🚫";
    errorMsg.classList.add("show");
    errorContainer.classList.add("show");
    // Clear input field
    input.value = "";
    // Focus back on input for immediate retry
    input.focus();
  }
}

// Make the enter key work too
document.getElementById("passcode").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkPasscode();
  }
});

// No negative numbers allowed!
document.getElementById("passcode").addEventListener("input", function () {
  if (this.value < 0) {
    this.value = 0;
  }
});

// Only numbers please
document
  .getElementById("passcode")
  .addEventListener("keypress", function (event) {
    if (
      !/[\d]/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      !event.key.includes("Arrow")
    ) {
      event.preventDefault();
    }
  });

// Keep it clean on mobile too
document.getElementById("passcode").addEventListener("paste", function (event) {
  let pasteData = (event.clipboardData || window.clipboardData).getData("text");
  if (!/^\d*$/.test(pasteData)) {
    event.preventDefault();
  }
});

// Clear error when typing again
document.getElementById("passcode").addEventListener("input", function () {
  let errorMsg = document.getElementById("error-msg");
  let errorContainer = document.querySelector(".error-container");
  if (this.value) {
    // Only clear error if user is typing new number
    errorMsg.classList.remove("show");
    errorContainer.classList.remove("show");
  }
});

// The fun part - making the envelope work!
document.addEventListener("DOMContentLoaded", function () {
  if (typeof CONFIG === "undefined") {
    console.error("Config file missing");
    return;
  }

  function checkPasscode() {
    let input = document.getElementById("passcode");
    let inputVal = input.value;
    let errorMsg = document.getElementById("error-msg");
    let errorContainer = document.querySelector(".error-container");
    let wrapper = document.querySelector(".wrapper");

    if (parseInt(inputVal) === CONFIG.passcode) {
      wrapper.classList.add("show-envelope");
      errorMsg.classList.remove("show");
      errorContainer.classList.remove("show");
    } else {
      errorMsg.innerText = "Wrong number";
      errorMsg.classList.add("show");
      errorContainer.classList.add("show");
      input.value = "";
      input.focus();
    }
  }

  document
    .getElementById("passcode")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        checkPasscode();
      }
    });

  document.getElementById("passcode").addEventListener("input", function () {
    if (this.value < 0) {
      this.value = 0;
    }
  });

  document
    .getElementById("passcode")
    .addEventListener("keypress", function (event) {
      if (
        !/[\d]/.test(event.key) &&
        event.key !== "Backspace" &&
        event.key !== "Delete" &&
        !event.key.includes("Arrow")
      ) {
        event.preventDefault();
      }
    });

  document
    .getElementById("passcode")
    .addEventListener("paste", function (event) {
      let pasteData = (event.clipboardData || window.clipboardData).getData(
        "text"
      );
      if (!/^\d*$/.test(pasteData)) {
        event.preventDefault();
      }
    });

  document.getElementById("passcode").addEventListener("input", function () {
    let errorMsg = document.getElementById("error-msg");
    let errorContainer = document.querySelector(".error-container");
    if (this.value) {
      errorMsg.classList.remove("show");
      errorContainer.classList.remove("show");
    }
  });

  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const textContainer = document.querySelector(".text");
  let isAnimating = false;

  function loadLetterContent() {
    const content = CONFIG.letterContent;

    const title = document.createElement("h1");
    title.textContent = content.title;
    textContainer.appendChild(title);

    content.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      textContainer.appendChild(p);
    });

    const signature = document.createElement("p");
    signature.className = "signature";
    signature.textContent = content.signature;
    textContainer.appendChild(signature);
  }

  loadLetterContent();

  heart.addEventListener("click", () => {
    if (!isAnimating && !envelope.classList.contains("open")) {
      isAnimating = true;
      heart.style.opacity = "0";
      heart.style.visibility = "hidden";

      setTimeout(() => {
        envelope.classList.add("open");
      }, 50);

      setTimeout(() => {
        letter.style.visibility = "visible";
        letter.style.animation =
          "letterReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";

        letter.addEventListener(
          "animationend",
          () => {
            isAnimating = false;
          },
          { once: true }
        );
      }, 600);
    }
  });

  if (closeBtn) {
    closeBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!isAnimating) {
        isAnimating = true;
        letter.style.animation =
          "letterClose 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";

        letter.addEventListener(
          "animationend",
          function () {
            envelope.classList.remove("open");
            letter.style.visibility = "hidden";
            letter.style.animation = "";

            setTimeout(() => {
              heart.style.visibility = "visible";
              heart.style.opacity = "1";
              isAnimating = false;
            }, 600);
          },
          { once: true }
        );
      }
    };
  }

  letter.addEventListener("click", (e) => {
    if (e.target !== closeBtn) {
      e.stopPropagation();
    }
  });
});

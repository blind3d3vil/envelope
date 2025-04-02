// Make checkPasscode globally available
function checkPasscode() {
  if (typeof CONFIG === "undefined") {
    console.error("Config file missing");
    return;
  }

  let input = document.getElementById("passcode");
  let inputVal = input.value;
  let errorMsg = document.getElementById("error-msg");
  let errorContainer = document.querySelector(".error-container");
  let wrapper = document.querySelector(".wrapper");

  // Compare as strings to match config.js format
  if (inputVal === CONFIG.passcode) {
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

document.addEventListener("DOMContentLoaded", function () {
  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const textContainer = document.querySelector(".text");
  let isAnimating = false;

  // Passcode input handlers
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
    // Clear error when typing
    let errorMsg = document.getElementById("error-msg");
    let errorContainer = document.querySelector(".error-container");
    if (this.value) {
      errorMsg.classList.remove("show");
      errorContainer.classList.remove("show");
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

  // Load letter content
  function loadLetterContent() {
    if (typeof CONFIG === "undefined" || !CONFIG.letterContent) {
      textContainer.innerHTML =
        "<h1>Please enter the correct passcode to view this letter.</h1>";
      return;
    }

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

  // Handle envelope interactions
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

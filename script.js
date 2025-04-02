const correctPasscode = 3000;

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

// Add back the enter key functionality
document.getElementById("passcode").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkPasscode();
  }
});

// Prevent negative numbers
document.getElementById("passcode").addEventListener("input", function () {
  if (this.value < 0) {
    this.value = 0;
  }
});

// Allow only numbers
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

// For mobile devices - prevent paste of non-numeric values
document.getElementById("passcode").addEventListener("paste", function (event) {
  let pasteData = (event.clipboardData || window.clipboardData).getData("text");
  if (!/^\d*$/.test(pasteData)) {
    event.preventDefault();
  }
});

// Clear error when input changes
document.getElementById("passcode").addEventListener("input", function () {
  let errorMsg = document.getElementById("error-msg");
  let errorContainer = document.querySelector(".error-container");
  if (this.value) {
    // Only clear error if user is typing new number
    errorMsg.classList.remove("show");
    errorContainer.classList.remove("show");
  }
});

// Add envelope and letter functionality
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  let isAnimating = false;

  // Heart click opens the envelope
  heart.addEventListener("click", () => {
    if (!isAnimating && !envelope.classList.contains("open")) {
      isAnimating = true;
      heart.style.opacity = "0";
      heart.style.visibility = "hidden";

      // Small delay before opening envelope
      setTimeout(() => {
        envelope.classList.add("open");
      }, 50);

      // Wait for flap animation to complete before showing letter
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

  // Close button functionality
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

            // Show heart after envelope is closed
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

  // Prevent letter clicks from affecting envelope
  letter.addEventListener("click", (e) => {
    if (e.target !== closeBtn) {
      e.stopPropagation();
    }
  });
});

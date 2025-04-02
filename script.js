document.addEventListener("DOMContentLoaded", function () {
  const correctPasscode = 3000;
  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const passcodeInput = document.getElementById("passcode");
  let isAnimating = false;

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

  // Heart click opens the envelope
  if (heart) {
    heart.addEventListener("click", function () {
      if (!isAnimating && !envelope.classList.contains("open")) {
        isAnimating = true;
        heart.style.opacity = "0";
        heart.style.visibility = "hidden";

        // Small delay before opening envelope
        setTimeout(function () {
          envelope.classList.add("open");
        }, 50);

        // Wait for flap animation to complete before showing letter
        setTimeout(function () {
          letter.style.visibility = "visible";
          letter.style.animation =
            "letterReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";

          letter.addEventListener(
            "animationend",
            function () {
              isAnimating = false;
            },
            { once: true }
          );
        }, 600);
      }
    });
  }

  // Close button functionality
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
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
            setTimeout(function () {
              heart.style.visibility = "visible";
              heart.style.opacity = "1";
              isAnimating = false;
            }, 600);
          },
          { once: true }
        );
      }
    });
  }

  // Prevent letter clicks from affecting envelope
  if (letter) {
    letter.addEventListener("click", function (e) {
      if (e.target !== closeBtn) {
        e.stopPropagation();
      }
    });
  }

  // Passcode input handlers
  if (passcodeInput) {
    // Enter key functionality
    passcodeInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        checkPasscode();
      }
    });

    // Prevent negative numbers
    passcodeInput.addEventListener("input", function () {
      if (this.value < 0) {
        this.value = 0;
      }
    });

    // Allow only numbers
    passcodeInput.addEventListener("keypress", function (event) {
      if (
        !/[\d]/.test(event.key) &&
        event.key !== "Backspace" &&
        event.key !== "Delete" &&
        !event.key.includes("Arrow")
      ) {
        event.preventDefault();
      }
    });

    // Clear error when input changes
    passcodeInput.addEventListener("input", function () {
      let errorMsg = document.getElementById("error-msg");
      let errorContainer = document.querySelector(".error-container");
      if (this.value) {
        errorMsg.classList.remove("show");
        errorContainer.classList.remove("show");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const correctPasscode = 3000;
  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const passcodeInput = document.getElementById("passcode");
  const submitBtn = document.getElementById("submit-btn");
  let isAnimating = false;

  function checkPasscode() {
    let inputVal = passcodeInput.value;
    let errorMsg = document.getElementById("error-msg");
    let errorContainer = document.querySelector(".error-container");
    let wrapper = document.querySelector(".wrapper");

    if (parseInt(inputVal) === correctPasscode) {
      wrapper.classList.add("show-envelope");
      errorMsg.classList.remove("show");
      errorContainer.classList.remove("show");
    } else {
      errorMsg.innerText = "Na Ah, Wrong number Azizam🚫";
      errorMsg.classList.add("show");
      errorContainer.classList.add("show");
      passcodeInput.value = "";
      passcodeInput.focus();
    }
  }

  // Submit button click handler
  if (submitBtn) {
    submitBtn.addEventListener("click", checkPasscode);
    submitBtn.addEventListener("touchend", function (e) {
      e.preventDefault();
      checkPasscode();
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

    // Handle mobile keyboard "Go" button
    passcodeInput.addEventListener("keypress", function (event) {
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

  // Heart click/touch opens the envelope
  if (heart) {
    heart.addEventListener("click", function (e) {
      if (!isAnimating && !envelope.classList.contains("open")) {
        e.preventDefault();
        isAnimating = true;
        heart.style.opacity = "0";
        heart.style.visibility = "hidden";

        setTimeout(function () {
          envelope.classList.add("open");
        }, 50);

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

    heart.addEventListener("touchend", function (e) {
      e.preventDefault();
      if (!isAnimating && !envelope.classList.contains("open")) {
        isAnimating = true;
        heart.style.opacity = "0";
        heart.style.visibility = "hidden";

        setTimeout(function () {
          envelope.classList.add("open");
        }, 50);

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

    closeBtn.addEventListener("touchend", function (e) {
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

    letter.addEventListener(
      "touchmove",
      function (e) {
        e.stopPropagation();
      },
      { passive: true }
    );
  }
});

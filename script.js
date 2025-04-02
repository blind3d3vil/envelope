document.addEventListener("DOMContentLoaded", function () {
  const config = window.getConfig();
  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const passcodeInput = document.getElementById("passcode");
  const submitBtn = document.getElementById("submit-btn");
  let isAnimating = false;

  // Set up initial values from config
  passcodeInput.placeholder = config.passcode.placeholder;

  // Load letter content
  const letterContent = document.getElementById("letter-content");
  letterContent.innerHTML = `
    <h1>${config.letter.title}</h1>
    ${config.letter.paragraphs.map((p) => `<p>${p}</p>`).join("")}
    <p class="signature">${config.letter.signature.text}</p>
    <p class="signature">${config.letter.signature.name}</p>
  `;

  function checkPasscode() {
    let inputVal = passcodeInput.value;
    let errorMsg = document.getElementById("error-msg");
    let errorContainer = document.querySelector(".error-container");
    let wrapper = document.querySelector(".wrapper");

    if (parseInt(inputVal) === config.passcode.value) {
      wrapper.classList.add("show-envelope");
      errorMsg.classList.remove("show");
      errorContainer.classList.remove("show");
    } else {
      errorMsg.innerText = config.passcode.errorMessage;
      errorMsg.classList.add("show");
      errorContainer.classList.add("show");
      passcodeInput.value = "";
      passcodeInput.focus();
    }
  }

  // Submit button handlers
  if (submitBtn) {
    submitBtn.addEventListener("click", checkPasscode);
    submitBtn.addEventListener("touchend", function (e) {
      e.preventDefault();
      checkPasscode();
    });
  }

  // Passcode input handlers
  if (passcodeInput) {
    passcodeInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        checkPasscode();
      }
    });

    passcodeInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        checkPasscode();
      }
    });

    passcodeInput.addEventListener("input", function () {
      if (this.value < 0) {
        this.value = 0;
      }
      let errorMsg = document.getElementById("error-msg");
      let errorContainer = document.querySelector(".error-container");
      if (this.value) {
        errorMsg.classList.remove("show");
        errorContainer.classList.remove("show");
      }
    });

    passcodeInput.addEventListener("keypress", function (event) {
      if (
        !/[\d]/.test(event.key) &&
        !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
      }
    });
  }

  // Heart click/touch opens the envelope
  if (heart) {
    const handleHeartClick = function (e) {
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
    };

    heart.addEventListener("click", handleHeartClick);
    heart.addEventListener("touchend", function (e) {
      e.preventDefault();
      handleHeartClick(e);
    });
  }

  // Close button functionality
  if (closeBtn) {
    const handleClose = function (e) {
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
    };

    closeBtn.addEventListener("click", handleClose);
    closeBtn.addEventListener("touchend", handleClose);
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

document.addEventListener("DOMContentLoaded", () => {
  const config = window.getConfig();
  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const passcodeInput = document.getElementById("passcode");
  const submitBtn = document.getElementById("submit-btn");
  let isAnimating = false;

  // Hide the content from curious eyes
  const protect = (str) => btoa(encodeURIComponent(str));
  const unprotect = (str) => decodeURIComponent(atob(str));

  passcodeInput.placeholder = config.passcode.placeholder;

  const protectedContent = {
    title: protect(config.letter.title),
    paragraphs: config.letter.paragraphs.map((p) => protect(p)),
    signature: {
      text: protect(config.letter.signature.text),
      name: protect(config.letter.signature.name),
    },
  };

  function loadLetterContent() {
    const letterContent = document.getElementById("letter-content");
    letterContent.innerHTML = `
      <div class="protected-content" style="visibility: hidden">
        <h1>${unprotect(protectedContent.title)}</h1>
        ${protectedContent.paragraphs
          .map((p) => `<p>${unprotect(p)}</p>`)
          .join("")}
        <p class="signature">${unprotect(protectedContent.signature.text)}</p>
        <p class="signature">${unprotect(protectedContent.signature.name)}</p>
      </div>
    `;
  }

  function checkPasscode(e) {
    if (e) e.preventDefault();

    const inputVal = passcodeInput.value;
    const errorMsg = document.getElementById("error-msg");
    const errorContainer = document.querySelector(".error-container");
    const wrapper = document.querySelector(".wrapper");

    if (parseInt(inputVal) === config.passcode.value) {
      wrapper.classList.add("show-envelope");
      errorMsg.classList.remove("show");
      errorContainer.classList.remove("show");
      loadLetterContent();
    } else {
      errorMsg.innerText = config.passcode.errorMessage;
      errorMsg.classList.add("show");
      errorContainer.classList.add("show");
      passcodeInput.value = "";
      passcodeInput.focus();
    }
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", checkPasscode);
    submitBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      checkPasscode();
    });
  }

  if (passcodeInput) {
    // Handle Enter key press
    passcodeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        checkPasscode();
      }
    });

    // Handle input validation
    passcodeInput.addEventListener("input", function (e) {
      // Remove any non-numeric characters
      this.value = this.value.replace(/[^0-9]/g, "");

      // Prevent negative numbers
      if (this.value < 0) this.value = 0;

      // Clear error message when typing
      const errorMsg = document.getElementById("error-msg");
      const errorContainer = document.querySelector(".error-container");
      if (this.value) {
        errorMsg.classList.remove("show");
        errorContainer.classList.remove("show");
      }
    });
  }

  if (heart) {
    const handleHeartClick = (e) => {
      if (!isAnimating && !envelope.classList.contains("open")) {
        e.preventDefault();
        isAnimating = true;
        heart.style.opacity = "0";
        heart.style.visibility = "hidden";

        setTimeout(() => envelope.classList.add("open"), 50);

        setTimeout(() => {
          letter.style.visibility = "visible";
          letter.style.animation =
            "letterReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";

          const protectedContent = letter.querySelector(".protected-content");
          if (protectedContent) protectedContent.style.visibility = "visible";

          letter.addEventListener("animationend", () => (isAnimating = false), {
            once: true,
          });
        }, 600);
      }
    };

    heart.addEventListener("click", handleHeartClick);
    heart.addEventListener("touchend", (e) => {
      e.preventDefault();
      handleHeartClick(e);
    });
  }

  if (closeBtn) {
    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isAnimating) {
        isAnimating = true;
        letter.style.animation =
          "letterClose 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";

        const protectedContent = letter.querySelector(".protected-content");
        if (protectedContent) protectedContent.style.visibility = "hidden";

        letter.addEventListener(
          "animationend",
          () => {
            envelope.classList.remove("open");
            letter.style.visibility = "hidden";
            letter.style.animation = "";
            document.getElementById("letter-content").innerHTML = "";

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

    closeBtn.addEventListener("click", handleClose);
    closeBtn.addEventListener("touchend", handleClose);
  }

  if (letter) {
    letter.addEventListener("click", (e) => {
      if (e.target !== closeBtn) e.stopPropagation();
    });

    letter.addEventListener("touchmove", (e) => e.stopPropagation(), {
      passive: true,
    });
  }
});

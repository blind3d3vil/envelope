document.addEventListener("DOMContentLoaded", () => {
  // Ensure config exists and has default values if something goes wrong
  const getConfigSafely = () => {
    try {
      return (
        window.getConfig() || {
          passcode: {
            value: 3000,
            placeholder: "Enter number...",
            errorMessage: "Nope, try again! 💕",
          },
          letter: {
            title: "My Love,",
            paragraphs: ["..."],
            signature: { text: "Forever Yours,", name: "Your Name" },
          },
        }
      );
    } catch (e) {
      console.error("Config error:", e);
      return {
        passcode: {
          value: 3000,
          placeholder: "Enter number...",
          errorMessage: "Nope, try again! 💕",
        },
        letter: {
          title: "My Love,",
          paragraphs: ["..."],
          signature: { text: "Forever Yours,", name: "Your Name" },
        },
      };
    }
  };

  const config = getConfigSafely();
  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const passcodeInput = document.getElementById("passcode");
  const submitBtn = document.getElementById("submit-btn");
  let isAnimating = false;

  // Hide the content from curious eyes with more robust error handling
  const protect = (str) => {
    try {
      return btoa(encodeURIComponent(str || ""));
    } catch (e) {
      console.error("Protection error:", e);
      return btoa(encodeURIComponent(""));
    }
  };

  const unprotect = (str) => {
    try {
      return decodeURIComponent(atob(str || ""));
    } catch (e) {
      console.error("Unprotection error:", e);
      return "";
    }
  };

  if (passcodeInput) {
    passcodeInput.placeholder = config.passcode.placeholder;
  }

  const protectedContent = {
    title: protect(config.letter.title),
    paragraphs: (config.letter.paragraphs || []).map((p) => protect(p)),
    signature: {
      text: protect(config.letter.signature.text),
      name: protect(config.letter.signature.name),
    },
  };

  function loadLetterContent() {
    const letterContent = document.getElementById("letter-content");
    if (!letterContent) return;

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
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const inputVal = passcodeInput ? passcodeInput.value : "";
    const errorMsg = document.getElementById("error-msg");
    const errorContainer = document.querySelector(".error-container");
    const wrapper = document.querySelector(".wrapper");

    if (!inputVal || !config.passcode.value) return;

    if (parseInt(inputVal) === config.passcode.value) {
      if (wrapper) wrapper.classList.add("show-envelope");
      if (errorMsg) errorMsg.classList.remove("show");
      if (errorContainer) errorContainer.classList.remove("show");
      loadLetterContent();
    } else {
      if (errorMsg) {
        errorMsg.innerText = config.passcode.errorMessage;
        errorMsg.classList.add("show");
      }
      if (errorContainer) errorContainer.classList.add("show");
      if (passcodeInput) {
        passcodeInput.value = "";
        passcodeInput.focus();
      }
    }
  }

  if (submitBtn) {
    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      checkPasscode();
    };

    submitBtn.addEventListener("click", handleSubmit);
    submitBtn.addEventListener("touchend", handleSubmit);
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

      // Clear error message when typing
      const errorMsg = document.getElementById("error-msg");
      const errorContainer = document.querySelector(".error-container");
      if (this.value && errorMsg && errorContainer) {
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
            const letterContent = document.getElementById("letter-content");
            if (letterContent) letterContent.innerHTML = "";

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

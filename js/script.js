document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const getConfigSafely = () => {
      try {
        if (window.CONFIG) return window.CONFIG;
        if (typeof window.getConfig === "function") {
          const config = window.getConfig();
          if (config) return config;
        }
        return {
          passcode: {
            value: 0,
            placeholder: "Enter number...",
            errorMessage: "Try again!",
          },
          letter: {
            title: "My Love Letter",
            paragraphs: [
              "Dear love...",
              "You mean everything to me...",
              "Forever yours...",
            ],
            signature: {
              text: "With all my love,",
              name: "Your Secret Admirer",
            },
          },
        };
      } catch (e) {
        console.error("Error getting config:", e);
        return {
          passcode: {
            value: 0,
            placeholder: "Enter number...",
            errorMessage: "Try again!",
          },
          letter: {
            title: "",
            paragraphs: [""],
            signature: { text: "", name: "" },
          },
          ui: {
            title: "Enter Secret Code",
            submitButton: "Open Letter",
            closeButton: "×",
          },
        };
      }
    };

    const config = getConfigSafely();
    console.log("Config loaded:", config);

    const envelope = document.querySelector(".envelope");
    const heart = document.querySelector(".heart");
    const letter = document.querySelector(".letter");
    const closeBtn = document.querySelector(".close-btn");
    const passcodeInput = document.getElementById("passcode");
    const submitBtn = document.getElementById("submit-btn");
    let isAnimating = false;

    const protect = (str) => {
      try {
        return btoa(encodeURIComponent(str || ""));
      } catch {
        return btoa(encodeURIComponent(""));
      }
    };

    const unprotect = (str) => {
      try {
        return decodeURIComponent(atob(str || ""));
      } catch {
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

      const parsedInput = parseInt(inputVal);
      if (parsedInput === config.passcode.value) {
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
      submitBtn.addEventListener("touchend", handleSubmit, { passive: false });
      submitBtn.onclick = handleSubmit;
    }

    if (passcodeInput) {
      passcodeInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          checkPasscode();
        }
      });

      passcodeInput.addEventListener("input", function (e) {
        this.value = this.value.replace(/[^0-9]/g, "");

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

            letter.addEventListener(
              "animationend",
              () => (isAnimating = false),
              {
                once: true,
              }
            );
          }, 600);
        }
      };

      heart.addEventListener("click", handleHeartClick);
      heart.addEventListener("touchend", handleHeartClick, { passive: false });
    }

    if (closeBtn) {
      const handleClose = (e) => {
        e.preventDefault();
        if (!isAnimating) {
          isAnimating = true;

          // First hide the letter
          letter.style.animation =
            "letterClose 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
          letter.style.visibility = "visible";

          letter.addEventListener(
            "animationend",
            () => {
              // After letter is hidden, close the envelope
              letter.style.visibility = "hidden";
              letter.style.opacity = "0";
              envelope.classList.remove("open");

              // Wait for envelope to close, then show heart
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
      closeBtn.addEventListener("touchend", handleClose, { passive: false });
    }
  }, 100);
});

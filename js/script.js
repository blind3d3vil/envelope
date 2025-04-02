document.addEventListener("DOMContentLoaded", () => {
  console.log("Script initialized");

  const getConfigSafely = () => {
    try {
      // Wait for config to be available
      if (typeof window.CONFIG === "undefined") {
        console.error("Config is not defined");
        throw new Error("Config not found");
      }

      // Use CONFIG directly if getConfig is not available
      const config =
        typeof window.getConfig === "function"
          ? window.getConfig()
          : window.CONFIG;

      console.log("Raw config:", config);

      if (!config) {
        throw new Error("Config is null or undefined");
      }

      if (!config.passcode || typeof config.passcode.value !== "number") {
        console.error("Invalid passcode configuration:", config.passcode);
        throw new Error("Invalid passcode configuration");
      }

      console.log("Config loaded successfully");
      return config;
    } catch (e) {
      console.error("Config error:", e);
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
  console.log("Using config:", {
    hasPasscode: !!config.passcode,
    passcodeType: typeof config.passcode.value,
    hasLetter: !!config.letter,
    ui: !!config.ui,
  });

  const envelope = document.querySelector(".envelope");
  const heart = document.querySelector(".heart");
  const letter = document.querySelector(".letter");
  const closeBtn = document.querySelector(".close-btn");
  const passcodeInput = document.getElementById("passcode");
  const submitBtn = document.getElementById("submit-btn");
  let isAnimating = false;

  // Debug logging for elements
  console.log("Elements found:", {
    envelope: !!envelope,
    heart: !!heart,
    letter: !!letter,
    closeBtn: !!closeBtn,
    passcodeInput: !!passcodeInput,
    submitBtn: !!submitBtn,
  });

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
    console.log("Loading letter content");
    const letterContent = document.getElementById("letter-content");
    if (!letterContent) {
      console.error("Letter content element not found");
      return;
    }

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
    console.log("Checking passcode");
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const inputVal = passcodeInput ? passcodeInput.value : "";
    const errorMsg = document.getElementById("error-msg");
    const errorContainer = document.querySelector(".error-container");
    const wrapper = document.querySelector(".wrapper");

    console.log("Input value:", inputVal);
    console.log("Expected value:", config.passcode.value);
    console.log(
      "Types - Input:",
      typeof parseInt(inputVal),
      "Expected:",
      typeof config.passcode.value
    );

    if (!inputVal || !config.passcode.value) {
      console.error("Missing input value or passcode configuration");
      return;
    }

    const parsedInput = parseInt(inputVal);
    if (parsedInput === config.passcode.value) {
      console.log("Passcode correct");
      if (wrapper) wrapper.classList.add("show-envelope");
      if (errorMsg) errorMsg.classList.remove("show");
      if (errorContainer) errorContainer.classList.remove("show");
      loadLetterContent();
    } else {
      console.log("Passcode incorrect", {
        input: parsedInput,
        expected: config.passcode.value,
        match: parsedInput === config.passcode.value,
      });
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
    console.log("Setting up submit button handlers");

    const handleSubmit = (e) => {
      console.log("Submit handler called", e.type);
      e.preventDefault();
      e.stopPropagation();
      checkPasscode();
    };

    submitBtn.addEventListener("click", handleSubmit);
    submitBtn.addEventListener("touchend", handleSubmit, { passive: false });
    submitBtn.onclick = handleSubmit;
  }

  if (passcodeInput) {
    console.log("Setting up passcode input handlers");
    passcodeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        console.log("Enter key pressed");
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
      console.log("Heart clicked");
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
      console.log("Close button clicked");
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

  console.log("Script fully initialized");
});

const CONFIG = {
  passcode: {
    value: 1234, // Replace with your actual passcode
    placeholder: "Enter passcode...",
    errorMessage: "Wrong passcode!",
  },
  letter: {
    title: "Dear [Name],",
    paragraphs: [
      "First paragraph of your letter...",
      "Second paragraph of your letter...",
      "Third paragraph of your letter...",
      "Fourth paragraph of your letter...",
    ],
    signature: {
      text: "With love,",
      name: "Your Name",
    },
  },
};

// Prevent direct access to config values in browser console
(function () {
  // Basic encryption function (you can implement a stronger one)
  function encrypt(text) {
    return btoa(text);
  }

  // Store encrypted values
  const encryptedConfig = {
    passcode: encrypt(CONFIG.passcode.value.toString()),
    letter: encrypt(JSON.stringify(CONFIG.letter)),
  };

  // Expose only the getter method
  window.getConfig = function () {
    return {
      passcode: {
        value: parseInt(atob(encryptedConfig.passcode)),
        placeholder: CONFIG.passcode.placeholder,
        errorMessage: CONFIG.passcode.errorMessage,
      },
      letter: JSON.parse(atob(encryptedConfig.letter)),
    };
  };
})();

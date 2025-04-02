const CONFIG = {
  passcode: {
    value: 1234, // Replace with your passcode
    placeholder: "Enter passcode...",
    errorMessage: "Wrong passcode, try again!",
  },
  letter: {
    title: "Dear,",
    paragraphs: [
      "Your first paragraph here...",
      "Your second paragraph here...",
      "Your third paragraph here...",
      "Your fourth paragraph here...",
    ],
    signature: {
      text: "With love,",
      name: "Your Name",
    },
  },
};

// Prevent direct access to config values in browser console
(function () {
  window.getConfig = function () {
    return JSON.parse(JSON.stringify(CONFIG));
  };
})();

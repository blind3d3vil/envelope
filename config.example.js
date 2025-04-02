const CONFIG = {
  passcode: {
    value: 1234,
    placeholder: "What's our special number?",
    errorMessage: "Nope, try again! 💕",
  },
  letter: {
    title: "My Love,",
    paragraphs: [
      "This is where your first sweet paragraph goes...",
      "Maybe tell them why they're special here...",
      "Share a special memory or moment...",
      "End with something that'll make them smile...",
    ],
    signature: {
      text: "Forever Yours,",
      name: "Your Name",
    },
  },
};

(function () {
  window.getConfig = function () {
    return JSON.parse(JSON.stringify(CONFIG));
  };
})();

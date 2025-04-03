const config = {
  passcode: {
    value: 1234,
    placeholder: "Enter number...",
    errorMessage: "Wrong number! Try again!",
  },
  letter: {
    title: "Dear Love,",
    paragraphs: [
      "This is an example paragraph. Replace with your actual message.",
      "You can add as many paragraphs as you want.",
      "Each paragraph will be displayed in the letter.",
    ],
    signature: {
      text: "With all my love,",
      name: "Your Name",
    },
  },
};

window.CONFIG = config;

window.getConfig = function () {
  try {
    return JSON.parse(JSON.stringify(config));
  } catch (error) {
    console.error("Error in getConfig:", error);
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
    };
  }
};

// This is an example configuration file
// Copy this file to config.js and replace the placeholder values with your actual content
// Note: config.js is ignored by git and will be replaced during deployment

const config = {
  passcode: {
    value: 1234, // Replace with your actual passcode
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

// Make config globally available
window.config = config;

// Define getConfig function
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

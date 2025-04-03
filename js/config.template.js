const config = {
  passcode: {
    value: 3000,
    placeholder: "Enter number...",
    errorMessage: "Na Ah, Wrong number Azizam🚫",
  },
  letter: {
    title: "My Love,",
    paragraphs: [
      "There are feelings in this world that words can't contain, emotions too vast for any sentence to hold. But if I could try—if I could give even a glimpse of what you mean to me—it would be this: You are my heart, my warmth, my forever.",
      "Loving you isn't something I choose—it's something that just is. As natural as breathing, as certain as the sun rising each morning. It doesn't begin and end with the days; it doesn't depend on time, distance, or circumstances. It just exists—constant, unshaken, infinite.",
      "You are the feeling of home, no matter where I stand. You are the quiet in my chaos, the light in my darkest moments. You are the person I'd find in every lifetime, in every world, no matter how many times I had to search.",
      "And if ever a day comes when you forget just how deeply you are loved, remember this—there is not a single version of my life where you are not everything.",
    ],
    signature: {
      text: "I Love You In Every Universe,",
      name: "Alireza",
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

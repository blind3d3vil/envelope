const config = {
  passcode: {
    value: 730,
    placeholder: "Enter number...",
    errorMessage: "Na Ah, Wrong number Azizam🚫",
  },
  letter: {
    title: "My lovely notes,",
    paragraphs: [
      "Today marks two years.\nTwo years since this story began—not just a relationship, but the unfolding of something rare and entirely ours. I wish more than anything I could be looking into your eyes right now, touching your hand, letting the silence between us say everything we already feel. But even though we're apart today, I feel you in everything. In the rhythm of my heartbeat. In the air I breathe. In the empty space beside me that only your presence can fill.",
      "Loving you isn't something I chose. It's something my soul decided the first time it felt yours.\nYou are not a part of my life—you are its meaning. You're in the way I think, the way I dream, the way I carry love now. Before you, I didn't know this kind of depth existed.\nWe've had late-night talks and early morning kisses, playful teasing and deep silence. We've had hard days. We've had passion and comfort, fire and softness—and every version of us has only made me more certain:\nI want you. Every day. Every season. Every version of us still to come.",
      "I ache to be near you today. Not just to hold your body, but to feel your heartbeat sync with mine.\nTo tell you face to face what I already feel in every part of me:\nThat I'm yours.\nCompletely.\nAnd I don't want a future unless it has your voice in the morning, your name in my phone, your hair on my pillow, your laugh in our kitchen, and your love wrapped around every version of me I become.\n\nEven without being beside you today, I feel wrapped in us—in everything we've been, and everything we're becoming.",
      "So happy anniversary, my heart.\nMy safest place. My wildest dream. My once-in-a-lifetime.\nForever doesn't seem long enough when it's with you.",
    ],
    signature: {
      text: "Yours, always",
      name: "Alireza",
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

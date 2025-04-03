// Simple XOR encryption
const ENCRYPTION_KEY = "love-letter-key-2024";

function encrypt(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode =
      text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    result += String.fromCharCode(charCode);
  }
  return Buffer.from(result).toString("base64");
}

function decrypt(encoded) {
  try {
    const text = Buffer.from(encoded, "base64").toString();
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const charCode =
        text.charCodeAt(i) ^
        ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (e) {
    console.error("Decryption failed:", e);
    return "";
  }
}

// Configuration object
const config = {
  passcode: {
    value: 3000,
    placeholder: "Enter number...",
    errorMessage: "Na Ah, Wrong number Azizam🚫",
  },
  letter: {
    title: "My Love,",
    paragraphs: [
      "Every moment with you feels like a beautiful dream come true. Your smile brightens my darkest days, and your love gives me strength I never knew I had.",
      "In you, I found not just a partner, but my best friend, my confidant, and my soulmate. You understand me in ways no one else does, and you love me despite my flaws.",
      "I cherish every laugh we share, every tear we've wiped away, and every memory we've created together. You make my life complete in ways I never imagined possible.",
      "You are my today and all of my tomorrows. I promise to love you more with each passing day, to support you in all your dreams, and to be by your side through every challenge life brings.",
    ],
    signature: {
      text: "I Love You In Every Universe,",
      name: "Alireza",
    },
  },
};

// Encrypt the config
const encryptedConfig = encrypt(JSON.stringify(config));
console.log("Encrypted config:", encryptedConfig);

// Verify decryption works
const decryptedConfig = decrypt(encryptedConfig);
console.log("\nDecrypted config:", JSON.parse(decryptedConfig));

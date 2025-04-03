// Generate a random encryption key
const ENCRYPTION_KEY =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
console.log("Generated Encryption Key:", ENCRYPTION_KEY);

// Encryption functions
function encrypt(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode =
      text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result); // Convert to base64
}

function encryptObject(obj) {
  return encrypt(JSON.stringify(obj));
}

// Your configuration
const config = {
  passcode: {
    value: 3000,
    placeholder: "Enter number...",
    errorMessage: "Try again!",
  },
  letter: {
    title: "My Dearest Love",
    paragraphs: [
      "Every moment with you feels like a beautiful dream come true. Your smile brightens my day, your laugh fills my heart with joy, and your love makes me feel complete.",
      "I cherish every memory we've created together, from our first meeting to all the adventures we've shared. You've made my life so much more meaningful and beautiful.",
      "I promise to love you more with each passing day, to support you in all your dreams, and to be your partner in this beautiful journey of life.",
    ],
    signature: {
      text: "Forever yours,",
      name: "Your Secret Admirer",
    },
  },
};

// Encrypt the config
const encryptedConfig = encryptObject(config);
console.log("\nEncrypted Config:");
console.log(encryptedConfig);

// Verify decryption works
function decrypt(encoded) {
  try {
    const text = atob(encoded);
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

function decryptObject(encoded) {
  try {
    return JSON.parse(decrypt(encoded));
  } catch (e) {
    console.error("Object decryption failed:", e);
    return null;
  }
}

// Test decryption
const decryptedConfig = decryptObject(encryptedConfig);
console.log("\nVerifying decryption:");
console.log(JSON.stringify(decryptedConfig, null, 2));

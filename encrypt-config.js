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
  return Buffer.from(result).toString("base64"); // Convert to base64 using Buffer
}

function encryptObject(obj) {
  return encrypt(JSON.stringify(obj));
}

// Your configuration
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

// Encrypt the config
const encryptedConfig = encryptObject(config);
console.log("\nEncrypted Config:");
console.log(encryptedConfig);

// Verify decryption works
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

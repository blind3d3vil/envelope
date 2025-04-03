// Encryption key - DO NOT CHANGE ONCE SET
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

function encryptObject(obj) {
  return encrypt(JSON.stringify(obj));
}

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

// Generate encrypted config
const encryptedConfig = encryptObject(config);
console.log("\nEncrypted Config:");
console.log(encryptedConfig);

// Test decryption
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

// Verify decryption works
const decryptedConfig = decryptObject(encryptedConfig);
console.log("\nVerifying decryption works:");
console.log(JSON.stringify(decryptedConfig, null, 2));

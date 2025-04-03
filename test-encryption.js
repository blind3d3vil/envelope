// Test encryption/decryption
const ENCRYPTION_KEY = "love-letter-key-2024";

// Simple test data
const testData = {
  test: "Hello World",
  number: 123,
};

// Encryption function
function encrypt(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode =
      text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    result += String.fromCharCode(charCode);
  }
  return Buffer.from(result).toString("base64");
}

// Decryption function
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

// Test encryption
const encrypted = encrypt(JSON.stringify(testData));
console.log("Encrypted:", encrypted);

// Test decryption
const decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted);

// Verify it matches
console.log("Matches original:", JSON.stringify(testData) === decrypted);

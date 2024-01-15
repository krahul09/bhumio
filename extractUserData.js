const Tesseract = require("node-tesseract-ocr");
const fs = require("fs");

// Configuration for Tesseract OCR
const config = {
  lang: "eng",
  oem: 1,
  psm: 6,
};

// Function to extract text from an image using Tesseract OCR
async function extractTextFromImage(imagePath) {
  try {
    const text = await Tesseract.recognize(imagePath, config);
    return text ? text.trim() : null;
  } catch (error) {
    console.error("Error extracting text:", error.message);
    return null;
  }
}

// Function to extract user input from the provided images
async function extractUserData() {
  const imageNames = ["image1", "image2", "image3"]; // Add the names of your images without extensions
  const imagePaths = imageNames.map((imageName) => `./assets/${imageName}.jpg`);

  for (const imagePath of imagePaths) {
    console.log(`Processing ${imagePath}...`);

    // Extract text from the image
    const extractedText = await extractTextFromImage(imagePath);

    if (extractedText !== null) {
      // Parse and extract desired information
      const lines = extractedText.split("\n");
      const userData = {};

      lines.forEach((line) => {
        // Modify this section based on the specific format of your images
        if (
          line.includes("Checkbox") ||
          line.includes("Name") ||
          line.includes("Address")
        ) {
          const [key, value] = line.split(":").map((item) => item.trim());
          userData[key] = value;
        }
      });

      console.log("Extracted User Data:", userData);
    }
  }
}

extractUserData();

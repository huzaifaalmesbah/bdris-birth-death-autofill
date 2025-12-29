# BDRIS Birth & Death Autofill 🇧🇩

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Privacy](https://img.shields.io/badge/privacy-local%20storage-orange?style=flat-square)

A lightweight, open-source Chrome Extension designed to streamline the verification process on the **BDRIS (Birth and Death Registration Information System)** website.

It injects a smart **"Paste Number"** button directly into the page, allowing you to autofill your 17-digit Registration Number and focus the Date of Birth field in a single click.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🚀 **Universal** | Works seamlessly on both [Birth](https://everify.bdris.gov.bd/) and [Death](https://everify.bdris.gov.bd/UDRNVerification) verification pages. |
| 💾 **Smart History** | Automatically saves your last **100** used numbers locally. Never lose a number again. |
| ⚡ **One-Click Fill** | Paste your number or select from history, and the tool fills the form and jumps to the Date field. |
| 🎛️ **Popup Menu** | Access your History, settings, and the BDRIS site directly from the toolbar icon. |
| ⚙️ **Customizable** | You decide how many history items to keep (from 1 to 500). |
| 🔒 **Privacy First** | **100% Local.** Your data stays in your browser using `chrome.storage`. No external servers. |

---

## 📦 Installation Guide

Since this is an open-source tool, you can install it in less than a minute:

1.  **Download**: Click the green **Code** button above ➔ **Download ZIP**.
2.  **Extract**: Unzip the file. You'll see a folder named `bdris-birth-death-autofill`.
3.  **Open Extensions**: In Chrome, go to `chrome://extensions/` (or click ⋮ ➔ Extensions ➔ Manage Extensions).
4.  **Enable Developer Mode**: Turn on the toggle switch in the top-right corner.
5.  **Load Unpacked**: Click the **Load unpacked** button (top-left) and select the `bdris-birth-death-autofill` folder.

🎉 **Done!** You should now see the extension icon in your toolbar.

---

## 🛠 How to Use

### 1. The Popup Dashboard 🎛️
Click the extension icon in your toolbar to:
*   🏠 **Open BDRIS**: Quickly launch the verification website.
*   📜 **View History**: Manage your saved numbers (Copy/Delete).
*   ⚙️ **Settings**: Configure your history storage limit.

### 2. Autofilling the Form 📝
1.  Navigate to the BDRIS Verification page.
2.  Click the red **"📝 Paste Number"** button (injected next to the input).
3.  **Paste** a new number OR click **"Fill"** on a recent history item.
4.  The Registration Number is filled, and the cursor **auto-jumps** to the *Date of Birth* field.
5.  Simply type the date, solve the captcha, and search!

---

## ❓ Troubleshooting

**Q: The red "Paste Number" button isn't showing?**
*   Refresh the page.
*   Ensure you are on the correct official website (`everify.bdris.gov.bd`).

**Q: Clicking the toolbar icon doesn't work?**
*   Make sure you have reloaded the extension after updating. Go to `chrome://extensions` and click the refresh icon on the card.

---

## 📄 Privacy Policy
This extension is built with privacy in mind.
*   **No Tracking**: We do not track your usage.
*   **Local Storage**: All your Registration Numbers are stored locally on your device using Chrome's secure storage API.
*   **Open Source**: The full code is available here for inspection.

---

## 📜 License
MIT License. Free to use, modify, and distribute for the community.

*Made with ❤️ for Bangladesh.*

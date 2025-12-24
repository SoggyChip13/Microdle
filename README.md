# 🦠 Microdle

Daily Microbiology Guessing Game - A Loldle-inspired game for medical students!

## About

Microdle is a daily guessing game where you try to identify a mystery microorganism based on its attributes. Similar to Loldle (League of Legends Wordle), each guess provides color-coded feedback:

- 🟢 **Green**: Attribute matches exactly
- 🟡 **Yellow**: Attribute is partially correct
- 🔴 **Red**: Attribute is incorrect

## How to Play

1. Visit the main menu and select "Classic Mode"
2. Type the name of a microorganism in the search box
3. Select from the autocomplete dropdown menu
4. Review the color-coded feedback for each attribute
5. Keep guessing until you find the correct microorganism!
6. See how many other players have solved today's challenge!

## Game Modes

### Classic Mode (Available)
Guess the microorganism based on 9 medical attributes:
- **Name**: The scientific name
- **Type**: Bacteria, Virus, or Fungus
- **Culture/Stain**: Culture media and staining methods
- **Structure**: Gram stain result and morphology
- **Key Diagnostics**: Key diagnostic tests
- **Intra/Extra**: Intracellular or Extracellular
- **Capsule/Envelope**: Presence of capsule or envelope
- **Site/Host(s)**: Primary infection sites or hosts
- **Treatment**: Recommended treatment options

### Other Modes (Coming Soon)
- **Buzzword Mode**: Identify microbiology terms from definitions
- **Histology Mode**: Recognize microorganisms from microscopy images
- **Case Study Mode**: Diagnose from clinical presentations

## Setup

### Quick Start (Local)

1. Clone this repository
2. Open `index.html` in your web browser
3. Start playing!

No installation or build process required for basic functionality.

### Hosting Online

You can host this game on:
- **GitHub Pages**: Settings → Pages → Deploy from branch
- **Netlify**: Drag and drop files at netlify.com/drop
- **Vercel**: Import GitHub repo
- Any static site hosting service

### Firebase Setup (Required for Global Counter)

To enable the "Players solved today" global counter feature:

#### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select your existing project
3. Follow the setup wizard

#### 2. Enable Realtime Database

1. In Firebase Console, go to "Realtime Database"
2. Click "Create Database"
3. Choose your location
4. Start in **test mode** (or configure security rules)

#### 3. Configure Security Rules

In the Realtime Database → Rules tab, set:

```json
{
  "rules": {
    "dailyWinners": {
      ".read": true,
      "$date": {
        ".write": true,
        ".validate": "newData.isNumber() && newData.val() >= 0"
      }
    }
  }
}
```

This allows:
- Anyone to read the counter
- Anyone to increment (write) the counter
- Ensures counter values are positive numbers

#### 4. Get Firebase Config

1. In Firebase Console → Project Settings → Your apps
2. Click the web icon (</>) to add a web app
3. Register your app (give it a name)
4. Copy the Firebase configuration object

#### 5. Update script.js

In `script.js`, replace the placeholder Firebase config (lines 2-9) with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "microdle-default-rtdb.firebaseapp.com",
    databaseURL: "https://microdle-default-rtdb.firebaseio.com",
    projectId: "microdle",
    storageBucket: "microdle.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

**You already have the databaseURL**: `https://microdle-default-rtdb.firebaseio.com`

Just fill in the other values from your Firebase config.

#### 6. Test It

1. Open the game in your browser
2. The "Players solved today: X" counter should show a number
3. Win the game to increment the counter
4. Refresh the page to see the updated count

### Security Considerations

The test mode rules allow anyone to read/write. For production:

1. Consider adding rate limiting
2. Implement Cloud Functions for secure increments
3. Add authentication if needed
4. Monitor usage in Firebase Console

## Files Structure

```
/
├── index.html          # Main menu page
├── classic.html        # Classic game mode
├── buzzword.html       # Buzzword mode (coming soon)
├── histology.html      # Histology mode (coming soon)
├── case-study.html     # Case study mode (coming soon)
├── style.css           # Game styling
├── menu-style.css      # Menu styling
├── coming-soon.css     # Coming soon pages styling
├── script.js           # Game logic with Firebase
├── data.js             # Microorganism database (58 organisms)
├── logo.png            # Game logo
└── README.md           # This file
```

## Adding More Microorganisms

To add more microorganisms to the game, edit `data.js` and add new entries to the `microorganisms` array:

```javascript
{
    name: "Staphylococcus aureus",
    type: "Bacteria",
    cultureStain: "Gram, Mannitol salt agar",
    structure: "G(+), coccus",
    keyDiagnostics: "Catalase(+), Coagulase(+)",
    intraExtra: "Extracellular",
    capsuleEnvelope: "Encapsulated",
    siteHost: "Human (Respiratory), Food",
    treatment: "Nafcillin, Oxacillin, Dicloxacillin, Vancomycin, Linezolid"
}
```

## Features

- ✅ Daily challenge (changes every 24 hours, same for everyone)
- ✅ Multi-mode interface (4 game modes)
- ✅ Global winner counter with Firebase integration
- ✅ Autocomplete search for easy organism selection
- ✅ Color-coded feedback system (green/yellow/red)
- ✅ Staggered reveal animation (cells appear left to right)
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Share results feature
- ✅ Countdown timer to next daily challenge
- ✅ 58 real microorganisms from medical curriculum
- ✅ Custom logo integration

## Troubleshooting

### "Players solved today: N/A" or "Error"

This means Firebase is not properly configured. Check:
1. Firebase config values in `script.js` are correct
2. Realtime Database is enabled in Firebase Console
3. Security rules allow read/write access
4. No console errors (press F12 → Console tab)

### "Players solved today: Loading..." forever

Check:
1. Internet connection is working
2. Firebase database URL is correct
3. Database rules allow `.read: true` for `/dailyWinners`
4. Check browser console for errors

### Counter doesn't increment when winning

Check:
1. Database rules allow `.write: true` for `/dailyWinners/$date`
2. No console errors when winning
3. Firebase initialization succeeded (check console logs)

## Credits

- Inspired by [Loldle](https://loldle.net/)
- Made with ❤️ for medical students studying microbiology
- Data structure and categories provided by medical curriculum

## License

Feel free to use and modify this game for educational purposes!

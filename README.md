# 🦠 Microdle

Daily Microbiology Guessing Game - A Loldle-inspired game for medical students!

## About

Microdle is a daily guessing game where you try to identify a mystery microorganism based on its attributes. Similar to Loldle (League of Legends Wordle), each guess provides color-coded feedback:

- 🟢 **Green**: Attribute matches exactly
- 🟡 **Yellow**: Attribute is partially correct
- ⚫ **Gray**: Attribute is incorrect

## How to Play

1. Type the name of a microorganism in the search box
2. Select from the dropdown menu
3. Review the color-coded feedback for each attribute
4. Keep guessing until you find the correct microorganism!

## Attributes

Each microorganism has the following attributes:
- **Name**: The scientific name
- **Type**: Bacteria, Virus, or Fungus
- **Gram Stain**: Positive, Negative, Acid-fast, Spirochete, or N/A
- **Shape**: Cocci, Bacilli, Spiral, etc.
- **Oxygen Requirement**: Aerobic, Anaerobic, Facultative, or Microaerophilic
- **Disease**: The primary disease it causes

## Setup

Simply open `index.html` in a web browser! No installation or build process required.

### Running Locally

1. Clone this repository
2. Open `index.html` in your browser
3. Start guessing!

### Hosting Online

You can host this game on:
- GitHub Pages
- Netlify
- Vercel
- Any static site hosting service

Just upload the files and you're good to go!

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `script.js` - Game logic and interactivity
- `data.js` - Microorganism database

## Adding More Microorganisms

To add more microorganisms to the game, edit `data.js` and add new entries to the `microorganisms` array following this format:

```javascript
{
    name: "Organism Name",
    type: "Bacteria/Virus/Fungus",
    gramStain: "Positive/Negative/N/A",
    shape: "Cocci/Bacilli/etc",
    oxygenReq: "Aerobic/Anaerobic/Facultative",
    disease: "Disease Name"
}
```

## Features

- ✅ Daily challenge (changes every 24 hours)
- ✅ Autocomplete search for easy organism selection
- ✅ Color-coded feedback system
- ✅ Responsive design for mobile and desktop
- ✅ Share results feature
- ✅ Countdown timer to next daily challenge
- ✅ 25+ microorganisms included

## Credits

Inspired by [Loldle](https://loldle.net/) and made for medical students studying microbiology.

## License

Feel free to use and modify this game for educational purposes!

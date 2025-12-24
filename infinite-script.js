// Game state
let currentMicroorganism = null;
let guessedMicroorganisms = [];
let attempts = 0;
let gameWon = false;
let roundNumber = 1;
let usedMicroorganisms = [];

// Initialize game
function initGame() {
    // Get random microorganism for first round
    currentMicroorganism = getRandomMicroorganism();
    
    // Setup event listeners
    const searchInput = document.getElementById('searchInput');
    const dropdown = document.getElementById('dropdown');
    
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keydown', handleKeyDown);
    
    // Click outside to close dropdown
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Next round button
    document.getElementById('nextRoundButton').addEventListener('click', startNextRound);
}

// Get random microorganism (avoid recently used ones)
function getRandomMicroorganism() {
    // Filter out recently used microorganisms (last 5 rounds)
    const recentlyUsed = usedMicroorganisms.slice(-5);
    const available = microorganisms.filter(micro => 
        !recentlyUsed.some(used => used.name === micro.name)
    );
    
    // If we've used all but a few, reset the used list
    if (available.length < 5) {
        usedMicroorganisms = [];
        return microorganisms[Math.floor(Math.random() * microorganisms.length)];
    }
    
    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex];
    usedMicroorganisms.push(selected);
    
    return selected;
}

// Start next round
function startNextRound() {
    // Reset round state
    guessedMicroorganisms = [];
    attempts = 0;
    gameWon = false;
    roundNumber++;
    
    // Get new random microorganism
    currentMicroorganism = getRandomMicroorganism();
    
    // Update UI
    document.getElementById('attempts').textContent = '0';
    document.getElementById('roundNumber').textContent = roundNumber;
    document.getElementById('guesses').innerHTML = '';
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('searchInput').disabled = false;
    document.getElementById('searchInput').value = '';
    document.getElementById('searchInput').focus();
}

// Handle search input
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const dropdown = document.getElementById('dropdown');
    
    if (searchTerm === '') {
        dropdown.classList.remove('show');
        return;
    }
    
    const filtered = microorganisms.filter(micro => 
        micro.name.toLowerCase().includes(searchTerm) &&
        !guessedMicroorganisms.some(g => g.name === micro.name)
    );
    
    if (filtered.length > 0) {
        dropdown.innerHTML = filtered.map(micro => 
            `<div class="dropdown-item" data-name="${micro.name}">${micro.name}</div>`
        ).join('');
        
        dropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => selectMicroorganism(item.dataset.name));
        });
        
        dropdown.classList.add('show');
    } else {
        dropdown.classList.remove('show');
    }
}

// Handle keyboard navigation
function handleKeyDown(e) {
    const dropdown = document.getElementById('dropdown');
    const items = dropdown.querySelectorAll('.dropdown-item');
    
    if (e.key === 'Enter' && items.length > 0) {
        e.preventDefault();
        selectMicroorganism(items[0].dataset.name);
    }
}

// Select a microorganism
function selectMicroorganism(name) {
    const micro = microorganisms.find(m => m.name === name);
    
    if (!micro || gameWon) return;
    
    // Add to guessed list
    guessedMicroorganisms.push(micro);
    attempts++;
    
    // Update attempts counter
    document.getElementById('attempts').textContent = attempts;
    
    // Clear search input
    document.getElementById('searchInput').value = '';
    document.getElementById('dropdown').classList.remove('show');
    
    // Display guess
    displayGuess(micro);
    
    // Check if won
    if (micro.name === currentMicroorganism.name) {
        gameWon = true;
        showGameOver(true);
    }
}

// Display a guess with color coding
function displayGuess(guess) {
    const guessesContainer = document.getElementById('guesses');
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';
    
    // Compare attributes
    const attributes = [
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'cultureStain', label: 'Culture/Stain' },
        { key: 'structure', label: 'Structure' },
        { key: 'keyDiagnostics', label: 'Key Diagnostics' },
        { key: 'intraExtra', label: 'Intra/Extra' },
        { key: 'capsuleEnvelope', label: 'Capsule/Envelope' },
        { key: 'siteHost', label: 'Site/Host(s)' },
        { key: 'treatment', label: 'Treatment' }
    ];
    
    attributes.forEach((attr, index) => {
        const cell = document.createElement('div');
        cell.className = 'guess-cell';
        cell.textContent = guess[attr.key];
        
        // Add staggered reveal animation
        cell.style.animationDelay = `${index * 0.1}s`;
        cell.classList.add('cell-reveal');
        
        // Color coding
        if (guess[attr.key] === currentMicroorganism[attr.key]) {
            cell.classList.add('correct');
        } else if (attr.key === 'name') {
            cell.classList.add('incorrect');
        } else {
            // Check for partial matches
            const guessValue = guess[attr.key].toLowerCase();
            const correctValue = currentMicroorganism[attr.key].toLowerCase();
            
            if (guessValue.includes(correctValue) || correctValue.includes(guessValue)) {
                cell.classList.add('partial');
            } else {
                cell.classList.add('incorrect');
            }
        }
        
        guessRow.appendChild(cell);
    });
    
    guessesContainer.insertBefore(guessRow, guessesContainer.firstChild);
}

// Show game over message
function showGameOver(won) {
    const gameOverDiv = document.getElementById('gameOver');
    const message = document.getElementById('gameOverMessage');
    const answer = document.getElementById('correctAnswer');
    
    if (won) {
        message.textContent = `🎉 Congratulations! You got it in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}!`;
    }
    
    answer.textContent = `The answer was: ${currentMicroorganism.name}`;
    gameOverDiv.classList.remove('hidden');
    
    // Disable input
    document.getElementById('searchInput').disabled = true;
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', initGame);

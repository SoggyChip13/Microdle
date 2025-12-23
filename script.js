// Game state
let dailyMicroorganism = null;
let guessedMicroorganisms = [];
let attempts = 0;
let gameWon = false;

// Initialize game
function initGame() {
    // Get daily microorganism based on date
    dailyMicroorganism = getDailyMicroorganism();
    
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
    
    // Share button
    document.getElementById('shareButton').addEventListener('click', shareResults);
    
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Get daily microorganism based on date seed
function getDailyMicroorganism() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % microorganisms.length;
    return microorganisms[index];
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
    if (micro.name === dailyMicroorganism.name) {
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
        if (guess[attr.key] === dailyMicroorganism[attr.key]) {
            cell.classList.add('correct');
        } else if (attr.key === 'name') {
            cell.classList.add('incorrect');
        } else {
            // Check for partial matches
            const guessValue = guess[attr.key].toLowerCase();
            const correctValue = dailyMicroorganism[attr.key].toLowerCase();
            
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
    } else {
        message.textContent = '😔 Better luck next time!';
    }
    
    answer.textContent = `The answer was: ${dailyMicroorganism.name}`;
    gameOverDiv.classList.remove('hidden');
    
    // Disable input
    document.getElementById('searchInput').disabled = true;
}

// Share results
function shareResults() {
    const emoji = gameWon ? '🎉' : '😔';
    const text = `Microdle ${emoji}\nAttempts: ${attempts}\n\n${window.location.href}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Results copied to clipboard! 📋');
        }).catch(() => {
            alert('Could not copy to clipboard');
        });
    } else {
        alert(text);
    }
}

// Update countdown to next game
function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', initGame);

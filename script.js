// Voting functionality
const voteForm = document.getElementById('voteForm');
const resultDiv = document.getElementById('result');
const voteCountList = document.getElementById('voteCount');

const sports = ['basketball', 'soccer', 'dodgeball', 'olympicHandball'];
let votes = {
    basketball: 0,
    soccer: 0,
    dodgeball: 0,
    olympicHandball: 0
};

// Function to reset votes
function resetVotes() {
    votes = {
        basketball: 0,
        soccer: 0,
        dodgeball: 0,
        olympicHandball: 0
    };
    localStorage.setItem('votes', JSON.stringify(votes));
}

// Function to check if it's Wednesday and reset votes
function checkReset() {
    const now = new Date();
    if (now.getDay() === 3) { // 3 means Wednesday
        resetVotes();
    }
}

// Load votes from local storage
function loadVotes() {
    const storedVotes = JSON.parse(localStorage.getItem('votes'));
    if (storedVotes) {
        votes = storedVotes;
    }
}

// Display current votes
function displayVotes() {
    voteCountList.innerHTML = '';
    for (const sport of sports) {
        const li = document.createElement('li');
        li.textContent = \`\${sport.charAt(0).toUpperCase() + sport.slice(1)}: \${votes[sport]}\`;
        voteCountList.appendChild(li);
    }
    resultDiv.classList.remove('hidden');
}

// Vote submission handler
voteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedSport = voteForm.sport.value;
    if (votes[selectedSport] !== undefined) {
        votes[selectedSport]++;
        localStorage.setItem('votes', JSON.stringify(votes));
        displayVotes();
        voteForm.reset();
    }
});

// Initialize the voting app
function init() {
    checkReset();
    loadVotes();
    displayVotes();
}

// Run the initialization
init();

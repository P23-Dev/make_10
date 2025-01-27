// Store game state in variables
let name = "Guest";
let score = 0;
let digits = [];
let currentLanguage = "en"; // Default language

// DOM elements
const userNameSpan = document.getElementById('user-name');
const scoreSpan = document.getElementById('score');
const digitsSpan = document.getElementById('digits');
const messageP = document.getElementById('message');
const expressionInput = document.getElementById('expression');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const nameInput = document.getElementById('name-input');
const setNameButton = document.getElementById('set-name');
const greetingP = document.getElementById('greeting');
const languageSelect = document.getElementById('language-select');
const changeLanguageButton = document.getElementById('change-language');
const startGameButton = document.getElementById('start-game');
const hintP = document.getElementById('hint');

// Functions to handle game logic

// Generate random digits for the puzzle
function generateDigits() {
    digits = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);
    digitsSpan.textContent = `[${digits.join(", ")}]`;
}

// Validate the expression
function validateExpression(expression) {
    const usedDigits = [...new Set(expression.replace(/[^\d]/g, '').split('').map(Number))];
    return usedDigits.length === digits.length && usedDigits.every(digit => digits.includes(digit));
}

// Check if the result is correct
function checkExpression(expression) {
    try {
        const result = eval(expression);
        return result === 10;
    } catch (e) {
        return false;
    }
}

// Show the message based on the result
function showMessage(isCorrect, expression) {
    if (isCorrect) {
        messageP.textContent = translations[currentLanguage].congratulations;
        score++;
        scoreSpan.textContent = score;
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    } else {
        const result = eval(expression);
        messageP.innerHTML = translations[currentLanguage].incorrect_result
            .replace("{{ guess }}", result)
            .replace("{{ correctResult }}", 10);
        
        // Highlight the error in the formula
        highlightError(expression, result);
    }
}

// Highlight the error in the formula
function highlightError(expression, result) {
    let correctExpression = "10";  // Always expects result to be 10
    messageP.innerHTML += `<br><strong>${translations[currentLanguage].your_guess}</strong> <span class="highlight">${expression}</span>`;

    // Show where the error is
    let formulaHTML = expression.replace(result, `<span class="highlight">${result}</span>`);
    messageP.innerHTML += `<br><strong>${translations[currentLanguage].incorrect_formula}</strong> ${formulaHTML}`;
}

// Update all text content on the page dynamically
function updateText() {
    // Update the page's language
    document.documentElement.lang = currentLanguage;  // Update HTML 'lang' attribute

    // Update UI elements based on current language
    document.getElementById('submit-button').textContent = translations[currentLanguage].submit;
    document.getElementById('next-button').textContent = translations[currentLanguage].next;
    document.getElementById('set-name').textContent = translations[currentLanguage].set_name;
    document.getElementById('change-language').textContent = translations[currentLanguage].change_language;
    document.getElementById('start-game').textContent = translations[currentLanguage].start_game;
    document.getElementById('language-select').setAttribute('aria-label', translations[currentLanguage].select_language);
    document.getElementById('score-label').textContent = translations[currentLanguage].score;
    document.getElementById('use-digits').textContent = translations[currentLanguage].use_digits;
    document.getElementById('your-guess-label').textContent = translations[currentLanguage].your_guess;
    document.getElementById('incorrect-formula-label').textContent = translations[currentLanguage].incorrect_formula;
    document.getElementById('hint').textContent = translations[currentLanguage].hint;
    
    // Update language options in the select dropdown
    document.getElementById('language-en').textContent = translations[currentLanguage].language_en;
    document.getElementById('language-cz').textContent = translations[currentLanguage].language_cz;
    
    // Update player greeting and placeholders
    greetingP.textContent = translations[currentLanguage].player_greeting.replace("{{ name }}", name).replace("{{ score }}", score);
    expressionInput.setAttribute('placeholder', translations[currentLanguage].enter_expression);
}

// Event Listeners
submitButton.addEventListener('click', () => {
    const expression = expressionInput.value.trim();
    if (!expression) {
        messageP.textContent = translations[currentLanguage].invalid_expression.replace("{{ expression }}", expression);
    } else if (validateExpression(expression)) {
        const isCorrect = checkExpression(expression);
        showMessage(isCorrect, expression);
    } else {
        messageP.textContent = translations[currentLanguage].invalid_digits;
    }
});

nextButton.addEventListener('click', () => {
    generateDigits();
    expressionInput.value = '';
    messageP.textContent = '';
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
});

// Set player name
setNameButton.addEventListener('click', () => {
    name = nameInput.value.trim() || "Guest";
    userNameSpan.textContent = name;
    document.getElementById('name-form').style.display = "none";
    document.getElementById('user-info').style.display = "block";
    document.getElementById('puzzle').style.display = "block";
    generateDigits();
});

// Change language
changeLanguageButton.addEventListener('click', () => {
    currentLanguage = languageSelect.value;
    updateText();  // Update the text after language change
});

// Initialize game
function initGame() {
    document.getElementById('name-form').style.display = "block";
    document.getElementById('user-info').style.display = "none";
    document.getElementById('puzzle').style.display = "none";
}

initGame();

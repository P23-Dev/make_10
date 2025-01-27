// Store game state in variables
let name = "Guest";
let score = 0;
let digits = [];
let translations = {
    en: {
        congratulations: "Congratulations, you solved the puzzle!",
        incorrect_result: "The result is not correct. You guessed: {{ guess }}. The correct result is: {{ correctResult }}.",
        invalid_expression: "The expression '{{ expression }}' is invalid.",
        invalid_digits: "The expression uses invalid digits.",
        enter_name: "Enter your name",
        submit: "Submit",
        next: "Next",
        set_name: "Set Name",
        change_language: "Change Language",
        select_language: "Select Language",
        language_en: "English",
        language_cz: "Czech",
        start_game: "Start Game",
        score: "Score",
    },
    cz: {
        congratulations: "Gratulujeme, vyřešili jste hádanku!",
        incorrect_result: "Výsledek není správný. Uhodl(a) jste: {{ guess }}. Správný výsledek je: {{ correctResult }}.",
        invalid_expression: "Výraz '{{ expression }}' není platný.",
        invalid_digits: "Výraz používá neplatné číslice.",
        enter_name: "Zadejte své jméno",
        submit: "Odeslat",
        next: "Další",
        set_name: "Nastavit jméno",
        change_language: "Změnit jazyk",
        select_language: "Vyberte jazyk",
        language_en: "Angličtina",
        language_cz: "Čeština",
        start_game: "Začít hru",
        score: "Skóre",
    }
};

let currentLanguage = "en";

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
    let errorMessage = `You guessed: <span class="incorrect">${result}</span>. The correct result is: <span class="correct">${correctExpression}</span>.`;
    messageP.innerHTML += `<br><strong>Your guess:</strong> <span class="highlight">${expression}</span>`;

    // Show where the error is
    let formulaHTML = expression.replace(result, `<span class="highlight">${result}</span>`);
    messageP.innerHTML += `<br><strong>Incorrect formula:</strong> ${formulaHTML}`;
}

// Update all text content on the page
function updateText() {
    // Update UI elements based on current language
    document.getElementById('submit-button').textContent = translations[currentLanguage].submit;
    document.getElementById('next-button').textContent = translations[currentLanguage].next;
    document.getElementById('set-name').textContent = translations[currentLanguage].set_name;
    document.getElementById('change-language').textContent = translations[currentLanguage].change_language;
    document.getElementById('start-game').textContent = translations[currentLanguage].start_game;
    document.getElementById('language-select').setAttribute('aria-label', translations[currentLanguage].select_language);
    document.getElementById('score-label').textContent = translations[currentLanguage].score;
    
    // Change placeholders and prompts
    greetingP.textContent = `${translations[currentLanguage].enter_name} ${name}!`;

    // Update language options in the select dropdown
    document.getElementById('language-en').textContent = translations[currentLanguage].language_en;
    document.getElementById('language-cz').textContent = translations[currentLanguage].language_cz;
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
    updateText();
});

// Initialize game
function initGame() {
    document.getElementById('name-form').style.display = "block";
    document.getElementById('user-info').style.display = "none";
    document.getElementById('puzzle').style.display = "none";
}

initGame();

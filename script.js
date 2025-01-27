// Store game state in variables
let name = "Guest";
let score = 0;
let digits = [];
let translations = {
    en: {
        congratulations: "Congratulations, you solved the puzzle!",
        incorrect_result: "The result is not correct. It was {{ result }}.",
        invalid_expression: "The expression '{{ expression }}' is invalid.",
        invalid_digits: "The expression uses invalid digits.",
        enter_name: "Enter your name",
    },
    cz: {
        congratulations: "Gratulujeme, vyřešili jste hádanku!",
        incorrect_result: "Výsledek není správný. Byl {{ result }}.",
        invalid_expression: "Výraz '{{ expression }}' není platný.",
        invalid_digits: "Výraz používá neplatné číslice.",
        enter_name: "Zadejte své jméno",
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
        messageP.textContent = translations[currentLanguage].incorrect_result.replace("{{ result }}", eval(expression));
    }
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
    greetingP.textContent = `${translations[currentLanguage].enter_name} ${name}!`;
    document.getElementById('name-form').style.display = "none";
    document.getElementById('user-info').style.display = "block";
    document.getElementById('puzzle').style.display = "block";
    generateDigits();
});

// Change language
changeLanguageButton.addEventListener('click', () => {
    currentLanguage = languageSelect.value;
    greetingP.textContent = `${translations[currentLanguage].enter_name} ${name}!`;
    messageP.textContent = '';
    scoreSpan.textContent = score;
});

// Initialize game
function initGame() {
    document.getElementById('name-form').style.display = "block";
    document.getElementById('user-info').style.display = "none";
    document.getElementById('puzzle').style.display = "none";
}

initGame();


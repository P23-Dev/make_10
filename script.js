// Store game state in variables
let name = "Guest";
let score = 0;
let digits = [];
let translations = {
    en: {
        welcome: "Welcome to Number Puzzle!",
        enter_name: "Enter your name",
        player: "Player",
        score: "Score",
        start_game: "Start Game",
        change_language: "Change Language",
        create_expression: "Create an expression that equals 10 using these digits:",
        digits: "Digits",
        submit: "Submit",
        next_puzzle: "Next Puzzle",
        name_placeholder: "Enter your name",
        expression_placeholder: "Enter your expression",
        congratulations: "Congratulations, you solved the puzzle!",
        incorrect_result: "The result is not correct. It was {{ result }}.",
        invalid_expression: "The expression '{{ expression }}' is invalid.",
        invalid_digits: "The expression uses invalid digits.",
        greeting: "Welcome, {{ name }}!"
    },
    cz: {
        welcome: "Vítejte v číselné hádance!",
        enter_name: "Zadejte své jméno",
        player: "Hráč",
        score: "Skóre",
        start_game: "Začít hru",
        change_language: "Změnit jazyk",
        create_expression: "Vytvořte výraz, který se rovná 10 pomocí těchto číslic:",
        digits: "Číslice",
        submit: "Odeslat",
        next_puzzle: "Další hádanka",
        name_placeholder: "Zadejte své jméno",
        expression_placeholder: "Zadejte svůj výraz",
        congratulations: "Gratulujeme, vyřešili jste hádanku!",
        incorrect_result: "Výsledek není správný. Byl {{ result }}.",
        invalid_expression: "Výraz '{{ expression }}' není platný.",
        invalid_digits: "Výraz používá neplatné číslice.",
        greeting: "Vítejte, {{ name }}!"
    },
    uk: {
        welcome: "Ласкаво просимо до числової головоломки!",
        enter_name: "Введіть своє ім'я",
        player: "Гравець",
        score: "Рахунок",
        start_game: "Почати гру",
        change_language: "Змінити мову",
        create_expression: "Створіть вираз, що дорівнює 10, використовуючи ці цифри:",
        digits: "Цифри",
        submit: "Підтвердити",
        next_puzzle: "Наступна головоломка",
        name_placeholder: "Введіть своє ім'я",
        expression_placeholder: "Введіть свій вираз",
        congratulations: "Вітаємо, ви розв'язали головоломку!",
        incorrect_result: "Результат неправильний. Було {{ result }}.",
        invalid_expression: "Вираз '{{ expression }}' недійсний.",
        invalid_digits: "Вираз використовує недійсні цифри.",
        greeting: "Ласкаво просимо, {{ name }}!"
    }
};
let currentLanguage = "en";

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
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

    // Function to update all translations on the page
    function updatePageLanguage() {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLanguage][key]) {
                if (element.tagName === 'INPUT') {
                    element.placeholder = translations[currentLanguage][key];
                } else {
                    element.textContent = translations[currentLanguage][key];
                }
            }
        });

        // Update greeting if it exists
        if (name && greetingP) {
            greetingP.textContent = translations[currentLanguage].greeting.replace("{{ name }}", name);
        }

        // Update any existing message
        if (messageP.textContent) {
            // Reset message to trigger re-translation if needed
            const currentMessage = messageP.textContent;
            messageP.textContent = currentMessage;
        }
    }

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
        greetingP.textContent = translations[currentLanguage].greeting.replace("{{ name }}", name);
        document.getElementById('name-form').style.display = "none";
        document.getElementById('user-info').style.display = "block";
        document.getElementById('puzzle').style.display = "block";
        generateDigits();
    });

    // Change language
    changeLanguageButton.addEventListener('click', () => {
        currentLanguage = languageSelect.value;
        updatePageLanguage();
    });

    // Initialize game
    function initGame() {
        document.getElementById('name-form').style.display = "block";
        document.getElementById('user-info').style.display = "none";
        document.getElementById('puzzle').style.display = "none";
        updatePageLanguage(); // Initial translation
    }

    initGame();
});

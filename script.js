// Translations object containing text in English, Czech, and Ukrainian
const translations = {
    en: {
        greeting: "Welcome to the Math Puzzle Game!",
        enterName: "Enter your name",
        setName: "Set Name",
        score: "Your score: ",
        selectLanguage: "Select Language:",
        changeLanguage: "Change Language",
        puzzlePrompt: "Use these digits: ",
        expressionPrompt: "Enter your expression to make 10",
        submitButton: "Submit",
        nextButton: "Next Puzzle",
        helloUser: "Hello",
    },
    cz: {
        greeting: "Vítejte v matematické hře!",
        enterName: "Zadejte své jméno",
        setName: "Nastavit jméno",
        score: "Vaše skóre: ",
        selectLanguage: "Vyberte jazyk:",
        changeLanguage: "Změnit jazyk",
        puzzlePrompt: "Použijte tyto číslice: ",
        expressionPrompt: "Zadejte svůj výraz na 10",
        submitButton: "Odeslat",
        nextButton: "Další hádanka",
        helloUser: "Ahoj",
    },
    uk: {
        greeting: "Ласкаво просимо до гри-головоломки з математики!",
        enterName: "Введіть своє ім'я",
        setName: "Встановити ім'я",
        score: "Ваш рахунок: ",
        selectLanguage: "Виберіть мову:",
        changeLanguage: "Змінити мову",
        puzzlePrompt: "Використовуйте ці цифри: ",
        expressionPrompt: "Введіть свій вираз на 10",
        submitButton: "Надіслати",
        nextButton: "Наступна головоломка",
        helloUser: "Привіт",
    }
};

// Function to update the text based on the selected language
function updateLanguage(language) {
    document.getElementById('greeting').textContent = translations[language].greeting;
    document.getElementById('name-input').placeholder = translations[language].enterName;
    document.getElementById('set-name').textContent = translations[language].setName;
    document.getElementById('user-info').querySelector('p').innerHTML = translations[language].helloUser + ", <span id='user-name'>Guest</span>! " + translations[language].score + "<span id='score'>0</span>";
    document.getElementById('language-select').previousElementSibling.textContent = translations[language].selectLanguage;
    document.getElementById('change-language').textContent = translations[language].changeLanguage;
    document.getElementById('puzzle').querySelector('h2').textContent = translations[language].puzzlePrompt + " <span id='digits'></span>";
    document.getElementById('expression').placeholder = translations[language].expressionPrompt;
    document.getElementById('submit-button').textContent = translations[language].submitButton;
    document.getElementById('next-button').textContent = translations[language].nextButton;
}

// Event listener for language selection
window.onload = function() {
    updateLanguage('en');  // Default to English on page load

    document.getElementById('language-select').addEventListener('change', function() {
        const selectedLanguage = this.value;
        updateLanguage(selectedLanguage);
    });
};

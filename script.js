 let words = [];

    function saveWord() {
      const wordInput = document.getElementById("wordInput");
      const word = wordInput.value.trim();
      
      if (word !== "") {
        words.push(word);
        wordInput.value = "";
        displaySavedWords();
      }
    }
    
    function displaySavedWords() {
      const savedWordsDiv = document.getElementById("savedWords");
      savedWordsDiv.innerHTML = "Added Word Is: ";
      
      words.forEach(function(word) {
        const span = document.createElement("span");
        span.textContent = word;
        savedWordsDiv.appendChild(span);
      });
    }

    function generatePassword() {
      const passwordInput = document.getElementById("password");
      
      if (words.length === 0) {
        passwordInput.value = "No words saved";
        return;
      }
      
      const includeSmallLetters = document.getElementById("smallLetters").checked;
      const includeCapitalLetters = document.getElementById("capitalLetters").checked;
      const includeNumbers = document.getElementById("numbers").checked;
      const includeSymbols = document.getElementById("symbols").checked;
      
      const password = generateSecurePassword(includeSmallLetters, includeCapitalLetters, includeNumbers, includeSymbols);
      passwordInput.value = password;
    }
    
    function generateSecurePassword(includeSmallLetters, includeCapitalLetters, includeNumbers, includeSymbols) {
      let characters = "";
      
      if (includeSmallLetters) {
        characters += "abcdefghijklmnopqrstuvwxyz";
      }
      
      if (includeCapitalLetters) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      
      if (includeNumbers) {
        characters += "1234567890";
      }
      
      if (includeSymbols) {
        characters += "!@#$%^&*";
      }
      
      const passwordLength = getRandomNumber(8, 16);
      let password = "";
      
      for (let i = 0; i < passwordLength; i++) {
        const randomCharacter = characters.charAt(getRandomNumber(0, characters.length - 1));
        password += randomCharacter;
      }
      
      const randomIndex = getRandomNumber(0, words.length - 1);
      const randomWord = words[randomIndex];
      
      const insertIndex = getRandomNumber(0, password.length - 1);
      password = password.slice(0, insertIndex) + randomWord + password.slice(insertIndex);
      
      return password;
    }
    
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function copyPassword() {
      const passwordInput = document.getElementById("password");
      passwordInput.select();
      document.execCommand("copy");
      alert("Password copied to clipboard!");
    }


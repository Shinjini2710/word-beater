    window.addEventListener('load', init);
    // Available Levels
    const levels = {
      easy: 10,
      medium: 9,
      hard: 6
    };
    
    // To change level
    const currentLevel = levels.easy;

    let time = currentLevel;
    let score = 0;
    let isPlaying;


    const wordInput = document.querySelector('#word-input');
    const currentWord = document.querySelector('#current-word');
    const scoreDisplay = document.querySelector('#score');
    const timeDisplay = document.querySelector('#time');
    const message = document.querySelector('#message');
    const seconds = document.querySelector('#seconds');
    const highscoreDisplay = document.querySelector('#highscore');

    const words = [
      'hat',
      'river',
      'lucky',
      'statue',
      'generate',
      'stubborn',
      'cocktail',
      'runaway',
      'joke',
      'developer',
      'establishment',
      'hero',
      'javascript',
      'nutrition',
      'revolver',
      'echo',
      'siblings',
      'investigate',
      'horrendous',
      'symptom',
      'laughter',
      'magic',
      'master',
      'space',
      'definition'
    ];

  
    function init() {
      // Show number of seconds
      seconds.innerHTML = currentLevel;
      // Load word from array
      showWord(words);
      // Start matching on word input
      wordInput.addEventListener('input', startMatch);
      // Call countdown every second
      setInterval(countdown, 1000);
      // Check game status
      setInterval(checkStatus, 50);
    }

    
    function startMatch() {
      if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
      }
      // Highscore based on score value 
      if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
        sessionStorage['highscore'] = score;
      }

      // Prevent display of High Score: -1
      if (sessionStorage['highscore'] >= 0) {
        highscoreDisplay.innerHTML = sessionStorage['highscore'];
      }

      // If score is -1, display 0
      if (score === -1) {
        scoreDisplay.innerHTML = 0;
      } else {
        scoreDisplay.innerHTML = score;
      }
    }

    // Match currentWord to wordInput
    function matchWords() {
      if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
      } else {
        message.innerHTML = '';
        return false;

      }
    }

    // Pick & show random word
    function showWord(words) {
      // Generate random array index 
      const randIndex = Math.floor(Math.random() * words.length);
      currentWord.innerHTML = words[randIndex];
    }


    function countdown() {
      if (time > 0) {
        time--;
      } else if (time === 0) {
        isPlaying = false;
      }
      timeDisplay.innerHTML = time;
    }

    // Check game status
    function checkStatus() {
      if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        wordInput.value = '';
        wordInput.placeholder = "";
        wordInput.disabled = true; //input gets disabled

      }
    }
let moveSpeed = 3,
    gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

let birdProps = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let scoreValue = document.querySelector('.scoreValue');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.scoreTitle');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && gameState !== 'Play') {
        document.querySelectorAll('.pipeSprite').forEach((e) => {
            e.remove()
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        gameState = 'Play';
        message.innerHTML = '';
        scoreTitle.innerHTML = 'Score : ';
        scoreValue.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function gameOver() {
    gameState = 'End'; // Set the game state to "End"
    backgroundMusic.pause(); // Pause the music
    backgroundMusic.currentTime = 0; // Reset the music to the start

    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart'; // Show game-over message
    message.classList.add('messageStyle'); // Style the message
    img.style.display = 'none'; // Hide the bird
}

function play() {
    function move() {
        if (gameState !== 'Play') return;

        let pipeSprite = document.querySelectorAll('.pipeSprite');
        pipeSprite.forEach((element) => {
            let pipeSpriteProps = element.getBoundingClientRect();
            birdProps = bird.getBoundingClientRect();

            if (pipeSpriteProps.right <= 0) {
                element.remove();
            } else {
                if (
                    birdProps.left < pipeSpriteProps.left + pipeSpriteProps.width &&
                    birdProps.left + birdProps.width > pipeSpriteProps.left &&
                    birdProps.top < pipeSpriteProps.top + pipeSpriteProps.height &&
                    birdProps.top + birdProps.height > pipeSpriteProps.top
                ) {
                    gameOver();
                    // gameState = 'End';
                    // message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    // message.classList.add('messageStyle');
                    // img.style.display = 'none';
                    return;
                } else {
                    if (
                        pipeSpriteProps.right < birdProps.left &&
                        pipeSpriteProps.right + moveSpeed >= birdProps.left &&
                        element.increaseScore == '1'
                    ) {
                        // scoreValue.innerHTML = scoreValue.innerHTML + '1';
                        scoreValue.innerHTML = parseInt(scoreValue.innerHTML) + 1;
                    }
                    element.style.left = pipeSpriteProps.left - moveSpeed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity() {
        if (gameState !== 'Play') return;
        bird_dy = bird_dy + gravity;

        document.addEventListener('keydown', (e) => {
            if (e.key == 'ArrowUp' || e.key == ' ') {
                img.src = 'bird2.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key == 'ArrowUp' || e.key == ' ') {
                img.src = 'bird.png';
            }
        });

        if (birdProps.top <= 0 || birdProps.bottom >= background.bottom) {
            gameState = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = birdProps.top + bird_dy + 'px';
        birdProps = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipeSeparation = 0;
    let pipeGap = 35;

    function createPipe() {
        if (gameState !== 'Play') return;

        if (pipeSeparation > 115) {
            pipeSeparation = 0;
            let pipePosition = Math.floor(Math.random() * 43) + 8;

            let pipeSpriteInv = document.createElement('div');
            pipeSpriteInv.className = 'pipeSprite';
            pipeSpriteInv.style.top = pipePosition - 70 + 'vh';
            pipeSpriteInv.style.left = '100vw';

            document.body.appendChild(pipeSpriteInv);
            let pipeSprite = document.createElement('div');
            pipeSprite.className = 'pipeSprite';
            pipeSprite.style.top = pipePosition + pipeGap + 'vh';
            pipeSprite.style.left = '100vw';
            pipeSprite.increaseScore = '1';

            document.body.appendChild(pipeSprite);
        }
        pipeSeparation++;
        requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
}

let backgroundMusic = document.getElementById('backgroundMusic');

document.addEventListener('keydown', (e) =>{
    backgroundMusic.play();
    backgroundMusic.volume = 0.5;
});

if (gameState === 'End') {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; 
}
document.addEventListener('DOMContentLoaded', function() {
    const coinButton = document.getElementById('coinButton');
    const coinsDisplay = document.getElementById('coins');
    const rateDisplay = document.getElementById('rate');
    const upgradeMenuButton = document.getElementById('upgradeMenuButton');
    const upgradeMenu = document.getElementById('upgradeMenu');
    const upgradeButtons = document.querySelectorAll('.upgradeButton');

    let coins = parseInt(localStorage.getItem('coins')) || 0;
    let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
    let clickRate = parseInt(localStorage.getItem('clickRate')) || 1;
    let maxClicksPerSecond = parseInt(localStorage.getItem('maxClicksPerSecond')) || 5;
    let lastClickTime = 0;

    function updateDisplay() {
        coinsDisplay.textContent = coins;
        rateDisplay.textContent = `${maxClicksPerSecond} clicks/sec`;
    }

    function saveState() {
        localStorage.setItem('coins', coins);
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('clickRate', clickRate);
        localStorage.setItem('maxClicksPerSecond', maxClicksPerSecond);
    }

    function canClick() {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < 1000 / maxClicksPerSecond) {
            return false;
        }
        lastClickTime = currentTime;
        return true;
    }

    coinButton.addEventListener('click', () => {
        if (canClick()) {
            coins += clickValue;
            coinsDisplay.classList.add('animate');
            setTimeout(() => coinsDisplay.classList.remove('animate'), 500);
            updateDisplay();
            saveState();
        }
    });

    upgradeMenuButton.addEventListener('click', () => {
        upgradeMenu.style.display = upgradeMenu.style.display === 'none' ? 'block' : 'none';
    });

    upgradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upgradeType = button.dataset.upgrade;
            if (coins >= 1000) {
                coins -= 1000;
                if (upgradeType === 'rate') {
                    maxClicksPerSecond *= 2;
                } else if (upgradeType === 'value') {
                    clickValue *= 2;
                }
                updateDisplay();
                saveState();
            } else {
                alert('Not enough coins!');
            }
        });
    });

    updateDisplay();
});
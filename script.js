document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const proceedButton = document.getElementById('proceed-button');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('stimulus-video');
    const emojiReactions = document.querySelectorAll('.emoji');
    const nextButton = document.getElementById('next-button');
    const reactionData = [];

    startButton.addEventListener('click', () => {
        showScreen('instructions-screen');
    });

    proceedButton.addEventListener('click', () => {
        showScreen('video-screen');
        startVideo();
    });

    emojiReactions.forEach(emoji => {
        emoji.addEventListener('click', () => {
            const reaction = emoji.getAttribute('data-reaction');
            const timestamp = video.currentTime;
            reactionData.push({ reaction, timestamp });
            console.log('Reaction:', reaction, 'at', timestamp, 'seconds');
            emojiReactions.forEach(e => e.classList.remove('selected'));
            emoji.classList.add('selected');
        });
    });

    nextButton.addEventListener('click', () => {
        saveData(reactionData);
        stopVideo();
        showScreen('thank-you-screen');
        setTimeout(() => {
            alert('Experiment complete. Thank you!');
        }, 5000);
    });

    function showScreen(screenId) {
        document.querySelectorAll('#experiment-container > div').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }

    function startVideo() {
        requestFullscreen(document.documentElement);
        video.play();
    }

    function stopVideo() {
        video.pause();
        video.currentTime = 0;
    }

    function requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
    }

    function saveData(data) {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reaction_data.json';
        a.click();
        URL.revokeObjectURL(url);
    }
});

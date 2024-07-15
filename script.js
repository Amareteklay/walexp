document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('stimulus-video');
    const emojiReactions = document.querySelectorAll('.emoji');
    const nextButton = document.getElementById('next-button');
    let reactionData = [];

    emojiReactions.forEach(emoji => {
        emoji.addEventListener('click', () => {
            const reaction = emoji.getAttribute('data-reaction');
            const timestamp = video.currentTime;
            reactionData.push({ reaction, timestamp });
            console.log('Reaction:', reaction, 'at', timestamp, 'seconds');
            // Optional: Change emoji appearance to indicate selection
            emojiReactions.forEach(e => e.classList.remove('selected'));
            emoji.classList.add('selected');
        });
    });

    nextButton.addEventListener('click', () => {
        // Save data to a local file (for demo purposes, here we'll log it to console)
        saveData(reactionData);
        // Proceed to the next video or part of the experiment
        alert('Data saved. Proceeding to the next part.');
    });
});

function saveData(data) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reaction_data.json';
    a.click();
    URL.revokeObjectURL(url);
}

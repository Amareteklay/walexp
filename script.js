document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.getElementById('experiment-container');
    
    container.innerHTML = `
        <h1>Welcome to the Experiment</h1>
        <button id="start-button">Start</button>
    `;
    
    document.getElementById('start-button').addEventListener('click', () => {
        startExperiment();
    });
});

function startExperiment() {
    const container = document.getElementById('experiment-container');
    container.innerHTML = `
        <p>Experiment is running...</p>
        <!-- Add your experiment logic here -->
    `;
}

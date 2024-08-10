let choice;
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('games');
    const overlay = document.getElementById('overlay');
    const formContainer = document.getElementById('form-container');
    const formFields = document.getElementById('form-fields');
    const cancelButton = document.getElementById('cancel-btn');

    table.addEventListener('click', event => {
        if (event.target.tagName !== 'TD') return;
        const row = event.target.parentElement;
        if (row.getAttribute('admin') === 'false') return;

        const justMap = confirm('Would you like to just update the map? Click \'OK\' to modify just the map, and click \'Cancel\' to do all.');
        
        const game = JSON.parse(row.getAttribute('game'));

        formFields.innerHTML = `
            <div>
                <input type="hidden" id="id" name="id" value="${game.id}">
                <input type="hidden" id="players" name="players" value="${game.players}">
                <input type="hidden" id="status" name="status" value="${game.status}">
            </div>
        `;

        if (justMap) {
            choice = 'map';
            document.getElementById('form-name').innerHTML = 'Input Map';
            formFields.innerHTML += `
                <div>
                    <label for="map">Map</label>
                    <input type="text" id="map" name="map" required autofocus>
                </div>
            `;
        } else {
            choice = 'full';
            document.getElementById('form-name').innerHTML = 'Input Results';
            formFields.innerHTML += `
                <div>
                    <label for="map">Map</label>
                    <input type="text" id="map" name="map" value=${game.map} required autofocus>

                    <label for="time">Time</label>
                    <input type="time" id="time" name="time" required>
                </div> 

                <div class="form-column">
                    <h3>Team 1</h3>
                    <h4>${game.players[0].join(', ')}</h4>

                    <label for="colour1">Colours</label>
                    <select name="colour1" id="colour1">
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select>

                    <label for="score1">Score</label>
                    <input type="number" id="score1" name="score1" min="0" max="5" required>

                    <label for="damage1">Damage</label>
                    <input type="number" id="damage1" name="damage1" min="0" required>
                </div>
                <div class="form-column">
                    <h3>Team 2</h3>
                    <h4>${game.players[1].join(', ')}</h4>

                    <label for="colour2">Colours</label>
                    <select name="colour2" id="colour2">
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select>

                    <label for="score2">Score</label>
                    <input type="number" id="score2" name="score2" min="0" max="5" required>

                    <label for="damage2">Damage</label>
                    <input type="number" id="damage2" name="damage2" min="0" required>
                </div>
            `;
        }

        overlay.style.display = 'flex';
        formContainer.classList.remove('hidden');
    });

    cancelButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        formContainer.classList.add('hidden');
    });
});
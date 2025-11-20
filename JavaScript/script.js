   // Cerrar al hacer click en enlace
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.main-nav').classList.remove('open');
        });
    });

    // Formulario y CRUD
    const form = document.getElementById('record-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validateForm()) {
            recordsManager.addRecord({
                player: document.getElementById('player-name').value.trim(),
                game: document.getElementById('game-title').value.trim(),
                score: parseInt(document.getElementById('player-score').value),
                date: document.getElementById('record-date').value
            });
            form.reset();
            alert('RECORD SUBMITTED!');
        }
    });

    function validateForm() {
        // Tu validación JS aquí (igual que antes)
        return true;
    }

    


document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  hamburger.addEventListener('click', function () {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
  })
});

let records = JSON.parse(localStorage.getItem('twinGalaxiesRecords')) || [];
let editingIndex = null;

// Add some mockup data, in case there's none
if (records.length === 0) {
  records = [
    {
      playerName: 'Billy Mitchell',
      gameTitle: 'Pac-Man',
      score: 333340,
      date: '1999-07-05'
    },
    {
      playerName: 'Steve Wiebe',
      gameTitle: 'Donkey Kong',
      score: 1200000,
      date: '2007-08-15'
    },
    {
      playerName: 'Todd Rogers',
      gameTitle: 'Dragster',
      score: 5.51,
      date: '1982-01-20'
    }
  ];
  localStorage.setItem('twinGalaxiesRecords', JSON.stringify(records));
}

// [Read] Display all records
function displayRecords() {
  let tbody = document.getElementById('records-tbody');
  if (!tbody) {
    console.error('Element #records-tbody not found.');
    return;
  }
  tbody.innerHTML = '';
  records.forEach((record, index) => {
    let row = tbody.insertRow();
    row.innerHTML = `
      <td>${record.playerName}</td>
      <td>${record.gameTitle}</td>
      <td>${record.score}</td>
      <td>${record.date}</td>
      <td>
        <button class="btn-edit" onclick="editRecord(${index})">EDIT</button>
        <button class="btn-delete" onclick="deleteRecord(${index})">DELETE</button>
      </td>
    `;
  });
  console.log('Updated records with', records.length, 'new ones.');
}

// Validate form
function isFormValid() {
  let valid = true;
  let errors = {
    name: document.getElementById('error-name'),
    game: document.getElementById('error-game'),
    score: document.getElementById('error-score'),
    date: document.getElementById('error-date')
  };

  // Clear previous errors
  Object.values(errors).forEach(error => error.textContent = '');

  // Player's name
  let name = document.getElementById('player-name').value.trim();
  if (name === '') {
    errors.name.textContent = 'Player name is required.';
    valid = false;
  } else if (name.length < 2) {
    errors.name.textContent = 'Player name must be at least 2 characters.';
    valid = false;
  }

  // Game's title
  let game = document.getElementById('game-title').value.trim();
  if (game === '') {
    errors.game.textContent = 'Game title is required.';
    valid = false;
  } else if (game.length < 2) {
    errors.game.textContent = 'Game title must be at least 2 characters.';
    valid = false;
  }

  // Score
  let scoreInput = document.getElementById('player-score').value;
  let score = parseFloat(scoreInput);
  if (isNaN(score) || score <= 0) {
    errors.score.textContent = 'Score must be a positive number.';
    valid = false;
  }

  // Date
  let dateInput = document.getElementById('record-date').value;
  if (dateInput === '') {
    errors.date.textContent = 'Date is required.';
    valid = false;
  } else {
    let date = new Date(dateInput);
    let today = new Date();
    if (date > today) {
      errors.date.textContent = 'Date cannot be in the future.';
      valid = false;
    }
  }

  return valid;
}

// [Create/Update] Create or update a record.
function storeRecord() {
  if (!isFormValid()) {
    return;
  }

  let r = {
    playerName: document.getElementById('player-name').value.trim(),
    gameTitle: document.getElementById('game-title').value.trim(),
    score: parseFloat(document.getElementById('player-score').value),
    date: document.getElementById('record-date').value
  };

  if (editingIndex === null) {
    // Create
    records.push(r);
  } else {
    // Update
    records[editingIndex] = r;
    editingIndex = null;
    document.getElementById('btn-submit').textContent = 'SUBMIT';
    document.getElementById('btn-cancel').style.display = 'none';
  }

  localStorage.setItem('twinGalaxiesRecords', JSON.stringify(records));
  document.getElementById('record-form').reset();
  displayRecords();
}

// [Update setup] Prepares the form for updating a record
function editRecord(index) {
  let record = records[index];
  editingIndex = index;
  document.getElementById('player-name').value = record.playerName;
  document.getElementById('game-title').value = record.gameTitle;
  document.getElementById('player-score').value = record.score;
  document.getElementById('record-date').value = record.date;
  document.getElementById('btn-submit').textContent = 'UPDATE';
  document.getElementById('btn-cancel').style.display = 'block';
}

// Cancel edit
function cancelEdit() {
  document.getElementById('record-form').reset();
  editingIndex = null;
  document.getElementById('btn-submit').textContent = 'SUBMIT';
  document.getElementById('btn-cancel').style.display = 'none';

  // Clear errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

// [Delete] Deletes an existing record
function deleteRecord(index) {
  if (confirm('Are you sure you want to delete this record?')) {
    records.splice(index, 1);
    localStorage.setItem('twinGalaxiesRecords', JSON.stringify(records));
    displayRecords();
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('record-form').addEventListener('submit', function (e) {
    e.preventDefault();
    storeRecord();
  });

  document.getElementById('btn-cancel').addEventListener('click', cancelEdit);

  // Hide cancel button & display records
  document.getElementById('btn-cancel').style.display = 'none';
  displayRecords();
});
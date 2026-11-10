let modal = document.getElementById('reservationModal');
let openBtn = document.getElementById('openModalBtn');
let closeBtn = document.getElementById('closeModalBtn');

// Open Book TAble Modal
openBtn.onclick = function() {
  modal.className = modal.className.replace(" hidden", "");
};

closeBtn.onclick = function() {
  if (modal.className.indexOf("hidden") === -1) {
    modal.className = modal.className + " hidden";
  }
};

// Close the Book Table modal when clicking outside of it
modal.onclick = function(event) {
  if (event.target === modal && modal.className.indexOf("hidden") === -1) {
    modal.className = modal.className + " hidden";
  }
};

// Party Size button functionality
let sizeButtons = document.getElementsByClassName('size-btn');

for (let i = 0; i < sizeButtons.length; i++) {
  sizeButtons[i].onclick = function() {
    for (let j = 0; j < sizeButtons.length; j++) {
      sizeButtons[j].className = sizeButtons[j].className.replace(" active", "");
    }
    this.className = this.className + " active";
  };
}

// Simulated Database for the options of time slots based on the selected date
const dummyDatabase = {
  "2026-11-09": [
    { time: "6:00 PM", available: false },
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: false },
    { time: "7:30 PM", available: false },
    { time: "8:00 PM", available: true },
    { time: "8:30 PM", available: true }
  ],
  "2026-11-10": [
    { time: "6:00 PM", available: true },
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: false },
    { time: "7:30 PM", available: true },
    { time: "8:00 PM", available: false },
    { time: "8:30 PM", available: false }
  ],
  "default": [
    { time: "6:00 PM", available: true },
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: true },
    { time: "7:30 PM", available: true },
    { time: "8:00 PM", available: true },
    { time: "8:30 PM", available: true }
  ]
};

// Show time slots based on the selected date given its on the database
function renderTimeSlots(dateString) {
  let timeGrid = document.getElementById('timeGrid');
  let times = dummyDatabase[dateString];
  
  if (!times) {
    times = dummyDatabase["default"];
  }

  let htmlString = "";

  for (let i = 0; i < times.length; i++) {
    let slot = times[i];
    
    if (slot.available) {
      htmlString += "<button class='time-btn available' onclick='selectTime(this)'>" + slot.time + "</button>";
    } else {
      htmlString += "<button class='time-btn sold-out' disabled>" + slot.time + "</button>";
    }
  }

  timeGrid.innerHTML = htmlString;
}

function selectTime(clickedButton) {
  let timeButtons = document.getElementsByClassName('time-btn');
  for (let i = 0; i < timeButtons.length; i++) {
    timeButtons[i].className = timeButtons[i].className.replace(" active", "");
  }
  clickedButton.className = clickedButton.className + " active";
}

let dateInput = document.getElementById('date');
dateInput.onchange = function(event) {
  renderTimeSlots(event.target.value);
};


renderTimeSlots(dateInput.value);

// Alert Button (confirmation of the reservation)
document.getElementById('notifyBtn').onclick = function() {
  let date = document.getElementById('date').value;
  let activeSizeBtns = document.getElementsByClassName('size-btn active');
  let partySize = "";
  
  if (activeSizeBtns.length > 0) {
    partySize = activeSizeBtns[0].innerHTML;
  }

  alert("Prototype Alert: Added to the waitlist for a party of " + partySize + " on " + date + ".");
  modal.style.display = "none";
};
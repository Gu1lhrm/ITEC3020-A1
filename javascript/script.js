// Modal Toggle Logic
const modal = document.getElementById('reservationModal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');

openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Close modal when clicking on the dark background overlay
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// Party Size Selection
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sizeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Simulated Database (Mock Backend)
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

// Function to render time slots dynamically
function renderTimeSlots(dateString) {
  const timeGrid = document.getElementById('timeGrid');
  timeGrid.innerHTML = ''; // Clear existing times
  
  // Fetch data for the selected date, or use the completely sold-out default
  const times = dummyDatabase[dateString] || dummyDatabase["default"];
  
  times.forEach(slot => {
    const btn = document.createElement('button');
    btn.innerText = slot.time;
    
    if (slot.available) {
      btn.className = 'time-btn available';
      btn.addEventListener('click', () => {
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    } else {
      btn.className = 'time-btn sold-out';
      btn.disabled = true;
    }
    
    timeGrid.appendChild(btn);
  });
}

// Listen for date changes to update the UI
const dateInput = document.getElementById('date');
dateInput.addEventListener('change', (e) => {
  renderTimeSlots(e.target.value);
});

// Initial Render
renderTimeSlots(dateInput.value);

// Notify Button Action
document.getElementById('notifyBtn').addEventListener('click', () => {
  const date = document.getElementById('date').value;
  const partySize = document.querySelector('.size-btn.active').innerText;
  alert(`Prototype Alert: Added to the waitlist for a party of ${partySize} on ${date}.`);
  modal.classList.add('hidden'); // Close modal on completion
});
const input = document.getElementById("gratitude-input");
const saveBtn = document.getElementById("save-btn");
const entriesList = document.getElementById("entries-list");
const promptText = document.getElementById("prompt");
const moodSelect = document.getElementById("mood-select");

// Daily prompts
const prompts = [
  "Who made you smile today?",
  "What’s one simple joy you experienced?",
  "What memory are you grateful for?",
  "Name 3 things you love about your life today.",
  "What challenge are you grateful for facing?",
  "What moment today felt peaceful?",
  "What's one small win you're thankful for?"
];

// Load prompt on page load
window.onload = function () {
  loadEntries();
  const todayPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  promptText.textContent = `💡 Prompt: ${todayPrompt}`;
};

// Save entry
saveBtn.addEventListener("click", () => {
  const text = input.value.trim();
  const mood = moodSelect.value;
  if (text !== "") {
    const entry = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleDateString(),
      mood: mood
    };
    saveEntry(entry);
    displayEntry(entry);
    input.value = "";
    moodSelect.value = "😊";
  }
});

function saveEntry(entry) {
  const entries = JSON.parse(localStorage.getItem("gratitudeEntries")) || [];
  entries.push(entry);
  localStorage.setItem("gratitudeEntries", JSON.stringify(entries));
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("gratitudeEntries")) || [];
  entries.forEach(displayEntry);
}

function displayEntry(entry) {
  const note = document.createElement("div");
  note.className = "note-card";

  const mood = document.createElement("span");
  mood.textContent = `${entry.mood} `;
  mood.style.fontSize = "1.2rem";
  mood.style.display = "block";

  const p = document.createElement("p");
  p.textContent = `${entry.text}`;

  const small = document.createElement("small");
  small.textContent = `🗓️ ${entry.date}`;
  small.style.color = "#888";

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => deleteEntry(entry.id, note);

  note.appendChild(delBtn);
  note.appendChild(mood);
  note.appendChild(p);
  note.appendChild(small);
  entriesList.prepend(note);
}

function deleteEntry(id, noteElement) {
  let entries = JSON.parse(localStorage.getItem("gratitudeEntries")) || [];
  entries = entries.filter((entry) => entry.id !== id);
  localStorage.setItem("gratitudeEntries", JSON.stringify(entries));
  noteElement.remove();
}

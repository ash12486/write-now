// Select elements from the DOM
const noteTitle = document.querySelector("#note-title");
const noteText = document.querySelector("#note-text");
const saveButton = document.querySelector("#save-button");
const noteList = document.querySelector("#note-list");
const writeButton = document.querySelector("#write-button");

// Initialize an empty notes array
let notes = [];

// Function to render the list of notes
function renderNotes() {
  // Clear out any existing notes in the list
  noteList.innerHTML = "";

  // Create a new list item for each note in the notes array
  notes.forEach(function(note, index) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.setAttribute("data-index", index);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = note.title;

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.textContent = note.text;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "float-right");
    deleteButton.setAttribute("data-index", index);
    deleteButton.textContent = "X";

    listItem.appendChild(titleDiv);
    listItem.appendChild(textDiv);
    listItem.appendChild(deleteButton);

    noteList.appendChild(listItem);
  });
}

// Function to save the note to the notes array
function saveNote() {
  if (noteTitle.value === "" || noteText.value === "") {
    alert("Please enter a note title and text.");
    return;
  }

  const note = {
    title: noteTitle.value,
    text: noteText.value
  };

  notes.push(note);

  // Clear out the note title and text fields
  noteTitle.value = "";
  noteText.value = "";

  // Re-render the list of notes
  renderNotes();
}

// Function to delete a note from the notes array
function deleteNote(index) {
  notes.splice(index, 1);

  // Re-render the list of notes
  renderNotes();
}

// Event listeners
saveButton.addEventListener("click", saveNote);

noteList.addEventListener("click", function(event) {
  if (event.target.matches("button")) {
    const index = event.target.getAttribute("data-index");
    deleteNote(index);
  }
});

writeButton.addEventListener("click", function() {
  noteTitle.value = "";
  noteText.value = "";
});

// Save notes to localStorage
function saveNotesToStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  
  // Get notes from localStorage
  function getNotesFromStorage() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    return notes || []; // Return an empty array if no notes are found
  }
  
  // Add event listener to save button in index.html
  saveButton.addEventListener('click', function() {
    // Get the notes from localStorage
    const notes = getNotesFromStorage();
  
    // Add the new note to the notes array
    const newNote = {
      title: noteTitle.value,
      text: noteText.value
    };
    notes.push(newNote);
  
    // Save the updated notes array to localStorage
    saveNotesToStorage(notes);
  });
  
  // Render notes in notes.html
  const notes = getNotesFromStorage();
  renderNotes(notes);
  

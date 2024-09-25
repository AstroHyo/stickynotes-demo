import "../style.css";

import NotesWall from "./notesWall";

class StickyNotesApp {
  #notesWall;
  #notesWallElement;
  #inputNewNote;
  #editNote;
  #removeNote;

  constructor() {
    this.#notesWall = new NotesWall();
    this.#notesWallElement = document.getElementById("notes-wall");
    this.#inputNewNote = document.getElementById("new-note");
    this.#editNote = document.getElementsByClassName("note");
    this.#removeNote = document.getElementsByClassName("delete-btn");

    this.#inputNewNote.addEventListener(
      "keydown",
      this.#handleKeyDownToCreateNewNote,
    );

    document.addEventListener("DOMContentLoaded", this.#renderNotes.bind(this));
  }

  // Helper Function to create note text element
  #createNoteText(note) {
    const noteText = document.createElement("div");
    noteText.id = `note-text-${note.id}`;
    noteText.classList.add("p-4", "note-text");
    noteText.innerText = note.text;
    return noteText;
  }

  // Helper Function to create note edit textarea element
  #createNoteTextarea(note) {
    const noteEdit = document.createElement("textarea");
    noteEdit.classList.add("absolute", "top-0", "left-0", "hidden", "w-full", "h-full", "p-4", "transition-transform", "transform", "bg-yellow-300", "shadow-xl", "resize-none", "outline-rose-700", "outline-offset-0", "note-edit", "note", "hover:scale-105");
    noteEdit.innerText = note.text;
    return noteEdit;
  }

  // Helper Function to create a remove button
  #createNoteRemoveButton() {
    const noteRemoveButton = document.createElement("button");
    noteRemoveButton.classList.add("absolute", "w-5", "h-5", "leading-5", "text-center", "transition-opacity", "opacity-0", "cursor-pointer", "delete-btn", "top-1", "right-1", "hover:opacity-100");
    noteRemoveButton.innerText = "🗑";
    return noteRemoveButton;
  }

  // Helper Function to create a note item
  #createNoteItem(note) {
    const noteItem = document.createElement("div");
    noteItem.classList.add("relative", "w-40", "h-40", "p-0", "m-2", "overflow-y-auto", "transition-transform", "transform", "bg-yellow-200", "shadow-lg", "note", "hover:scale-105");
    const noteRemoveButton = this.#createNoteRemoveButton();
    const noteText = this.#createNoteText(note);
    const noteEdit = this.#createNoteTextarea(note);
    noteItem.append(noteRemoveButton, noteText, noteEdit);
    return noteItem;
  }

  // Function to render the notes
  #renderNotes() {
    this.#notesWallElement.innerHTML = "";
    const notesElements = this.#notesWall
      .getNotes()
      .map(this.#createNoteItem.bind(this));
    this.#notesWallElement.append(...notesElements);
  }

  // Event handler to create a new note item
  #handleKeyDownToCreateNewNote = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const noteText = event.target.value.trim();
      if (noteText) {
        this.#notesWall.addNote(noteText);
        event.target.value = ""; // Clear the input
        this.#renderNotes();
      }
    } else if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const noteText = event.target;
      const cursorPosition = noteText.selectionStart;
      noteText.value = 
        noteText.value.substring(0, cursorPosition) + 
        "\n" + 
        noteText.value.substring(cursorPosition);
      noteText.selectionStart = noteText.selectionEnd = cursorPosition + 1;
    }
  }
}


new StickyNotesApp();
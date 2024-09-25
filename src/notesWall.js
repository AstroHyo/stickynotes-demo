import Note from "./note.js";

class NotesWall {
  #notes = [];

  addNote(text) {
    this.#notes.push(new Note(text));
  }

  getNotes() {
    return this.#notes;
  }

  removeNote(id) {
    this.#notes.splice(id);
  }

  editNote(id, newText) {
    this.#notes[id].text(newText);
  }
}

export default NotesWall;
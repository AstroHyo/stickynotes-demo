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
    for(let i = 0; i < this.#notes.length; i++) {
      if (this.#notes[i].id === id) {
        this.#notes.splice(i, 1);
      }
    }
  }

  editNote(id, newText) {
    const note = this.#notes.find(note => note.id === id);
    if (note) {
      note.text = newText;
    }
  }
}

export default NotesWall;
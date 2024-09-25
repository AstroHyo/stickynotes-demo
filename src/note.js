class Note {
  static #nextId = 1;
  #id;
  #text;

  constructor(text) {
    this.#text = text;
    this.#id = Note.#nextId++;
  }

  get id() {
    return this.#id;
  }

  get text() {
    return this.#text;
  }

  set text(newText) {
    this.#text = newText;
  }
}

export default Note;

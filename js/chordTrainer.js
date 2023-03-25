class ChordTrainer {
    constructor() {
        this.chordNotes = {
                    "C": ["C", "E", "G"],
                    "G": ["G", "B", "D"],
                    "D": ["D", "F#", "A"],
                    "A": ["A", "C#", "E"],
                    "E": ["E", "G#", "B"],
                    "B": ["B", "D#", "F#"],
                    "F#": ["F#", "A#", "C#"],
                    "C#": ["C#", "F", "G#"],
                    "a": ["A", "C", "E"],
                    "e": ["E", "G", "B"],
                    "b": ["B", "D", "F#"],
                    "f#": ["F#", "A", "C#"],
                    "c#": ["C#", "E", "G#"],
                    "g#": ["G#", "B", "D#"],
                    "d#": ["D#", "F#", "A#"],
                    "a#": ["A#", "C#", "F"],
                    "F": ["F", "A", "C"],
                    "Bb": ["Bb", "D", "F"],
                    "Eb": ["Eb", "G", "Bb"],
                    "Ab": ["Ab", "C", "Eb"],
                    "Db": ["Db", "F", "Ab"],
                    "Gb": ["Gb", "Bb", "Db"],
                    "Cb": ["Cb", "Eb", "Gb"],
                    "g": ["G", "Bb", "D"],
                    "c": ["C", "Eb", "G"],
                    "f": ["F", "Ab", "C"],
                    "bb": ["Bb", "Db", "F"],
                    "eb": ["Eb", "Gb", "Bb"],
                    "ab": ["Ab", "Cb", "Eb"],
                    "db": ["Db", "E", "Ab"],
        };
    }

    getChordNotes(key) {
        return this.chordNotes[key];
    }

    getRandomKey() {
        const keys = Object.keys(this.chordNotes);
        return keys[Math.floor(Math.random() * keys.length)];
    }

    getRandomBaseKey() {
        const choices = [];
        for (const key in this.chordNotes) {
            if (key.length === 1) {
                choices.push(key);
            }
        }
        return choices[Math.floor(Math.random() * choices.length)];
    }

    getKeyOfChord(chord) {
        for (const key in this.chordNotes) {
            if (JSON.stringify(this.chordNotes[key]) === JSON.stringify(chord)) {
                return key;
            }
        }
    }

    matchChords(chord) {
        const matchingChords = {};
        for (const key in this.chordNotes) {
            const commonElements = chord.filter((note) => this.chordNotes[key].includes(note));
            if (
                commonElements.length >= 1 &&
                this.getKeyOfChord(chord).toLowerCase() !== key.toLowerCase()
            ) {
                matchingChords[key] = commonElements.length;
            }
        }
        return matchingChords;
    }

    getRandomKeyContainingKey(chord) {
        const matchingChords = this.matchChords(chord);
        const keys = Object.keys(matchingChords);
        const weights = Object.values(matchingChords);
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const randomWeight = Math.random() * totalWeight;

        let weightSum = 0;
        for (let i = 0; i < keys.length; i++) {
            weightSum += weights[i];
            if (randomWeight <= weightSum) {
                return keys[i];
            }
        }
    }

    getRandomKeyContainingKeyFromKey(key) {
        const chord = this.getChordNotes(key);
        return this.getRandomKeyContainingKey(chord);
    }
}

const p = new ChordTrainer();
lastKey = p.getRandomBaseKey()
timeout = 5000

let current = document.getElementById("current");
let currentNotes = document.getElementById("currentnotes");
let next = document.getElementById("next");
let nextNotes = document.getElementById("nextnotes");

function updateFields() {
    current.innerHTML = lastKey;
    currentNotes.innerHTML = p.getChordNotes(lastKey);
    const nextKey = p.getRandomKeyContainingKeyFromKey(lastKey);
    next.innerHTML = nextKey
    nextNotes.innerHTML = p.getChordNotes(nextKey)
    lastKey = nextKey
}

id = null;

function setTimeout() {
    clearInterval(id);
    updateFields();
    timeout = document.getElementById("intervalInput").value
    id = setInterval(updateFields, timeout)
}

var button = document.getElementById("setInterval");
button.addEventListener("click", setTimeout);

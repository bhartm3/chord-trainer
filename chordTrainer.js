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
                let weight
                if (commonElements.length === 2) {
                    weight = 15
                } else {
                    weight = 1
                }
                matchingChords[key] = weight;
            }
        }
        console.log(matchingChords)
        return matchingChords;
    }

    getRandomKeyContainingKey(chord) {
        const matchingChords = this.matchChords(chord);
        const keys = Object.keys(matchingChords);
        const weights = Object.values(matchingChords);
        return this.weighted_random(keys, weights)
    }

    weighted_random(items, weights) {
        var i;

        for (i = 1; i < weights.length; i++)
            weights[i] += weights[i - 1];

        var random = Math.random() * weights[weights.length - 1];

        for (i = 0; i < weights.length; i++)
            if (weights[i] > random)
                break;

        return items[i];
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

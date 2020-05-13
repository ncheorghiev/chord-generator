import {
    triad,
    seventh,
    chordPositions,
    technicalNames,
    stepPatterns
} from "./utils/constants/index.js";

import { createNotesForKey } from "./utils/create-notes.js";
import { createChordsForNoteInKeyNotes, getChordName } from "./utils/chords.js";

const shiftArray = (arr, direction, n) => {
    var times = n > arr.length ? n % arr.length : n;
    return arr.concat(arr.splice(0, direction > 0 ? arr.length - times : times));
};

const generateChordsForKey = (key = "C") => {
    const notes = createNotesForKey(key);

    const keyChords = [];

    notes.map((note, index) => {
        const chordNotesTriad = createChordsForNoteInKeyNotes(note, notes, triad);
        console.log(chordNotesTriad);
        const chordNotesSeventh = createChordsForNoteInKeyNotes(note, notes, seventh);

        const chordType = getChordName(chordNotesTriad);
        let chordPositionsString = chordPositions[index];
        let chordTechnicalName = technicalNames[index];

        if (chordType !== "Major") {
            chordPositionsString = chordPositionsString.toLowerCase();
        }
        if (chordType === "diminished") {
            chordPositionsString = `${chordPositionsString}º`;
        }

        keyChords.push({
            rootNote: note,
            baseName: `${note} ${chordType}`, // Name it on the triad name for now
            chordPosition: chordPositionsString,
            technicalName: chordTechnicalName,
            chords: {
                triad: {
                    name: `${note} ${chordType}`,
                    notes: chordNotesTriad
                },
                seventh: {
                    name: `${note} ${chordType} seventh`,
                    notes: chordNotesSeventh
                },
                inversions: [
                    {
                        thirdInversions: [
                            // TODO: Create dynamic functions of inversions!
                        ]
                    }
                ]
            }
        });
    });
    return keyChords;
};

console.log(generateChordsForKey("C"));

console.log(stepPatterns);

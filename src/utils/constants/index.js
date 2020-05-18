export const allNotes = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

export const triad = [3, 5];
export const seventh = [3, 5, 7];

export const chordPositions = ["I", "II", "III", "IV", "V", "VI", "VII", "I"];

export const technicalNames = [
    "Tonic",
    "Supertonic",
    "Mediant",
    "Subdominant",
    "Dominant",
    "Submediant",
    "Leading note"
];

export const majorPattern = [0, 2, 2, 1, 2, 2, 2, 1];

export const createKeyStepsFromPattern = (pattern, keyPattern = majorPattern) => {
    let steps = [];
    pattern.map((item) => {
        const additional = Math.floor(item / majorPattern.length);

        item = item % majorPattern.length;

        if (item < 0) {
            item = majorPattern.length + item;
        }

        const additionalSteps = keyPattern.reduce((a, b) => a + b) * additional;

        const stepsNeededForItem = keyPattern.reduce((a, b, i) => (i < item ? a + b : a));
        steps.push({
            steps: stepsNeededForItem + additionalSteps
        });
    });

    return steps;
};

export const stepPatterns = {
    triads: {
        root: createKeyStepsFromPattern([1, 3, 5]),
        firstInversion: createKeyStepsFromPattern([3, 5, 8]),
        secondInversion: createKeyStepsFromPattern([5, 8, 11])
    },
    sevenths: {
        root: createKeyStepsFromPattern([1, 3, 5, 7]),
        firstInversion: createKeyStepsFromPattern([3, 5, 7, 8]),
        secondInversion: createKeyStepsFromPattern([5, 7, 8, 11]),
        thirdInversion: createKeyStepsFromPattern([7, 8, 11, 13])
    }
};

export const getNotesForSteps = (root, key, steps) => {
    const offset = allNotes.indexOf(root);
    const keyOffset = allNotes.indexOf(key);

    let shift = keyOffset - offset;

    while (shift >= 12) {
        shift -= 12;
    }

    while (shift < 0) {
        shift += 12;
    }

    let notes = [];

    steps.map((step) => {
        let cursor = shift + step.steps;

        while (cursor >= allNotes.length) {
            cursor -= allNotes.length;
        }

        while (cursor < 0) {
            cursor += allNotes.length;
        }

        const retrivedNote = allNotes[cursor];
        notes.push(retrivedNote);
    });

    return notes;
};

export const getChordNotesForKeyAndChordSequence = (chordKeys, chordID, chordSequence) => {
    const notes = [];

    chordSequence.map((item) => {
        let cursor = chordID - 1 + item - 1;

        while (cursor >= 7) {
            cursor -= 7;
        }

        while (cursor < 0) {
            cursor += 7;
        }
        // let cursor = allNotes.indexOf(chordKey);
        const selectedNote = chordKeys[cursor];
        notes.push(selectedNote);
    });

    return notes;
};

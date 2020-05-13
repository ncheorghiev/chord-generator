export const chords = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

export const triad = [3, 5];
export const seventh = [3, 5, 7];

export const chordPositions = ["I", "II", "III", "IV", "V", "VI", "VII"];

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
    triad: createKeyStepsFromPattern([1, 3, 5]),
    seventh: createKeyStepsFromPattern([1, 3, 5, 7]),
    triadFirstInversion: createKeyStepsFromPattern([3, 5, 8]),
    triadSecondInversion: createKeyStepsFromPattern([5, 8, 10]),
    xxx: createKeyStepsFromPattern([1, -3, -5, -2])
};

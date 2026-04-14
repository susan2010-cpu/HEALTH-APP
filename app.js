// -----------------------------
// Simulated User Data
// -----------------------------
let steps = 8000;       // Current steps (can now be updated dynamically)
let stepGoal = 10000;   // Step goal
let heartRate = 75;     // Simulated heart rate

// -----------------------------
// Sample Diseases Dataset
// -----------------------------
const diseaseData = [
    {
        name: "Flu",
        symptoms: ["fever", "cough", "fatigue"],
        imageUrl: "https://via.placeholder.com/300?text=Flu"
    },
    {
        name: "Cold",
        symptoms: ["runny nose", "sneezing", "cough"],
        imageUrl: "https://via.placeholder.com/300?text=Cold"
    },
    {
        name: "Migraine",
        symptoms: ["headache", "nausea", "sensitivity to light"],
        imageUrl: "https://via.placeholder.com/300?text=Migraine"
    },
    {
        name: "Allergy",
        symptoms: ["itchy eyes", "sneezing", "runny nose"],
        imageUrl: "https://via.placeholder.com/300?text=Allergy"
    },
    {
        name: "UTI",
        symptoms: ["burning sensation", "frequent urination", "urgency", "lower abdominal pain"],
        imageUrl: "https://via.placeholder.com/300?text=UTI"
    }
];

// -----------------------------
// Health Dashboard Update
// -----------------------------
function updateHealthDashboard() {
    document.getElementById('steps').textContent = steps;
    document.getElementById('heart-rate').textContent = `${heartRate} bpm`;
}

// -----------------------------
// Step Progress Bar
// -----------------------------
function updateStepProgress() {
    const progressBar = document.getElementById('step-progress');
    const progressText = document.getElementById('step-progress-text');

    progressBar.value = steps;
    progressBar.max = stepGoal;
    progressText.textContent = `${steps}/${stepGoal} steps`;
}

// -----------------------------
// Personalized Fitness Recommendation
// -----------------------------
function getFitnessRecommendation() {
    let recommendation = '';
    if (steps < 5000) {
        recommendation = 'Try to walk more today to hit 10,000 steps.';
    } else if (steps < stepGoal) {
        recommendation = 'Great! Keep up the good work!';
    } else {
        recommendation = 'You are doing fantastic! Stay active!';
    }

    document.getElementById('fitness-recommendation').textContent = recommendation;
}

// -----------------------------
// AI-Powered Symptom Checker (Enhanced)
// -----------------------------
function checkSymptom() {
    const inputSymptoms = document.getElementById('symptom-input').value
        .toLowerCase()
        .split(",")
        .map(symptom => symptom.trim())
        .filter(symptom => symptom !== "");

    if (inputSymptoms.length === 0) {
        document.getElementById('symptom-result').textContent = 'Please enter some symptoms to check.';
        document.getElementById('disease-image').style.display = 'none';
        return;
    }

    const matchedDiseases = [];

    diseaseData.forEach(disease => {
        const hasMatch = inputSymptoms.some(symptom =>
            disease.symptoms.some(diseaseSymptom => diseaseSymptom.toLowerCase().includes(symptom))
        );
        if (hasMatch) matchedDiseases.push(disease);
    });

    if (matchedDiseases.length > 0) {
        const diseaseNames = matchedDiseases.map(d => d.name).join(", ");
        document.getElementById('symptom-result').textContent =
            `Based on your symptoms, these conditions might be possible: ${diseaseNames}`;

        // Display the first matched disease image
        document.getElementById('disease-image').src = matchedDiseases[0].imageUrl;
        document.getElementById('disease-image').style.display = 'block';
    } else {
        // Friendly fallback message
        document.getElementById('symptom-result').textContent =
            'No exact match found. Consider consulting a healthcare professional for guidance.';
        document.getElementById('disease-image').style.display = 'none';
    }
}

// -----------------------------
// Update Steps Dynamically from Input
// -----------------------------
function updateSteps() {
    const newSteps = parseInt(document.getElementById('steps-input').value);
    if (!isNaN(newSteps)) {
        steps = newSteps;
        updateHealthDashboard();
        updateStepProgress();
        getFitnessRecommendation();
    }
}

// -----------------------------
// Initialize Dashboard on Page Load
// -----------------------------
window.addEventListener('DOMContentLoaded', () => {
    updateHealthDashboard();
    updateStepProgress();
    getFitnessRecommendation();
});
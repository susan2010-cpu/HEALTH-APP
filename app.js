// Sample dataset of diseases, symptoms, and images
const diseaseData = [
    {
        name: "Flu",
        symptoms: ["fever", "cough", "fatigue"],
        imageUrl: "https://example.com/flu_image.jpg", // Replace with real image URL
    },
    {
        name: "Cold",
        symptoms: ["runny nose", "sneezing", "cough"],
        imageUrl: "https://via.placeholder.com/300?text=Cold", // Replace with real image URL
    },
    {
        name: "Migraine",
        symptoms: ["headache", "nausea", "sensitivity to light"],
        imageUrl: "https://via.placeholder.com/300?text=Migraine", // Replace with real image URL
    },
    {
        name: "Allergy",
        symptoms: ["itchy eyes", "sneezing", "runny nose"],
        imageUrl: "https://via.placeholder.com/300?text=Allergy", // Replace with real image URL
    }
];

// Simulating 5000 steps and 75 bpm for now
let steps = 5000;
let heartRate = 75;

// Updating the dashboard with steps and heart rate
document.getElementById('steps').textContent = steps;
document.getElementById('heart-rate').textContent = `${heartRate} bpm`;

// Function to check symptoms and match diseases
function checkSymptom() {
    const inputSymptoms = document.getElementById('symptom-input').value
        .toLowerCase()   // Normalize input to lowercase for case-insensitive matching
        .split(",")      // Split symptoms by commas
        .map(symptom => symptom.trim()); // Trim any extra spaces

    if (!inputSymptoms || inputSymptoms.length === 0) {
        document.getElementById('symptom-result').textContent = 'Please enter some symptoms to check.';
        document.getElementById('disease-image').style.display = 'none';
        return;
    }

    let matchedDisease = null;

    // Loop through each disease and check for matches
    for (let i = 0; i < diseaseData.length; i++) {
        const disease = diseaseData[i];
        
        // Check if every symptom entered by the user matches at least one symptom from the disease
        const matches = inputSymptoms.every(symptom => 
            disease.symptoms.some(diseaseSymptom => diseaseSymptom.toLowerCase().includes(symptom))
        );

        // Debugging: Log the matching process
        console.log(`Checking disease: ${disease.name}`);
        console.log(`Symptoms entered: ${inputSymptoms}`);
        console.log(`Matching symptoms: ${disease.symptoms}`);
        console.log(`Match result: ${matches}`);

        if (matches) {
            matchedDisease = disease;
            break;
        }
    }

    // If a disease is found, display it
    if (matchedDisease) {
        document.getElementById('symptom-result').textContent = `Possible condition: ${matchedDisease.name}`;
        document.getElementById('disease-image').src = matchedDisease.imageUrl;
        document.getElementById('disease-image').style.display = 'block'; // Show image
    } else {
        document.getElementById('symptom-result').textContent = 'No match found. Please consult a doctor.';
        document.getElementById('disease-image').style.display = 'none'; // Hide image if no match
    }
}

// Personalized Fitness Recommendation based on steps data
function getFitnessRecommendation() {
    let recommendation = '';
    if (steps < 5000) {
        recommendation = 'Try to walk more today to hit 10,000 steps.';
    } else if (steps < 10000) {
        recommendation = 'Great! Keep up the good work!';
    } else {
        recommendation = 'You are doing fantastic! Stay active!';
    }

    document.getElementById('fitness-recommendation').textContent = recommendation;
}

// Function to update the progress bar and steps
function updateStepProgress() {
    // Update the step count text
    document.getElementById('steps').textContent = steps;

    // Update the progress bar value and text
    const progressBar = document.getElementById('step-progress');
    progressBar.value = steps;

    // Update the progress text
    document.getElementById('step-progress-text').textContent = `${steps}/10000 steps`;
}

// Call the update function on load
updateStepProgress();

// Call the fitness recommendation function when the page loads
getFitnessRecommendation();
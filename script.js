const elements = {
    form: document.querySelector("#form"),
    weightType: document.querySelector("#weight-type"),
    heightType: document.querySelector("#height-type"),
    weightInput: document.querySelector("#weight"),
    heightInput: document.querySelector("#height"),
    viewInfo: document.querySelector("#info"),
    viewResult: document.querySelector("#result"),
    viewRange: document.querySelector("#range"),
    copyIcon: document.querySelector("#copy-icon"),
};

elements.form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const weight = elements.weightInput.value;
    const height = elements.heightInput.value;
    
    const bmi = calculateBMI(weight, height).toFixed(2);
    const range = getRange(bmi);
    
    displayResults(bmi, range);
    setupCopyFunctionality(bmi);
}

function displayResults(bmi, range) {
    elements.viewResult.innerText = bmi;
    elements.viewRange.innerText = range;
    elements.viewInfo.style.display = "block";
}

function setupCopyFunctionality(bmi) {
    elements.copyIcon.onclick = () => copyBmi(bmi);
}

function adaptWeight(weightType, weight) {
    return weightType === "kilo" ? weight : weight / 2.205;
}

function adaptHeight(heightType, height) {
    return heightType === "centimeters" ? height / 100 : height / 3.280;
}

function calculateBMI(weight, height) {
    const weightInKg = adaptWeight(elements.weightType.value, weight);
    const heightInM = adaptHeight(elements.heightType.value, height);
    return weightInKg / (heightInM ** 2);
}

function copyBmi(bmi) {
    navigator.clipboard.writeText(bmi).then(() => {
        toggleCopyIconFeedback();
    });
}

function toggleCopyIconFeedback() {
    elements.copyIcon.classList.remove("copy");
    elements.copyIcon.classList.add("copy-check");
    
    setTimeout(() => {
        elements.copyIcon.classList.add("copy");
        elements.copyIcon.classList.remove("copy-check");
    }, 500);
}

function getRange(bmi) {
    const categories = [
        { limit: 18.49, label: "Peso bajo" },
        { limit: 24.99, label: "Peso normal" },
        { limit: 29.99, label: "Sobrepeso" },
        { limit: 34.99, label: "Obesidad tipo 1" },
        { limit: 39.99, label: "Obesidad tipo 2" },
        { limit: Infinity, label: "Obesidad tipo 3" },
    ];

    for (const { limit, label } of categories) {
        if (bmi < limit) {
            return label;
        }
    }
}
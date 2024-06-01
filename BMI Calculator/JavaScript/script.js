document.addEventListener('DOMContentLoaded', function() {
    var ageInput = document.getElementById('age');
    var ageDecreaseButton = document.getElementById('age-decrease');
    var genderIcons = document.querySelectorAll('.gender-icon');
    var errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.display = 'none';
    document.getElementById('calculator').appendChild(errorMessage);

    
    ageInput.value = 1;
    ageDecreaseButton.disabled = true; 

    // Handling Age Decrement
    ageDecreaseButton.addEventListener('click', function() {
        var currentValue = parseInt(ageInput.value);
        if (currentValue > 1) {
            ageInput.value = currentValue - 1;
        }
        if (currentValue <= 2) {
            ageDecreaseButton.disabled = true; 
        }
    });

    // Handling Age Increment
    document.getElementById('age-increase').addEventListener('click', function() {
        var currentValue = parseInt(ageInput.value);
        ageInput.value = currentValue + 1;
        if (currentValue >= 1) {
            ageDecreaseButton.disabled = false; 
        }
    });

    // Disable the decrement button if age is less than 2
    ageInput.addEventListener('input', function() {
        if (parseInt(ageInput.value) < 2) {
            ageDecreaseButton.disabled = true;
        } else {
            ageDecreaseButton.disabled = false;
        }
    });

    // Handling Gender Icon
    genderIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            genderIcons.forEach(function(icon) {
                icon.classList.remove('selected'); 
            });
            icon.classList.add('selected'); 
            errorMessage.style.display = 'none'; 
        });
    });

    // Handling Weight decrease
    document.getElementById('weight-decrease').addEventListener('click', function() {
        var weightInput = document.getElementById('weight');
        var currentValue = parseInt(weightInput.value);
        if (currentValue > 1) {
            weightInput.value = currentValue - 1;
        }
    });

    // Handling Weight increase
    document.getElementById('weight-increase').addEventListener('click', function() {
        var weightInput = document.getElementById('weight');
        var currentValue = parseInt(weightInput.value);
        weightInput.value = currentValue + 1;
    });

    // Handling Height decrease
    document.getElementById('height-decrease').addEventListener('click', function() {
        var heightInput = document.getElementById('height');
        var currentValue = parseInt(heightInput.value);
        if (currentValue > 1) {
            heightInput.value = currentValue - 1;
        }
    });

    // Handling Height increase
    document.getElementById('height-increase').addEventListener('click', function() {
        var heightInput = document.getElementById('height');
        var currentValue = parseInt(heightInput.value);
        heightInput.value = currentValue + 1;
    });

    // Handling Calculate Button
    document.getElementById('calculate').addEventListener('click', function() {
        var selectedGender = document.querySelector('.gender-icon.selected');
        if (!selectedGender) {
            errorMessage.textContent = 'Please select a gender.';
            errorMessage.style.display = 'block';
            return; 
        }

        var age = parseInt(document.getElementById('age').value);
        var weight = parseInt(document.getElementById('weight').value);
        var height = parseInt(document.getElementById('height').value);

        var bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
        var category = '';
        if (bmi < 18.5) {
            category = 'UNDERWEIGHT';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'NORMAL';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'OVERWEIGHT';
        } else {
            category = 'OBESE';
        }

        document.getElementById('calculator').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('bmi-category').textContent = category;
        document.getElementById('bmi-value').textContent = bmi;
        if(category == 'UNDERWEIGHT') {
            document.getElementById('bmi-message').textContent = `You have a ${category.toLowerCase()} body weight. Embrace your journey to a healthier you—consult a healthcare professional.`;
        }
        else if (category == 'NORMAL') {
            document.getElementById('bmi-message').textContent = `You have a ${category.toLowerCase()} body weight. Keep up the great work! `;
        } 
        else {
            document.getElementById('bmi-message').textContent = `You have a ${category.toLowerCase()} body weight. Take the first step towards a healthier future—consult with a healthcare professional.`;
        }
    });

    // Handling Re-Calculate Button
    document.getElementById('recalculate').addEventListener('click', function() {
        document.getElementById('result').style.display = 'none';
        document.getElementById('calculator').style.display = 'flex';
        document.getElementById('age').value = 1;
        document.getElementById('weight').value = 70;
        document.getElementById('height').value = 170;
        genderIcons.forEach(function(icon) {
            icon.classList.remove('selected'); 
        });
        errorMessage.style.display = 'none';
    });
});

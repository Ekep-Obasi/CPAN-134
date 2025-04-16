document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            removeValidationClasses(input);
            
            if (input.hasAttribute('required') && !input.value.trim()) {
                markAsInvalid(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                markAsInvalid(input, 'Please enter a valid email address');
                isValid = false;
            } else if (input.id === 'confirmPassword') {
                const password = document.getElementById('signupPassword');
                if (password && input.value !== password.value) {
                    markAsInvalid(input, 'Passwords do not match');
                    isValid = false;
                }
            } else if (input.pattern && input.value) {
                const pattern = new RegExp(input.pattern);
                if (!pattern.test(input.value)) {
                    markAsInvalid(input, input.dataset.errorMessage || 'Invalid format');
                    isValid = false;
                }
            }
            
            if (input.value && !input.classList.contains('is-invalid')) {
                input.classList.add('is-valid');
            }
        });
        
        return isValid;
    }
    
    function markAsInvalid(input, message) {
        input.classList.add('is-invalid');
        
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            input.parentNode.insertBefore(feedback, input.nextElementSibling);
        }
        feedback.textContent = message;
    }
    
    function removeValidationClasses(input) {
        input.classList.remove('is-valid', 'is-invalid');
        
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = '';
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateForm(form);
            });
        });
    });
    
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                calculateFootprint();
            }
        });
    }
    
    function calculateFootprint() {
        const transportMode = document.getElementById('transportMode')?.value;
        const transportDistance = parseFloat(document.getElementById('transportDistance')?.value || 0);
        const householdSize = parseInt(document.getElementById('householdSize')?.value || 0);
        const energyConsumption = parseFloat(document.getElementById('energyConsumption')?.value || 0);
        const dietType = document.getElementById('dietType')?.value;
        const wasteRecycling = document.getElementById('wasteRecycling')?.checked;
        
        const transportEmissions = calculateTransportEmissions(transportMode, transportDistance);
        const housingEmissions = calculateHousingEmissions(householdSize, energyConsumption);
        const foodEmissions = calculateFoodEmissions(dietType);
        const wasteEmissions = calculateWasteEmissions(wasteRecycling);
        
        // Total footprint
        const totalEmissions = transportEmissions + housingEmissions + foodEmissions + wasteEmissions;
        
        // Update the results section
        displayResults(totalEmissions, {
            transport: transportEmissions,
            housing: housingEmissions,
            food: foodEmissions,
            waste: wasteEmissions
        });
    }
    
    function calculateTransportEmissions(mode, distance) {
        // Simplified calculation for prototype
        const emissionFactors = {
            'car': 0.15,
            'publictransport': 0.05,
            'bicycle': 0,
            'walk': 0,
            'plane': 0.2
        };
        
        return (emissionFactors[mode] || 0.1) * distance * 52; // Annual estimate
    }
    
    function calculateHousingEmissions(size, energy) {
        return energy * 0.5 * size;
    }
    
    function calculateFoodEmissions(diet) {
        const dietFactors = {
            'vegan': 1.5,
            'vegetarian': 2.5,
            'pescatarian': 3.5,
            'omnivore': 5
        };
        
        return dietFactors[diet] || 5;
    }
    
    function calculateWasteEmissions(recycling) {
        return recycling ? 0.5 : 1.5;
    }
    
    function displayResults(total, breakdown) {
        const resultsSection = document.getElementById('calculatorResults');
        if (!resultsSection) return;
        
        // Show the results section
        resultsSection.classList.remove('d-none');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update total
        const totalElement = document.getElementById('totalEmissions');
        if (totalElement) {
            totalElement.textContent = total.toFixed(2);
        }
        
        // Update breakdown
        updateBreakdownChart(breakdown);
        
        // Update comparison
        const comparisonElement = document.getElementById('footprintComparison');
        if (comparisonElement) {
            const globalAverage = 4.7;
            const percentage = ((total - globalAverage) / globalAverage * 100).toFixed(1);
            let message;
            
            if (total < globalAverage) {
                message = `Your carbon footprint is ${Math.abs(percentage)}% lower than the global average of ${globalAverage} tons CO₂e per year. Great job!`;
                comparisonElement.className = 'alert alert-success';
            } else {
                message = `Your carbon footprint is ${percentage}% higher than the global average of ${globalAverage} tons CO₂e per year. There's room for improvement.`;
                comparisonElement.className = 'alert alert-warning';
            }
            
            comparisonElement.textContent = message;
        }
        
        // Update suggested challenges
        updateSuggestedChallenges(breakdown);
    }
    
    function updateBreakdownChart(breakdown) {
        const chartCanvas = document.getElementById('breakdownChart');
        if (!chartCanvas || !window.Chart) return;
        
        // Clear existing chart if any
        if (chartCanvas.chart) {
            chartCanvas.chart.destroy();
        }
        
        // Create new chart
        const ctx = chartCanvas.getContext('2d');
        chartCanvas.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Transport', 'Housing', 'Food', 'Waste'],
                datasets: [{
                    data: [breakdown.transport, breakdown.housing, breakdown.food, breakdown.waste],
                    backgroundColor: ['#0d6efd', '#20c997', '#ffc107', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    function updateSuggestedChallenges(breakdown) {
        const challengesList = document.getElementById('suggestedChallenges');
        if (!challengesList) return;
        
        challengesList.innerHTML = '';

        const categories = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
        const highestCategory = categories[0][0];
        
        const challengeSuggestions = {
            'transport': [
                'Try public transportation for your commute',
                'Carpool with colleagues or friends',
                'Replace one car trip per week with cycling'
            ],
            'housing': [
                'Switch to LED light bulbs',
                'Install a programmable thermostat',
                'Reduce standby power usage'
            ],
            'food': [
                'Participate in Meatless Monday',
                'Shop locally and in season',
                'Reduce food waste by meal planning'
            ],
            'waste': [
                'Start composting at home',
                'Use reusable shopping bags',
                'Avoid single-use plastics'
            ]
        };
        
        const suggestedList = challengeSuggestions[highestCategory] || challengeSuggestions.transport;
        
        suggestedList.forEach(challenge => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex align-items-center';
            li.innerHTML = `
                <i class="fas fa-leaf text-success me-3"></i>
                <span>${challenge}</span>
            `;
            challengesList.appendChild(li);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Step navigation
    const calculatorForm = document.getElementById('calculatorForm');
    const calculatorProgress = document.getElementById('calculatorProgress');
    const steps = document.querySelectorAll('.calculator-step');
    const stepButtons = document.querySelectorAll('.calculator-steps .nav-link');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Update progress bar
    function updateProgress() {
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        calculatorProgress.style.width = `${progressPercentage}%`;
        calculatorProgress.setAttribute('aria-valuenow', progressPercentage);
    }
    
    // Show specific step
    function showStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Update step indicators
        stepButtons.forEach((button, index) => {
            if (index + 1 === stepNumber) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Show current step
        document.getElementById(`step${stepNumber}`).classList.add('active');
        
        // Update progress
        currentStep = stepNumber;
        updateProgress();
    }
    
    // Next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep < totalSteps) {
                const currentStepElement = document.getElementById(`step${currentStep}`);
                const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
                
                // Basic validation before proceeding
                let isValid = true;
                inputs.forEach(input => {
                    if (!input.value) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    } else {
                        input.classList.remove('is-invalid');
                    }
                });
                
                if (isValid) {
                    showStep(currentStep + 1);
                }
            }
        });
    });
    
    // Previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });
    
    // Step indicators click
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Allow going back to previous steps, but require validation for going forward
            if (index + 1 < currentStep || validatePreviousSteps(index + 1)) {
                showStep(index + 1);
            }
        });
    });
    
    // Validate all steps up to the target step
    function validatePreviousSteps(targetStep) {
        let isValid = true;
        
        for (let i = 1; i < targetStep; i++) {
            const stepElement = document.getElementById(`step${i}`);
            const requiredInputs = stepElement.querySelectorAll('input[required], select[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.classList.add('is-invalid');
                }
            });
        }
        
        return isValid;
    }
    
    // Form submission
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate final step
            const finalStepElement = document.getElementById(`step${totalSteps}`);
            const requiredInputs = finalStepElement.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                calculateFootprint();
            }
        });
    }
    
    // Calculate and display footprint results
    function calculateFootprint() {
        // Collect all form data
        const formData = {
            // Transport
            transportMode: document.getElementById('transportMode').value,
            transportDistance: parseFloat(document.getElementById('transportDistance').value),
            flightFrequency: document.querySelector('input[name="flightFrequency"]:checked').value,
            
            // Home
            householdSize: document.getElementById('householdSize').value,
            homeType: document.getElementById('homeType').value,
            energyConsumption: document.getElementById('energyConsumption').value,
            renewableEnergy: document.querySelector('input[name="renewableEnergy"]:checked').value,
            
            // Food
            dietType: document.getElementById('dietType').value,
            localFood: document.querySelector('input[name="localFood"]:checked').value,
            foodWaste: document.querySelector('input[name="foodWaste"]:checked').value,
            
            // Lifestyle
            shoppingHabits: document.querySelector('input[name="shoppingHabits"]:checked').value,
            wasteRecycling: document.getElementById('wasteRecycling').checked,
            wasteComposting: document.getElementById('wasteComposting').checked,
            waterSavingShowers: document.getElementById('waterSavingShowers').checked,
            waterSavingFixtures: document.getElementById('waterSavingFixtures').checked,
            waterSavingFullLoads: document.getElementById('waterSavingFullLoads').checked
        };
        
        // Calculate individual components
        // Note: These calculations are simplified for the demo
        
        // Transport emissions (tons CO2e)
        let transportEmissions = 0;
        const transportFactors = {
            'car': 0.2,
            'electriccar': 0.08,
            'publictransport': 0.05,
            'bicycle': 0,
            'walk': 0
        };
        
        transportEmissions = (transportFactors[formData.transportMode] || 0.1) * formData.transportDistance * 52 / 1000;
        
        // Add flight emissions
        const flightFactors = {
            'no': 0,
            'occasional': 0.5,
            'frequent': 1.2,
            'veryfrequent': 2.5
        };
        transportEmissions += flightFactors[formData.flightFrequency] || 0;
        
        // Home emissions
        let homeEmissions = 0;
        const homeTypeFactors = {
            'apartment': 0.8,
            'small': 1.0,
            'medium': 1.3,
            'large': 1.8
        };
        
        const energyFactors = {
            'low': 0.8,
            'medium': 1.0,
            'high': 1.5,
            'veryhigh': 2.0
        };
        
        const renewableFactors = {
            'yes': 0.2,
            'partial': 0.6,
            'no': 1.0
        };
        
        homeEmissions = (homeTypeFactors[formData.homeType] || 1.0) * 
                        (energyFactors[formData.energyConsumption] || 1.0) * 
                        (renewableFactors[formData.renewableEnergy] || 1.0) / 
                        Math.sqrt(formData.householdSize);
        
        // Food emissions
        let foodEmissions = 0;
        const dietFactors = {
            'vegan': 0.8,
            'vegetarian': 1.2,
            'pescatarian': 1.5,
            'lowmeat': 1.8,
            'omnivore': 2.3,
            'highmeat': 3.2
        };
        
        const localFoodFactors = {
            'always': 0.8,
            'often': 0.9,
            'sometimes': 1.0,
            'rarely': 1.1
        };
        
        const wasteFactors = {
            'verylittle': 0.9,
            'some': 1.0,
            'significant': 1.2
        };
        
        foodEmissions = (dietFactors[formData.dietType] || 2.0) * 
                        (localFoodFactors[formData.localFood] || 1.0) * 
                        (wasteFactors[formData.foodWaste] || 1.0);
        
        // Lifestyle/consumer goods emissions
        let lifestyleEmissions = 0;
        const shoppingFactors = {
            'minimal': 0.7,
            'moderate': 1.0,
            'frequent': 1.4
        };
        
        lifestyleEmissions = (shoppingFactors[formData.shoppingHabits] || 1.0);
        
        // Apply recycling and water conservation reductions
        if (formData.wasteRecycling) lifestyleEmissions *= 0.9;
        if (formData.wasteComposting) lifestyleEmissions *= 0.95;
        
        let waterReduction = 1.0;
        if (formData.waterSavingShowers) waterReduction -= 0.03;
        if (formData.waterSavingFixtures) waterReduction -= 0.03;
        if (formData.waterSavingFullLoads) waterReduction -= 0.03;
        
        lifestyleEmissions *= waterReduction;
        
        // Calculate total emissions
        const totalEmissions = transportEmissions + homeEmissions + foodEmissions + lifestyleEmissions;
        
        // Update the results display
        displayResults(totalEmissions.toFixed(1), {
            transport: transportEmissions,
            home: homeEmissions,
            food: foodEmissions,
            lifestyle: lifestyleEmissions
        });
        
        // Show results section
        document.getElementById('calculatorResults').classList.remove('d-none');
        
        // Scroll to results
        document.getElementById('calculatorResults').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Display footprint results
    function displayResults(total, breakdown) {
        // Update total emissions
        document.getElementById('totalEmissions').textContent = total;
        
        // Update breakdown chart
        const ctx = document.getElementById('breakdownChart').getContext('2d');
        const breakdownChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Transport', 'Home Energy', 'Food', 'Consumer Goods'],
                datasets: [{
                    data: [
                        breakdown.transport.toFixed(1), 
                        breakdown.home.toFixed(1), 
                        breakdown.food.toFixed(1), 
                        breakdown.lifestyle.toFixed(1)
                    ],
                    backgroundColor: [
                        '#0d6efd',
                        '#20c997',
                        '#ffc107',
                        '#6c757d'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                                const percentage = Math.round((value * 100) / total) + '%';
                                return `${label}: ${value} tons (${percentage})`;
                            }
                        }
                    }
                }
            }
        });
        
        // Update comparison message
        const comparisonElement = document.getElementById('footprintComparison');
        const globalAverage = 4.7;
        const percentage = (((parseFloat(total) - globalAverage) / globalAverage) * 100).toFixed(1);
        
        if (parseFloat(total) < globalAverage) {
            comparisonElement.innerHTML = `Your carbon footprint is <strong>${Math.abs(percentage)}%</strong> lower than the global average of ${globalAverage} tons CO₂e per year. Great job!`;
            comparisonElement.className = 'alert alert-success';
        } else {
            comparisonElement.innerHTML = `Your carbon footprint is <strong>${percentage}%</strong> higher than the global average of ${globalAverage} tons CO₂e per year. There's room for improvement.`;
            comparisonElement.className = 'alert alert-warning';
        }
        
        // Add suggested challenges based on highest emission category
        const categories = [
            { name: 'transport', value: breakdown.transport },
            { name: 'home', value: breakdown.home },
            { name: 'food', value: breakdown.food },
            { name: 'lifestyle', value: breakdown.lifestyle }
        ];
        
        // Sort categories by emission value (highest first)
        categories.sort((a, b) => b.value - a.value);
        
        // Get the highest emission category
        const highestCategory = categories[0].name;
        
        // Add challenge suggestions based on highest category
        const challengeSuggestions = {
            'transport': [
                'Try public transportation for your commute',
                'Carpool with colleagues or friends',
                'Replace one car trip per week with cycling'
            ],
            'home': [
                'Switch to LED light bulbs',
                'Install a programmable thermostat',
                'Reduce standby power usage'
            ],
            'food': [
                'Participate in Meatless Monday',
                'Shop locally and in season',
                'Reduce food waste by meal planning'
            ],
            'lifestyle': [
                'Start composting at home',
                'Use reusable shopping bags',
                'Avoid single-use plastics'
            ]
        };
        
        const suggestedChallenges = document.getElementById('suggestedChallenges');
        suggestedChallenges.innerHTML = '';
        
        const suggestions = challengeSuggestions[highestCategory] || challengeSuggestions.transport;
        
        suggestions.forEach(challenge => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex align-items-center';
            li.innerHTML = `
                <i class="fas fa-leaf text-success me-3"></i>
                <span>${challenge}</span>
            `;
            suggestedChallenges.appendChild(li);
        });
    }
});
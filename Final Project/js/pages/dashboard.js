document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Footprint History Chart
    const footprintHistoryCtx = document.getElementById('footprintHistoryChart').getContext('2d');
    const footprintHistoryChart = new Chart(footprintHistoryCtx, {
        type: 'line',
        data: {
            labels: ['November', 'December', 'January', 'February', 'March', 'April'],
            datasets: [
                {
                    label: 'Your Footprint',
                    data: [8.2, 7.5, 6.8, 5.9, 5.3, 5.0],
                    borderColor: '#20c997',
                    backgroundColor: 'rgba(32, 201, 151, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Average User',
                    data: [7.8, 7.7, 7.6, 7.5, 7.4, 7.3],
                    borderColor: '#6c757d',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y + ' tons CO₂e';
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 4,
                    title: {
                        display: true,
                        text: 'Tons CO₂e'
                    }
                }
            }
        }
    });
    
    // Breakdown Chart
    const breakdownCtx = document.getElementById('breakdownChart').getContext('2d');
    const breakdownChart = new Chart(breakdownCtx, {
        type: 'doughnut',
        data: {
            labels: ['Transport', 'Home Energy', 'Food', 'Goods', 'Waste'],
            datasets: [{
                data: [1.5, 1.2, 1.0, 0.8, 0.5],
                backgroundColor: [
                    '#0d6efd',
                    '#20c997',
                    '#ffc107',
                    '#6c757d',
                    '#dc3545'
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
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value * 100) / total) + '%';
                            return `${label}: ${value} tons (${percentage})`;
                        }
                    }
                }
            }
        }
    });
    
    // Challenge Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const value = bar.getAttribute('aria-valuenow');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = value + '%';
        }, 200);
    });
});
const ctx2 = document.getElementById('lineChart');

new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Vilatilicio', 'Mensal', 'Anual', 'Outros'],
        datasets: [{
        label: 'Tipos de Faturamento',
        data: [2, 5, 0, 0],
        borderWidth: 1,
        backgroundColor: '#5e8b60',
        borderColor: '#5e8b60'
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
});
const ctx = document.getElementById('barChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Debito', 'Credito', 'Pix', 'Dinheiro'],
        datasets: [{
        label: 'Tipo de pagamentos',
        data: [2, 0, 0, 0],
        borderWidth: 1,
        backgroundColor: '#5e8b60'
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
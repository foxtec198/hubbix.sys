const ctx = document.getElementById('barChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Debito', 'Credito', 'Pix', 'Dinheiro'],
        datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5],
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
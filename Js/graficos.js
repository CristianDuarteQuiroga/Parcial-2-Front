// Defaults
Chart.defaults.global.defaultFontColor = '#fff'
Chart.defaults.global.elements.line.borderWidth = 1
Chart.defaults.global.elements.rectangle.borderWidth = 1
Chart.defaults.scale.gridLines.color = '#444'
Chart.defaults.scale.ticks.display = false


function ventasMes(id) {

    document.body.classList.add('running')

    const data = {
        labels: ['17/04/2022 = 30', '18/04/2022 = 22', '19/04/2022 = 32', '20/04/2022 = 23', '21/04/2022 = 40', '22/04/2022 = 60', '23/04/2022 = 70', '24/04/2022 = 50'],
        datasets: [
            {
                type: 'bar',
                label: 'Ventas por semana',
                borderColor: styles.color.solids[3],
                backgroundColor: styles.color.solids[3],
                data: [
                    30,
                    22,
                    32,
                    23,
                    40,
                    60,
                    70,
                    50    
                ]
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        scaleFontColor: '#fff',
        scales: {
            yAxes: [{
                ticks: {
                    display: true,
                    beginAtZero : true
                }
            }],
            xAxes: [{
                barPercentage: 0.5,
                ticks: {
                    display: true
                }
            }]
        }
    }

    new Chart(id, { type: 'line', data, options })


    ventasIndividuales("chart2");
}


function ventasIndividuales(id) {

    const data = {
        labels: ['Arroz', 'Audifonos', 'Cargador', 'Chaqueta', 'Duraznos','Guantes de moto', 'Manzanas', 'Pasta', 'Peras', 'Rodilleras'],
        datasets: [
            {
                data: [
                   15,
                   20,
                   30,
                   40,
                   20,
                   60,
                   50,
                   67,
                   26,
                   19
                ],
                borderWidth: 1,
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor)
            }
        ]
    }

    const options = {
        legend: {
            position: 'right'
        }
    }

    new Chart(id, { type: 'polarArea', data, options })
}
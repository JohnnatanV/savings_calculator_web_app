let expenses = [];

function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const monthlyExpense = parseFloat(document.getElementById('monthlyExpenses').value);

    expenses.push({ name: expenseName, amount: monthlyExpense });

    // Limpiar los campos después de agregar un gasto
    document.getElementById('expenseName').value = '';
    document.getElementById('monthlyExpenses').value = '';
}

function calculateProjection() {
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);

    const totalMonthlyIncome = monthlyIncome + extraIncome;

    let totalMonthlyExpenses = 0;
    let expensesDetails = '';

    for (const expense of expenses) {
        totalMonthlyExpenses += expense.amount;
        expensesDetails += `${expense.name}: $${expense.amount.toFixed(2)}<br>`;
    }

    const savingsPerMonth = totalMonthlyIncome - totalMonthlyExpenses;
    const totalSavings = savingsPerMonth * 12;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        Ingresos Mensuales: $${monthlyIncome.toFixed(2)}<br>
        Ingresos Extra: $${extraIncome.toFixed(2)}<br>
        <hr>
        Gastos Mensuales Totales: $${totalMonthlyExpenses.toFixed(2)}<br>
        Detalles de Gastos:<br>${expensesDetails}
        <hr>
        Ahorro Mensual Estimado: $${savingsPerMonth.toFixed(2)}<br>
        Ahorro Anual Estimado: $${totalSavings.toFixed(2)}
    `;

    // Crear un gráfico
    createChart(totalMonthlyIncome, totalMonthlyExpenses);
}

function createChart(income, expenses) {
    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: 'Diferencia entre Ingresos y Gastos',
                data: [income, -expenses],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
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
}


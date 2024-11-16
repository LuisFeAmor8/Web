const maxStudents = 45;
let studentCount = 0;

function addStudent() {
    if (studentCount >= maxStudents) {
        alert('No se pueden agregar más de 45 estudiantes.');
        return;
    }

    const container = document.getElementById('students-container');
    const form = document.createElement('div');
    form.classList.add('student-form');
    form.innerHTML = `
        <input type="text" placeholder="Nombre del Estudiante" class="student-name">
        <input type="number" placeholder="Nota 1" min="0" max="5" step="0.1" class="student-grade">
        <input type="number" placeholder="Nota 2" min="0" max="5" step="0.1" class="student-grade">
        <input type="number" placeholder="Nota 3" min="0" max="5" step="0.1" class="student-grade">
        <input type="number" placeholder="Nota 4" min="0" max="5" step="0.1" class="student-grade">
    `;
    container.appendChild(form);
    studentCount++;

    // Habilitar botón "Actualizar" si hay al menos un estudiante
    document.getElementById('reset-button').disabled = false;
}

function calculateResults() {
    const container = document.getElementById('students-container');
    const studentForms = container.getElementsByClassName('student-form');
    const resultsContainer = document.getElementById('results');
    let resultsHTML = `
        <table>
            <tr>
                <th>Nombre</th>
                <th>Media</th>
                <th>Moda</th>
                <th>Mediana</th>
            </tr>
    `;

    for (let form of studentForms) {
        const name = form.querySelector('.student-name').value;
        const grades = Array.from(form.querySelectorAll('.student-grade'))
            .map(input => parseFloat(input.value))
            .filter(n => !isNaN(n));

        if (grades.length < 4 || !name.trim()) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const mean = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

        const frequency = {};
        grades.forEach(grade => {
            frequency[grade] = (frequency[grade] || 0) + 1;
        });
        const maxFrequency = Math.max(...Object.values(frequency));
        const mode = Object.keys(frequency)
            .filter(key => frequency[key] === maxFrequency)
            .map(Number);

        grades.sort((a, b) => a - b);
        const mid = Math.floor(grades.length / 2);
        const median = grades.length % 2 === 0 ?
            (grades[mid - 1] + grades[mid]) / 2 :
            grades[mid];

        resultsHTML += `
            <tr>
                <td>${name}</td>
                <td>${mean.toFixed(2)}</td>
                <td>${mode.join(', ')}</td>
                <td>${median}</td>
            </tr>
        `;
    }

    resultsHTML += '</table>';
    resultsContainer.innerHTML = resultsHTML;
}

function resetData() {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar todos los datos ingresados?');
    if (confirmation) {
        document.getElementById('students-container').innerHTML = '';
        document.getElementById('results').innerHTML = '';
        studentCount = 0;

        document.getElementById('reset-button').disabled = true;

        alert('Todos los datos han sido eliminados.');
    }
}

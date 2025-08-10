document.addEventListener('DOMContentLoaded', () => {
    const views = {
        dashboard: document.getElementById('dashboard-view'),
        logWorkout: document.getElementById('log-workout-view'),
        history: document.getElementById('history-view'),
    };

    const navLinks = {
        dashboard: document.getElementById('nav-dashboard'),
        logWorkout: document.getElementById('nav-log-workout'),
        history: document.getElementById('nav-history'),
    };

    const addExerciseBtn = document.getElementById('add-exercise-btn');
    const logWorkoutForm = document.getElementById('log-workout-form');
    const exercisesContainer = document.getElementById('exercises-container');
    const workoutDateField = document.getElementById('workout-date');
    const historyList = document.getElementById('history-list');
    const chartCanvas = document.getElementById('progress-chart');
    let progressChart = null;

    let state = {
        workouts: [],
        routines: [], // Future use
    };

    // --- DATA MANAGEMENT ---
    function loadData() {
        const savedData = localStorage.getItem('appTreinoData');
        if (savedData) {
            state = JSON.parse(savedData);
        }
    }

    function saveData() {
        localStorage.setItem('appTreinoData', JSON.stringify(state));
    }

    // --- VIEW MANAGEMENT ---
    function showView(viewName) {
        Object.values(views).forEach(view => view.classList.add('hidden'));
        views[viewName].classList.remove('hidden');

        Object.values(navLinks).forEach(link => link.classList.remove('active'));
        navLinks[viewName].classList.add('active');
    }

    // --- NAVIGATION ---
    navLinks.dashboard.addEventListener('click', (e) => { e.preventDefault(); renderDashboard(); showView('dashboard'); });
    navLinks.logWorkout.addEventListener('click', (e) => { e.preventDefault(); showView('logWorkout'); });
    navLinks.history.addEventListener('click', (e) => { e.preventDefault(); renderHistory(); showView('history'); });

    // --- LOGIC ---

    function getLatestPerformance(exerciseName) {
        const relevantWorkouts = state.workouts
            .map(w => w.exercises.find(e => e.name.toLowerCase() === exerciseName.toLowerCase()) ? w : null)
            .filter(Boolean)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (relevantWorkouts.length > 0) {
            const lastWorkout = relevantWorkouts[0];
            return lastWorkout.exercises.find(e => e.name.toLowerCase() === exerciseName.toLowerCase());
        }
        return null;
    }

    function addExercise() {
        const exerciseId = `exercise-${Date.now()}`;
        const card = document.createElement('div');
        card.classList.add('exercise-card');
        card.id = exerciseId;
        card.innerHTML = `
            <button type="button" class="btn-close delete-exercise-btn" aria-label="Close"></button>
            <div class="mb-3">
                <label for="exercise-name-${exerciseId}" class="form-label">Nome do Exercício</label>
                <input type="text" class="form-control exercise-name" id="exercise-name-${exerciseId}" placeholder="Ex: Supino Reto" required>
                <small class="form-text text-muted suggestion"></small>
            </div>
            <div class="row">
                <div class="col-md-4 mb-2">
                    <label for="sets-${exerciseId}" class="form-label">Séries</label>
                    <input type="number" class="form-control" id="sets-${exerciseId}" placeholder="Séries" required>
                </div>
                <div class="col-md-4 mb-2">
                    <label for="reps-${exerciseId}" class="form-label">Reps</label>
                    <input type="number" class="form-control" id="reps-${exerciseId}" placeholder="Reps" required>
                </div>
                <div class="col-md-4 mb-2">
                    <label for="weight-${exerciseId}" class="form-label">Peso (kg)</label>
                    <input type="number" step="0.5" class="form-control" id="weight-${exerciseId}" placeholder="Peso" required>
                </div>
            </div>
        `;
        exercisesContainer.appendChild(card);

        card.querySelector('.delete-exercise-btn').addEventListener('click', () => card.remove());

        const exerciseNameInput = card.querySelector('.exercise-name');
        exerciseNameInput.addEventListener('blur', () => {
            const suggestionText = card.querySelector('.suggestion');
            const lastPerformance = getLatestPerformance(exerciseNameInput.value);
            if (lastPerformance) {
                suggestionText.textContent = `Última vez: ${lastPerformance.sets}x${lastPerformance.reps} com ${lastPerformance.weight}kg. Tente progredir!`;
            } else {
                suggestionText.textContent = 'Primeira vez fazendo este exercício. Dê o seu melhor!';
            }
        });
    }

    addExerciseBtn.addEventListener('click', addExercise);

    logWorkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newWorkout = {
            id: `workout-${Date.now()}`,
            date: workoutDateField.value,
            name: document.getElementById('workout-name').value,
            exercises: [],
        };

        const exerciseCards = exercisesContainer.querySelectorAll('.exercise-card');
        exerciseCards.forEach(card => {
            const exercise = {
                name: card.querySelector('.exercise-name').value,
                sets: card.querySelector('input[id^="sets-"]').value,
                reps: card.querySelector('input[id^="reps-"]').value,
                weight: card.querySelector('input[id^="weight-"]').value,
            };
            newWorkout.exercises.push(exercise);
        });

        state.workouts.push(newWorkout);
        saveData();
        alert('Treino salvo com sucesso!');
        logWorkoutForm.reset();
        exercisesContainer.innerHTML = '';
        addExercise(); // Add one exercise card back for the next entry
        renderDashboard();
        showView('dashboard');
    });

    function renderDashboard() {
        const summary = document.getElementById('dashboard-summary');
        if (state.workouts.length === 0) {
            summary.innerHTML = '<p>Nenhum treino registrado ainda. Clique em "Registrar Treino" para começar!</p>';
            return;
        }
        summary.innerHTML = '<h4>Últimos Treinos:</h4>';
        const recentWorkouts = [...state.workouts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        const list = document.createElement('ul');
        list.className = 'list-group';
        recentWorkouts.forEach(w => {
            const item = document.createElement('li');
            item.className = 'list-group-item';
            item.textContent = `${new Date(w.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}: ${w.name}`;
            list.appendChild(item);
        });
        summary.appendChild(list);
    }

    function renderHistory() {
        historyList.innerHTML = '';
        if (progressChart) {
            progressChart.destroy();
        }

        if (state.workouts.length === 0) {
            historyList.innerHTML = '<p>Nenhum histórico de treino encontrado.</p>';
            return;
        }

        const sortedWorkouts = [...state.workouts].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedWorkouts.forEach(workout => {
            const workoutEl = document.createElement('div');
            workoutEl.className = 'accordion-item';
            workoutEl.innerHTML = `
                <h2 class="accordion-header" id="heading-${workout.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${workout.id}" aria-expanded="false" aria-controls="collapse-${workout.id}">
                        ${new Date(workout.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} - ${workout.name}
                    </button>
                </h2>
                <div id="collapse-${workout.id}" class="accordion-collapse collapse" aria-labelledby="heading-${workout.id}">
                    <div class="accordion-body">
                        <ul>
                            ${workout.exercises.map(ex => `<li><strong>${ex.name}</strong>: ${ex.sets} séries de ${ex.reps} reps com ${ex.weight}kg <button class="btn btn-sm btn-link chart-btn" data-exercise="${ex.name}">Ver Progresso</button></li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            historyList.appendChild(workoutEl);
        });

        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exerciseName = e.target.dataset.exercise;
                renderProgressChart(exerciseName);
            });
        });
    }

    function renderProgressChart(exerciseName) {
        const data = {
            labels: [],
            datasets: [{
                label: `Progressão de Carga para ${exerciseName} (kg)`,
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        const relevantWorkouts = state.workouts
            .filter(w => w.exercises.some(e => e.name.toLowerCase() === exerciseName.toLowerCase()))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        relevantWorkouts.forEach(w => {
            const exercise = w.exercises.find(e => e.name.toLowerCase() === exerciseName.toLowerCase());
            data.labels.push(new Date(w.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}));
            data.datasets[0].data.push(parseFloat(exercise.weight));
        });

        if (progressChart) {
            progressChart.destroy();
        }

        progressChart = new Chart(chartCanvas, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // --- INITIALIZATION ---
    function init() {
        loadData();
        workoutDateField.valueAsDate = new Date();
        addExercise();
        renderDashboard();
        showView('dashboard');
    }

    init();
});

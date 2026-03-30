const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const sequelize = new Sequelize('sqlite::memory:'); // Use um banco real em produção

// Modelos orientados a objetos
class Exercise extends Sequelize.Model {}
Exercise.init({
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.STRING,
}, { sequelize, modelName: 'exercise' });

class Workout extends Sequelize.Model {}
Workout.init({
  name: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
}, { sequelize, modelName: 'workout' });

class WorkoutExercise extends Sequelize.Model {}
WorkoutExercise.init({
  workoutId: { type: DataTypes.INTEGER, allowNull: false },
  exerciseId: { type: DataTypes.INTEGER, allowNull: false },
  sets: DataTypes.INTEGER,
  reps: DataTypes.INTEGER,
  weight: DataTypes.FLOAT,
}, { sequelize, modelName: 'workoutExercise' });

// Relacionamentos
Workout.belongsToMany(Exercise, { through: WorkoutExercise });
Exercise.belongsToMany(Workout, { through: WorkoutExercise });

// Treinos pré-definidos (dados iniciais)
const predefinedWorkouts = [
  { name: 'Treino de Peito', exercises: ['Supino Reto', 'Supino Inclinado', 'Crucifixo'] },
  { name: 'Treino de Pernas', exercises: ['Agachamento', 'Leg Press', 'Extensão de Pernas'] },
  { name: 'Treino de Costas', exercises: ['Puxada na Barra', 'Remada Curvada', 'Levantamento Terra'] },
];

// Rotas
app.get('/exercises', async (req, res) => {
  const exercises = await Exercise.findAll();
  res.json(exercises);
});

app.get('/workouts/predefined', (req, res) => {
  res.json(predefinedWorkouts);
});

app.get('/workouts', async (req, res) => {
  const workouts = await Workout.findAll({ include: Exercise });
  res.json(workouts);
});

app.post('/workouts', async (req, res) => {
  const { name, date, exercises } = req.body;
  const workout = await Workout.create({ name, date });
  for (const ex of exercises) {
    const exercise = await Exercise.findOrCreate({ where: { name: ex.name } });
    await WorkoutExercise.create({ workoutId: workout.id, exerciseId: exercise[0].id, sets: ex.sets, reps: ex.reps, weight: ex.weight });
  }
  res.status(201).json(workout);
});

// Inicialização
sequelize.sync().then(async () => {
  // Inserir exercícios pré-definidos
  const exercises = ['Supino Reto', 'Supino Inclinado', 'Crucifixo', 'Agachamento', 'Leg Press', 'Extensão de Pernas', 'Puxada na Barra', 'Remada Curvada', 'Levantamento Terra'];
  for (const name of exercises) {
    await Exercise.findOrCreate({ where: { name } });
  }
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
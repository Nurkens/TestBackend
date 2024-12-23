import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import router from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;

async function startApp() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

startApp();

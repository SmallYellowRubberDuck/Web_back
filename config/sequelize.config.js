const { Sequelize } = require('sequelize');
require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: false,        
    dialect: 'postgres', 
    dialectOptions: {}  
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: false,
    dialect: 'postgres',
    dialectOptions: {},
  },
};

// Получаем текущую среду из переменной окружения, если не указана — по умолчанию 'development'
const environment = process.env.NODE_ENV || 'development';

// Создаем объект Sequelize с параметрами из конфигурации
const sequelize = new Sequelize(config[environment]);

module.exports = sequelize;

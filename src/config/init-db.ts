import { pool } from './db.js';

export const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // Create students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT NULL,
        course VARCHAR(255) NULL,
        year_level INT NULL CHECK (year_level >= 1 AND year_level <= 4),
        gpa DECIMAL(3, 2) NULL CHECK (gpa >= 0 AND gpa <= 4),
        enrollment_status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
  } catch (error: any) {
    console.error('Error initializing database:', error.message);
    throw error;
  }
};

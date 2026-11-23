# STUDENTHUB – Student Management System

## Project Description

STUDENTHUB is a simple fullstack web application developed as part of Praktikum 7 – PHP.

The application allows users to register, view, update and delete student information using a MySQL database.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- PHP 8.2
- MySQL
- Laragon
- phpMyAdmin

## Project Structure

```text
praktikum_fullstack/
│
├── backend/
│   ├── db.php
│   ├── create.php
│   ├── read.php
│   ├── update.php
│   └── delete.php
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Main Features

- Register student information.
- Display student records.
- Update student information.
- Delete student records.
- Automatic student record counting.

## Database Configuration

Create a MySQL database named `praktikum_fullstack`.

Create a table named `mahasiswa` with the following columns:

- id
- nama
- nim
- created_at

Configure your local database credentials in `backend/db.php`.

## How to Run

1. Install Laragon.
2. Start Apache and MySQL.
3. Place the project inside Laragon's `www` directory.
4. Create the required database and table.
5. Configure the database connection.
6. Open your browser and visit:

`http://localhost/praktikum_fullstack/`

## Academic Information

Praktikum 7 – PHP  
Information Technology Program  
Faculty of Science and Technology  
Universitas 'Aisyiyah Yogyakarta

## Developer

Abdul Majeed

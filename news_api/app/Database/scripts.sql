CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    suffix VARCHAR(5),
    user_type VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(50),
    is_approved BOOLEAN,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id),
    id_number VARHAR(100),
    exam LONGBLOB
)



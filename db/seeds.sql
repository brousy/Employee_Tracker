INSERT INTO department (name)
-- change values of department names
VALUES ("Lion King"),
       ("The Godfather"),
       ("West Side Story"),
       ("Parasite"),
       ("The Wizard of Oz");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 10000000, 1), 
        ("Accountant", 100000, 2),
        ("Sales", 120000, 3), 
        ("CIO", 250000, 4);
       
INSERT INTO employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES ("JOHN", "QUINN", 1, NULL),
-- add people
        ("BROU", "GRIFFIN", 2, 1);
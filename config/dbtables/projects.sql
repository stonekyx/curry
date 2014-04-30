CREATE TABLE projects
(
id int(11) NOT NULL AUTO_INCREMENT,
project_name varchar(255) NOT NULL,
created_at datetime NOT NULL,
description text NOT NULL,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE users
(
id int(11) NOT NULL AUTO_INCREMENT,
email varchar(255) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
salt varchar(255) NOT NULL,
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
joined_at datetime NOT NULL,
address text,
INDEX fname_lname (first_name, last_name),
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

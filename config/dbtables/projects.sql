CREATE TABLE projects
(
id int(11) NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL UNIQUE,
abbr varchar(255) NOT NULL,
cnt int(11) NOT NULL DEFAULT 0,
mid int(11) NOT NULL,
created_at datetime NOT NULL,
description text NOT NULL,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

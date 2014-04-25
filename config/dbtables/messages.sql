CREATE TABLE messages
(
id int(11) NOT NULL AUTO_INCREMENT,
sid int(11) NOT NULL,
rid int(11) NOT NULL,
genre int(11) NOT NULL,
project_name varchar(255) NOT NULL,
description text NOT NULL,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tickets
(
id int(11) NOT NULL AUTO_INCREMENT,
pid int(11) NOT NULL,
genre int(11) NOT NULL,
name varchar(255) NOT NULL,
title varchar(255) NOT NULL,
created_at datetime NOT NULL,
priority int(11) NOT NULL,
status int(11) NOT NULL,
rid int(11) NOT NULL,
aid int(11) NOT NULL,
fid int(11) NOT NULL,
description text NOT NULL,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

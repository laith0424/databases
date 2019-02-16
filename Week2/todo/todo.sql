DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo;
USE todo;

CREATE TABLE IF NOT EXISTS users(
    user_id INT( 10 ) NOT NULL AUTO_INCREMENT,
    first_name CHAR( 30 ) NOT NULL DEFAULT '',
    last_name  CHAR( 30 ) NOT NULL DEFAULT '',
    PRIMARY KEY ( user_id )
);


SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS to_do_lists(
    list_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL ,
    description VARCHAR( 1000 ) DEFAULT '',
    completed BOOL NOT NULL DEFAULT FALSE,
    start_date TIMESTAMP,
    due_date TIMESTAMP,
    FOREIGN KEY ( user_id ) REFERENCES users( user_id )
);

CREATE TABLE IF NOT EXISTS items (
    item_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    list_id INT( 10 )  NOT NULL,
    description VARCHAR( 1000 ) DEFAULT '',
    completed BOOL NOT NULL DEFAULT FALSE,
    start_date TIMESTAMP,
    due_date TIMESTAMP,
     FOREIGN KEY ( list_id ) REFERENCES to_do_lists( list_id )
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description VARCHAR( 1000 ) DEFAULT ''
);
CREATE TABLE IF NOT EXISTS items_tags (
    item_id INT( 10 )  NOT NULL ,
    tag_id INT( 10 )  NOT NULL,
     FOREIGN KEY ( item_id ) REFERENCES items( item_id ),
     FOREIGN KEY ( tags_id ) REFERENCES tags( tags_id )
);

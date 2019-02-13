DROP database IF EXISTS todo;
CREATE database todo;
USE todo;

CREATE TABLE IF NOT EXISTS users(
    user_id INT( 10 ) NOT NULL AUTO_INCREMENT,
    first_name CHAR( 30 ) NOT NULL DEFAULT '',
    last_name  CHAR( 30 ) NOT NULL DEFAULT '',
    PRIMARY KEY ( user_id )
);

CREATE TABLE IF NOT EXISTS to_do_lists(
    list_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL ,
    description varchar( 1000 ) DEFAULT '',
    is_done BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY ( user_id ) REFERENCES users( user_id )
);

CREATE TABLE IF NOT EXISTS items (
    item_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    list_id INT( 10 )  NOT NULL,
    description varchar( 1000 ) DEFAULT '',
    is_complited BOOL NOT NULL DEFAULT FALSE,
     FOREIGN KEY ( list_id ) REFERENCES to_do_lists( list_id )
);

CREATE TABLE IF NOT EXISTS tags (
    tags_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description varchar( 1000 ) DEFAULT ''
);
CREATE TABLE IF NOT EXISTS items_tags (
    item_id INT( 10 )  NOT NULL ,
    tags_id INT( 10 )  NOT NULL,
     FOREIGN KEY ( item_id ) REFERENCES items( item_id ),
     FOREIGN KEY ( tags_id ) REFERENCES tags( tags_id )
);

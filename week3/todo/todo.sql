
DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo;
USE todo;

CREATE TABLE IF NOT EXISTS users(
    first_name CHAR( 30 ) NOT NULL DEFAULT '',
    last_name  CHAR( 30 ) NOT NULL DEFAULT '',
    user_name CHAR( 30 ) NOT NULL DEFAULT '' ,
    e_mail  CHAR( 30 ) NOT NULL DEFAULT '' unique,
    PRIMARY KEY ( user_name )
);


SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS to_do_lists(
    list_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_name CHAR( 30 ) NOT NULL DEFAULT '' ,
    description VARCHAR( 1000 ) DEFAULT '',
    FOREIGN KEY ( user_name ) REFERENCES users( user_name )
);

CREATE TABLE IF NOT EXISTS items (
    item_id INT( 10 ) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    list_id INT( 10 )  NOT NULL,
    description VARCHAR( 1000 ) DEFAULT '',
    completed BOOL NOT NULL DEFAULT FALSE,
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
     FOREIGN KEY ( tag_id ) REFERENCES tags( tag_id )
);

CREATE TABLE IF NOT EXISTS reminders(
  reminder_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  list_id INT( 10 )  NOT NULL,
  item_id INT( 10 )  NOT NULL unique,
  reminder VARCHAR( 1000 ) DEFAULT '',
  date TIMESTAMP NOT NULL,
  FOREIGN KEY ( list_id ) REFERENCES to_do_lists( list_id)
);


DROP TRIGGER IF EXISTS `insert_trigger_reminders`;

DELIMITER //

CREATE TRIGGER  `insert_trigger_reminders`

 AFTER INSERT 

 ON items FOR EACH ROW 

 BEGIN   

   INSERT INTO reminders ( list_id , item_id , reminder , date ) values ( NEW.list_id , NEW.item_id , NEW.description ,  NEW.due_date);

 END//
DELIMITER ;


DROP TRIGGER IF EXISTS `update_trigger_reminders`;

DELIMITER //

CREATE TRIGGER update_trigger_reminders

 AFTER UPDATE 

 ON items FOR EACH ROW 

 BEGIN   
	  set @item_id = NEW.item_id;
      IF NEW.completed = TRUE
      THEN 
      delete from reminders where reminders.item_id = @item_id;
      END IF;
      

 END//
DELIMITER ;





DROP TRIGGER IF EXISTS `delete_trigger_reminders`;

DELIMITER //

CREATE TRIGGER delete_trigger_reminders

 AFTER DELETE

 ON items FOR EACH ROW 

 BEGIN
	  set @item_id = OLD.item_id;
      delete from reminders where reminders.item_id = @item_id;
 END//
DELIMITER ;



INSERT INTO tags (tag_id , description) VALUES (1 ,'teaching');
INSERT INTO tags (tag_id , description) VALUES (2 ,'shopping');
INSERT INTO tags (tag_id , description) VALUES (3 ,'studying');
INSERT INTO tags (tag_id , description) VALUES (4 , 'working');
INSERT INTO tags (tag_id , description) VALUES (5 , 'cooking');
INSERT INTO tags (tag_id , description) VALUES (6 , 'training');




/*

create user if not exists 'sam'@localhost identified by '12345';



grant insert , select , update , delete on  todo.items  to 'sam'@localhost;
grant insert , select , update , delete on  todo.items_tags  to 'sam'@localhost;
grant insert , select , update , delete on  todo.reminders  to 'sam'@localhost;
grant insert , select , update , delete on  todo.tags  to 'sam'@localhost;
grant insert , select , update , delete on  todo.to_do_lists  to 'sam'@localhost;
GRANT TRIGGER ON todo.items TO 'sam'@'localhost';


insert into users ( first_name , last_name , user_name , e_mail ) values( 'sam' , 'baderson' , 'sam' , 'sam@hot.com' );

INSERT INTO to_do_lists (list_id , user_name , description) 
VALUES ( 1 , 'sam', 'My action plans for April 2019');



INSERT INTO items (item_id , list_id, description , due_date) 
VALUES (1, 1 , 'studying course 11 about databases', '2019-04-01 08:00:00' );

INSERT INTO items (item_id , list_id, description , due_date) 
VALUES (2, 1 , 'studying course 7 about javascript', '2019-04-01 010:00:00' );

INSERT INTO items (item_id , list_id, description , due_date) 
VALUES (3, 1 , 'Buying  food from Netto', '2019-04-02 10:00:00' );

INSERT INTO items (item_id , list_id, description , due_date) 
VALUES (4, 1 , 'Buying  clothes  from Emporia', '2019-04-02 12:00:00' );

INSERT INTO items (item_id , list_id, description , due_date) 
VALUES (5, 1 , 'training at the Gym', '2019-04-04 12:00:00' );

INSERT INTO items (item_id , list_id, description , due_date) 
VALUES (6, 1 , 'working on database project', '2019-04-06 12:00:00' );

INSERT INTO items (item_id , list_id, description , due_date) 
VALUES (7, 1 , 'working on API project', '2019-04-09 12:00:00' );




INSERT INTO items_tags (item_id, tag_id) VALUES (1, 3);
INSERT INTO items_tags (item_id, tag_id) VALUES (2, 3);
INSERT INTO items_tags (item_id, tag_id) VALUES (3, 2);
INSERT INTO items_tags (item_id, tag_id) VALUES (4, 2);
INSERT INTO items_tags (item_id, tag_id) VALUES (5, 6);
INSERT INTO items_tags (item_id, tag_id) VALUES (6, 4);
INSERT INTO items_tags (item_id, tag_id) VALUES (7, 4);

*/


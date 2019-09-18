DROP USER IF EXISTS 'mysql_user';
CREATE USER 'mysql_user'@'%';

DROP DATABASE IF EXISTS uluwu_development;
CREATE DATABASE IF NOT EXISTS uluwu_development DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL ON uluwu_development.* TO 'mysql_user'@'%' IDENTIFIED BY 'mysql_password';

DROP DATABASE IF EXISTS uluwu_test;
CREATE DATABASE IF NOT EXISTS uluwu_test DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL ON uluwu_test.* TO 'mysql_user'@'%' IDENTIFIED BY 'mysql_password';


CREATE DATABASE DanBookings;
USE DanBookings;
CREATE TABLE WORKS (
  WO_ID VARCHAR(250) PRIMARY KEY DEFAULT(UUID()),
  WO_NAME VARCHAR(250),
  WO_URL VARCHAR(250) UNIQUE,
  WO_ORDER INT,
  WO_IMAGE_URL VARCHAR(250),
  WO_VISIBLE INT DEFAULT(1)
);
CREATE TABLE WORK_DETAILS(
  DETAIL_ID INT AUTO_INCREMENT PRIMARY KEY,
  WO_URL VARCHAR(250) UNIQUE,
  DE_DESCRIPTION VARCHAR(500),
  DE_TITLE VARCHAR (250),
  MAIN_IMG_URL VARCHAR(250),
  FOREIGN KEY(WO_URL) REFERENCES WORKS(WO_URL)
);
CREATE TABLE WORK_DETAILS_MEDIA(
	DETAILS_MEDIA_ID INT AUTO_INCREMENT PRIMARY KEY,
    WO_URL VARCHAR(250),
    URL_MEDIA VARCHAR(250) NOT NULL,
    TYPE_MEDIA VARCHAR(250) DEFAULT('IMG'),
    FOREIGN KEY(WO_URL) REFERENCES WORK_DETAILS(WO_URL)
);

CREATE TABLE USERS(
ID_USER VARCHAR(250) PRIMARY KEY DEFAULT(UUID()),
EMAIL VARCHAR(250) UNIQUE NOT NULL,
ROL varchar(20) DEFAULT ""
);







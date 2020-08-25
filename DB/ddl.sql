USE master;
DROP DATABASE DODGYEDUMACATION;
CREATE DATABASE DODGYEDUMACATION;
USE DODGYEDUMACATION;

GO

IF OBJECT_ID('Session') IS NOT NULL
DROP TABLE [Session];

IF OBJECT_ID('User') IS NOT NULL
DROP TABLE [User];

GO

CREATE TABLE [User]
(
    userid NVARCHAR(50) NOT NULL,
    [password] BINARY(64) NOT NULL,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    userType NVARCHAR(50) NOT NULL,
    CONSTRAINT Pk_User PRIMARY KEY (userid),
    CONSTRAINT userCheck CHECK(userType = 'Student' or userType = 'Staff' or userType = 'Admin')
);

GO

CREATE TABLE [Session]
(
    sessionId INT IDENTITY(1,1) NOT NULL,
    roomCode NVARCHAR(50) NOT NULL,
    sessionStart DATETIME NOT NULL,
    sessionEnd DATETIME,
    sessionType VARCHAR(50) NOT NULL,
    userId NVARCHAR(50) NOT NULL,
    FOREIGN KEY(userid) REFERENCES [User],
    CONSTRAINT Pk_Session PRIMARY KEY (sessionId),
    CONSTRAINT sessionCheck CHECK(sessionType = 'Class' or sessionType = 'Office'),
    CONSTRAINT sessionTime CHECK(sessionStart < sessionEnd)
)

GO

CREATE PROCEDURE GET_REPORT
    @SESSIONSTART DATETIME,
    @SESSIONEND DATETIME,
    @ROOMCODE NVARCHAR(50),
    @SESSIONID INT
AS
BEGIN
    SELECT [Session].sessionStart, [Session].sessionEnd,
        [Session].roomCode, [Session].sessionType,
        Teacher = (SELECT TOP 1
            CONCAT([User].firstName, ' ', [User].lastName)
        FROM [User]
            INNER JOIN [Session] ON [User].userid = [Session].userId
        WHERE [User].userType = 'Staff'
            AND [Session].roomCode = @ROOMCODE
            AND [Session].sessionStart < @SESSIONEND
            AND [Session].sessionEnd > @SESSIONSTART)
    FROM [User]
        INNER JOIN [Session] ON [User].userid = [Session].userId
    WHERE  [Session].sessionID = @SESSIONID
END
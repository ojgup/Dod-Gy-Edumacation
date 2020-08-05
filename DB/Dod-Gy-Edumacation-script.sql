/*
DROP DATABASE DODGYEDUMACATION;
CREATE DATABASE DODGYEDUMACATION;
USE DODGYEDUMACATION;*/

IF OBJECT_ID('Session') IS NOT NULL
DROP TABLE [Session];

IF OBJECT_ID('User') IS NOT NULL
DROP TABLE [User];

GO

CREATE TABLE [User]
(
    userid NVARCHAR(50) NOT NULL,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    userType NVARCHAR(50) NOT NULL
    CONSTRAINT Pk_User PRIMARY KEY (userid),
    CONSTRAINT userCheck CHECK(userType = 'Student' or userType = 'Staff' or userType = 'Admin')
);

INSERT INTO [User]
    (userid, firstName, lastName, userType)
VALUES
    ('103043778', 'John', 'Konstantinou', 'Student'),
    ('103049802x', 'Stephen', 'Grouios', 'Staff');

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
    CONSTRAINT sessionCheck CHECK(sessionType = 'Class' or sessionType = 'Office')
)

INSERT INTO [Session]
    (roomCode, sessionStart, sessionEnd, sessionType, userId)
VALUES
    ('GD224', GETDATE(), NULL, 'Class', '103043778'),
    ('GD224', GETDATE(), NULL, 'Class', '103049802x'),
    ('GD224', GETDATE(), NULL, 'Office', '103049802x');
GO
CREATE PROCEDURE START_SESSION
    @ROOMCODE NVARCHAR (50),
    @SESSIONSTART DATETIME,
    @SESSIONTYPE VARCHAR (50),
    @USERID NVARCHAR (50)
AS
BEGIN
    BEGIN TRAN
    BEGIN TRY

            INSERT INTO [Session]
        (roomCode, sessionStart, sessionEnd, sessionType, userId)
    VALUES(@ROOMCODE, @SESSIONSTART, NULL, @SESSIONTYPE, @USERID)
        
            COMMIT TRAN

            RETURN 1;
        END TRY
        BEGIN CATCH
            ROLLBACK TRAN
                BEGIN
        RETURN 0;
        DECLARE @ERRORMSG NVARCHAR(MAX) = ERROR_MESSAGE();
        THROW 50000, @ERRORMSG, 1
    END
        END CATCH
END

/*DBCC CHECKIDENT([Session], RESEED, 2)
SELECT * FROM SESSION
SELECT * FROM [User]*/
GO

/*EXEC START_SESSION @ROOMCODE = 'GD224', @SESSIONSTART = '2007/05/08 12:35:29', @SESSIONTYPE ='Class', @USERID = '103043778';*/ 


USE Master;
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
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    userType NVARCHAR(50) NOT NULL
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

<<<<<<< HEAD:DB/Dod-Gy-Edumacation-script.sql
INSERT INTO [Session]
    (roomCode, sessionStart, sessionEnd, sessionType, userId)
VALUES
    ('GD224', '2020-01-06 10:30:00.000', '2020-01-06 14:30:00.000', 'Class', '103043778'),
    ('GD224', '2020-01-06 10:00:00.000', '2020-01-06 14:45:00.000', 'Class', '103049802x'),
    ('GD224', '2020-02-06 13:00:00.000', '2020-02-06 17:00:00.000', 'Class', '103043778'),
    ('GD224', '2020-02-06 13:15:00.000', '2020-02-06 16:55:00.000', 'Class', '103049802x'),
    ('AC123', '2020-03-06 10:00:00.000', '2020-03-06 14:00:00.000', 'Class', '103043778'),
    ('CD222', '2020-03-06 10:00:00.000', '2020-03-06 14:00:00.000', 'Class', '103049802x');
=======
>>>>>>> 65cc0eaeca6f78e63f5ff667a7eca939a51fc90d:DB/ddl.sql
GO

CREATE PROCEDURE START_SESSION
    @ROOMCODE NVARCHAR (50),
    @SESSIONSTART NVARCHAR(MAX),
    @SESSIONTYPE VARCHAR (50),
    @USERID NVARCHAR (50)
AS
BEGIN
    BEGIN TRANSACTION
    BEGIN TRY
        IF EXISTS (SELECT *
        FROM [Session]
        WHERE userId = @USERID AND sessionEnd IS NULL)
            THROW 51000, 'This user has an open session', 1;
        ELSE
            INSERT INTO [Session]
                (roomCode, sessionStart, sessionEnd, sessionType, userId)
            VALUES
                (@ROOMCODE, @SESSIONSTART, NULL, @SESSIONTYPE, @USERID);

        COMMIT TRAN

        RETURN @@IDENTITY
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN
        IF ERROR_NUMBER() = 51000
            THROW;
        ELSE
            BEGIN
                DECLARE @ERRORMSG NVARCHAR(MAX) = ERROR_MESSAGE();
                THROW 50000, @ERRORMSG, 1
            END
    END CATCH
END

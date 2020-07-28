IF OBJECT_ID('Session') IS NOT NULL
DROP TABLE [Session];

IF OBJECT_ID('User') IS NOT NULL
DROP TABLE [User];

GO

CREATE TABLE [User](
    userid NVARCHAR(50) NOT NULL,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    CONSTRAINT Pk_User PRIMARY KEY (userid)
);

INSERT INTO [User] (userid, firstName, lastName) VALUES
('103043778','John','Konstantinou'),
('103049802x','Stephen','Grouios');

CREATE TABLE [Session](
    userid NVARCHAR(50) NOT NULL,
    roomCode NVARCHAR(50) NOT NULL,
    sessionStart DATETIME NOT NULL,
    sessionEnd DATETIME,
    sessionType VARCHAR(50) NOT NULL,
    FOREIGN KEY(userid) REFERENCES [User],
    CONSTRAINT Pk_Session PRIMARY KEY (userid,sessionStart),
    CONSTRAINT CheckType CHECK(sessionType = 'Class' or sessionType = 'Office')
)

INSERT INTO [Session] (userid, roomCode,sessionStart,sessionEnd,sessionType) VALUES
('103043778','Room1',GETDATE(),NULL,'Class'),
('103049802x','Office1',GETDATE(),NULL,'Ofice');
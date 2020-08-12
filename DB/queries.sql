/*DBCC CHECKIDENT([Session], RESEED, 2)
DELETE FROM [Session] WHERE sessionId = 3
SELECT * FROM SESSION
SELECT [Session].*, [User].userType FROM [SESSION] INNER JOIN [User] ON [User].userId = [Session].userId 
SELECT * FROM [User]*/
/*UPDATE [Session] SET sessionEnd = GETDATE() WHERE sessionId = 1
/*EXEC START_SESSION @ROOMCODE = 'GD224', @SESSIONSTART = '2021-01-06 17:16:40.000', @SESSIONTYPE ='Class', @USERID = '103043778';
USE Master
USE DODGYEDUMACATION
*/ 

/*sessionStart >= '2021-01-06 17:16:40.000',

sessionType ='Class',  = '103043778';*/

/*
DECLARE @START DATETIME = '2020-01-06 10:30:00.000';
DECLARE @END DATETIME = '2020-01-06 14:30:00.000';
SELECT * FROM [Session] INNER JOIN [User] ON [User].userId
= [Session].userId WHERE [User].userType = 'Staff' AND 
[Session].sessionStart < @START AND [Session].sessionEnd >
*/




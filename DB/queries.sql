/*DBCC CHECKIDENT([Session], RESEED, 10)
DELETE FROM [Session] WHERE sessionId = 3
SELECT * FROM SESSION
SELECT [Session].*, [User].userType FROM [SESSION] INNER JOIN [User] ON [User].userId = [Session].userId 
SELECT * FROM [User]
*/

/*DELETE FROM [Session] WHERE sessionId > 10*/

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

/*EXEC GET_REPORT @SESSIONSTART = '2020-01-08 15:00:00.000', @SESSIONEND = '2020-01-08 18:00:00.000', 
@ROOMCODE ='GD224' , @SESSIONID = 3;*/

/*UPDATE [Session] SET sessionStart = '2020-08-18 12:45:00.000'
WHERE sessionId = 15*/




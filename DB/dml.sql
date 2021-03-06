USE DODGYEDUMACATION;

GO

INSERT INTO [User]
    (userid, [password], firstName, lastName, userType)
VALUES
    ('103043778', HASHBYTES('SHA2_512', 'student'), 'John', 'Konstantinou', 'Student'),
    ('123456789', HASHBYTES('SHA2_512', 'student'), 'Jason', 'Yeggs', 'Student'),
    ('103049802x', HASHBYTES('SHA2_512', 'staff'), 'Stephen', 'Grouios', 'Staff'),
    ('123456789x', HASHBYTES('SHA2_512', 'staff'), 'Boutros', 'Ghali', 'Staff'),
    ('123456789a', HASHBYTES('SHA2_512', 'admin'), 'Yeggs', 'Malone', 'Admin');
GO

INSERT INTO [Session]
    (roomCode, sessionStart, sessionEnd, sessionType, userId)
VALUES
    ('GD224', '2020-01-06 15:00:00.000', '2020-01-06 18:00:00.000', 'Class', '103043778'),
    ('GD224', '2020-01-07 15:00:00.000', '2020-01-07 18:00:00.000', 'Class', '103043778'),
    ('GD224', '2020-01-08 15:00:00.000', '2020-01-08 18:00:00.000', 'Class', '103043778'),
    ('GD224', '2020-01-06 15:00:00.000', '2020-01-06 18:00:00.000', 'Class', '123456789'),
    ('GD224', '2020-01-06 16:00:00.000', '2020-01-06 20:00:00.000', 'Class', '103049802x'),
    ('GD225', '2020-01-06 13:00:00.000', '2020-01-06 20:00:00.000', 'Class', '123456789x'),
    ('GD224', '2020-01-07 13:00:00.000', '2020-01-07 20:00:00.000', 'Class', '123456789x'),
    ('GD224', '2020-01-08 13:00:00.000', '2020-01-08 20:00:00.000', 'Class', '123456789x'),
    ('GD224', '2020-02-06 10:16:40.000', '2020-02-06 15:16:40.000', 'Class', '103043778'),
    ('GD224', '2020-02-06 12:16:40.000', '2020-02-06 15:16:40.000', 'Class', '103049802x'),
    ('GD224', '2020-08-30 12:16:40.000', NULL, 'Class', '123456789');
GO
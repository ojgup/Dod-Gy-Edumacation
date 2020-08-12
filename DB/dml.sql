INSERT INTO [User]
    (userid, firstName, lastName, userType)
VALUES
    ('103043778', 'John', 'Konstantinou', 'Student'),
    ('103049802x', 'Stephen', 'Grouios', 'Staff');

INSERT INTO [Session]
    (roomCode, sessionStart, sessionEnd, sessionType, userId)
VALUES
    ('GD224', '2020-01-06 17:16:40.000', '2020-01-06 20:16:40.000', 'Class', '103043778'),
    ('GD224', '2020-01-06 17:16:40.000', '2020-01-06 20:16:40.000', 'Class', '103049802x'),
    ('GD224', '2020-02-06 10:16:40.000', '2020-02-06 15:16:40.000', 'Class', '103043778'),
    ('GD224', '2020-01-06 17:16:40.000', '2020-02-06 15:16:40.000', 'Class', '103049802x');
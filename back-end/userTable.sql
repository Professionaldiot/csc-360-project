CREATE DATABASE SelfService;
USE SelfService;
CREATE TABLE Users (
    user_ID int,
    user_name varchar(255),
    passcode varchar(255),
    user_type varchar(127),
    PRIMARY KEY (user_ID)
);
INSERT INTO Users (user_ID, user_name, passcode, user_type)
VALUES
(1, "jsmith", "P@ss1234", "student"),
(2, "mjones", "Secur3#5", "student"),
(3, "alee", "abcD!234", "faculty"),
(4, "bking", "Qwerty#6", "student"),
(5, "cgarcia", "Pass#789", "faculty"),
(6, "dmartinez", "SafeP@55", "student"),
(7, "eflores", "987Xyz!", "student"),
(8, "hthompson", "Login123", "faculty"),
(9, "lroberts", "MyPass#9", "registrar"),
(10, "mclark", "New@Pass", "student"),
(11, "abrown", "Stud3nt#1", "student"),
(12, "jwilson", "P@ssW0rd", "registrar"),
(13, "kdavis", "Hel10#45", "student"),
(14, "mwhite", "Secure#21", "student"),
(15, "kmoore", "Acce$$89", "student"),
(16, "jyoung", "EntrY@55", "student"),
(17, "jhall", "Lock3r#2", "student"),
(18, "tlopez", "Uniqu3#12", "student"),
(19, "wwright", "SafeKey#3", "student"),
(20, "jgreen", "MyAcc3ss!", "student");
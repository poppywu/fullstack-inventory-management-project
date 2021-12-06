The mysql Docker image automatically runs files with the .sql extension in ALPHABETICAL ORDER,
so it is important to keep the names as they are! (buildSchema.sql, dataMocks.sql)

Eventually, it might be good to come up with a more robust setup. Maybe put everything in a single
sqldump and just run that.

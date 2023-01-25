import SQLite from "react-native-sqlite-storage"

export const db = SQLite.openDatabase('local_survey.sqlite')

db.executeSql('PRAGMA foreign_keys = ON')

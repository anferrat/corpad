import SQLite from "react-native-sqlite-storage"

export const db = SQLite.openDatabase('SURVEY_PIPELINE_CURRENT.db')

db.executeSql('PRAGMA foreign_keys = ON')

export const schemaVersion = 2

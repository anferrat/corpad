//import { db } from "../config/database"
import { db } from "../../api/database" //jsut for test
import { SortingOptions } from "../entities/survey/other/properties"

export class SQLiteRepository {
    tables = {
        TEST_POINT_TABLE: 'testPoints',
        RECTIFIER_TABLE: 'rectifiers',
        PIPELINE_TABLE: 'pipelines',
        TEST_POINT_SUBITEM_TABLE: 'potentials',
        RECTIFIER_SUBITEM_TABLE: 'potentials',
        POTENTIAL_TYPE_TABLE: 'potentialTypes',
        REFERENCE_CELL_TABLE: 'referenceCells',
        RECTIFIER_SUBITEM_TABLE: 'circuits',
        POTENTIAL_TABLE: 'potentials',
    }

    //Yeah this is my sorting, there is no in-bult natural sorting
    natSortASC = ` ORDER BY 
        (CASE
        WHEN (CAST(name AS INTEGER)==0 AND substr(name, 1) <> '0') THEN NULL
        ELSE CAST(name AS INTEGER)
        END) ASC NULLS LAST,
        (CASE
        WHEN (name IS NULL) OR (length(name)==1) OR ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN substr(name, 1, length(name)-1) COLLATE NOCASE
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'000')) THEN substr(name, 1, length(name)-2) COLLATE NOCASE
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'0000')) THEN substr(name, 1, length(name)-3) COLLATE NOCASE
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00000')) THEN substr(name, 1, length(name)-4) COLLATE NOCASE
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'000000')) THEN substr(name, 1, length(name)-5) COLLATE NOCASE
        ELSE substr(name, 1, length(name)-6) COLLATE NOCASE
        END),
        (CASE
        WHEN ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN CAST(substr(name, -1) AS INTEGER)
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'00')) THEN CAST(substr(name, -2) AS INTEGER)
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'00')) THEN CAST(substr(name, -3) AS INTEGER)
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00')) THEN CAST(substr(name, -4) AS INTEGER)
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'00')) THEN CAST(substr(name, -5) AS INTEGER)
        ELSE CAST(substr(name, -6) AS INTEGER)
        END) NULLS FIRST,
        name`
    natSortDESC = ` ORDER BY 
        (CASE
        WHEN (CAST(name AS INTEGER)==0 AND substr(name, 1) <> '0') THEN NULL
        ELSE CAST(name AS INTEGER)
        END) DESC NULLS FIRST, 
        (CASE
        WHEN (name IS NULL) OR (length(name)==1) OR ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN substr(name, 1, length(name)-1) COLLATE NOCASE 
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'000')) THEN substr(name, 1, length(name)-2) COLLATE NOCASE
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'0000')) THEN substr(name, 1, length(name)-3) COLLATE NOCASE
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00000')) THEN substr(name, 1, length(name)-4) COLLATE NOCASE
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'000000')) THEN substr(name, 1, length(name)-5) COLLATE NOCASE
        ELSE substr(name, 1, length(name)-6) COLLATE NOCASE
        END) DESC,
        (CASE
        WHEN ((CAST(substr(name, -1) AS INTEGER)==0) AND substr(name, -1) <> '0' ) THEN NULL
        WHEN ((CAST(substr(name, -2) AS INTEGER)==0) AND (substr(name, -2) <>'00')) THEN CAST(substr(name, -1) AS INTEGER)
        WHEN ((CAST(substr(name, -3) AS INTEGER)==0) AND (substr(name, -3) <>'00')) THEN CAST(substr(name, -2) AS INTEGER)
        WHEN ((CAST(substr(name, -4) AS INTEGER)==0) AND (substr(name, -4) <>'00')) THEN CAST(substr(name, -3) AS INTEGER)
        WHEN ((CAST(substr(name, -5) AS INTEGER)==0) AND (substr(name, -5) <>'00')) THEN CAST(substr(name, -4) AS INTEGER)
        WHEN ((CAST(substr(name, -6) AS INTEGER)==0) AND (substr(name, -6) <>'00')) THEN CAST(substr(name, -5) AS INTEGER)
        ELSE CAST(substr(name, -6) AS INTEGER)
        END) DESC,
        name DESC
        `

    constructor() {
        this.db = db
    }

    getSortingQuery(sorting, latitude = undefined, longitude = undefined) {
        switch (sorting) {
            case SortingOptions.ASCENDING_NAME:
                return this.natSortASC
            case SortingOptions.DESCENDING_NAME:
                return this.natSortDESC
            case SortingOptions.NEW_TO_OLD:
                return ' ORDER BY timeModified DESC'
            case SortingOptions.OLD_TO_NEW:
                return ' ORDER BY timeModified ASC'
            case SortingOptions.NEAREST:
                if (latitude && longitude)
                    return ' ORDER BY ((latitude-' + latitude + ')*(latitude-' + latitude + ')) + ((longitude - ' + longitude + ')*(longitude - ' + longitude + ')) ASC NULLS LAST'
                else ''
            default: ''
        }
    }

    generateArray(index, item, array = []) {
        if (index > 0)
            return this.generateArray(index - 1, item, [item(index - 1)].concat(array))
        else return array
    }

    runSingleQueryTransaction(query, params = []) {
        return new Promise((resolve, reject) => {
            try {
                this.db.transaction(tx =>
                    tx.executeSql(query, params,
                        (_, result) => resolve(result),
                        (_, err) => {
                            reject(err)
                        }
                    )
                )
            }
            catch (err) {
                reject(err)
            }
        })
    }

    convertArrayToInStatement(array) {
        return array.length === 0 ? '()' : '("' + array.join('", "') + '")'
    }

    runMultiQueryTransaction(callback) {
        return new Promise((resolve, reject) => {
            try {
                let result
                this.db.transaction(tx => {
                    result = callback(tx)
                },
                    (err) => reject(err),
                    () => {
                        Promise.all(result)
                            .then(res => resolve(res))
                            .catch(err => reject(err))
                    })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    runQuery(transaction, query, params = []) {
        //Always resolve, since errors in queries will be caugth at the transaction level
        return new Promise((resolve) => {
            try {
                transaction.executeSql(query, params,
                    (_, res) => resolve(res),
                    (_, err) => resolve(err)
                )
            }
            catch (err) {
                resolve(err)
            }
        }
        )
    }
}
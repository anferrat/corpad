//import { db } from "../config/database"
import { db } from "../../api/database" //jsut for test

export class SQLiteRepository {
    constructor() {
        this.db = db
    }

    generateArray(index, item, array = []) {
        //get array of objects from query
        if (index > 0)
            return this.generateArray(index - 1, item, [item(index - 1)].concat(array))
        else return array
    }

    convertArrayToInStatement(array) {
        // for queries like WHERE myField IN (...)
        return array.length === 0 ? '()' : '("' + array.join('", "') + '")'
    }


    runSingleQueryTransaction(query, params = []) {
        return new Promise((resolve, reject) => {
            try {
                this.db.transaction(tx =>
                    tx.executeSql(query, params,
                        (_, result) => resolve(result),
                        (err) => {
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
                    (_, err) => resolve(err))
            }
            catch (err) {
                resolve(err)
            }
        }
        )
    }
}
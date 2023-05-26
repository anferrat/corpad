import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"

export class TestRepository extends SQLiteRepository {
    constructor() {
        super()

    }

    async test(query) {
        try {
            const result = await super.runSingleQueryTransaction(`${query}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Test failed with error: ${err}`, err)
        }
    }
}

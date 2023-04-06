import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { ItemResponseProcessor } from "./utils/ItemResponseProcessor"
import { SubitemResponseProcessor } from "./utils/SubitemResponseProcessor"


export class TestRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new ItemResponseProcessor()
        this.subitemProcessor = new SubitemResponseProcessor()
    }

    async test(query) {
        try {
            const result = await super.runSingleQueryTransaction(`${query}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
        }
        catch (err) {
            throw new Error('DatabaseError', `Test failed with error: ${err}`, err)
        }
    }
}

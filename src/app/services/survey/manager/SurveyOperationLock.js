import { Error, errors } from "../../../utils/Error"

export class SurveyOperationLock {
    constructor() {
        this.inProgress = false
    }

    async execute(operation) {
        if (this.inProgress)
            throw new Error(errors.GENERAL, 'Survey operation is already in progress', 'Survey operation is already in progress', 101)

        this.inProgress = true
        try {
            return await operation()
        }
        finally {
            this.inProgress = false
        }
    }
}

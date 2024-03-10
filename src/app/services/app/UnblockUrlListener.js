import { urlListener } from "../../config/urlListener";

export class UnblockUrlListener {
    constructor() {

    }

    execute() {
        urlListener.inProgress = false
    }
}
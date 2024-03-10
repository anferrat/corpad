import { urlListener } from "../../config/urlListener";

export class BlockUrlListener {
    constructor() {
    }
    //Url resolver checks urlListener.inProgress before start resolving incoming URL. block resolver before expensive computing
    execute() {
        urlListener.inProgress = true
    }
}
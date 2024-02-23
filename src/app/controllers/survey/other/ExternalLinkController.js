import { GenerateCompositeItem } from "../../../services/byte_converter/GenerateCompositeItem"
import { LinkDecoder } from "../../../services/byte_converter/decode/LinkDecoder"
import { ConvertLinkToItem } from "../../../services/survey/other/external_link/ConvertLinkToItem"
import { Controller } from "../../../utils/Controller"
import { subitemFactory } from "../../_instances/general_services"
import { defaultNameRepo } from "../../_instances/repositories"

class ExternalLinkController extends Controller {
    constructor(defaultNameRepo, subitemFactory, linkDecoder) {
        super()
        this.generateCompositeItem = new GenerateCompositeItem(defaultNameRepo, subitemFactory)
        this.convertLinkToItem = new ConvertLinkToItem(linkDecoder, this.generateCompositeItem)
    }


    decodeLink({ link }, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 622, () => {
            return this.convertLinkToItem.execute(link)
        })
    }
}

const externalLinkController = new ExternalLinkController(defaultNameRepo, subitemFactory, new LinkDecoder())

export const decodeLink = ({ link }, onError, onSuccess) => externalLinkController.decodeLink({ link }, onError, onSuccess)
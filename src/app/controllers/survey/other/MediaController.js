import { AddPhotoToAssets } from "../../../services/survey/other/photos/AddPhotoToAssets"
import { DeletePhotoFromAssets } from "../../../services/survey/other/photos/DeletePhotoFromAssets"
import { Controller } from "../../../utils/Controller"
import { documentPicker, imagePicker, shareService } from "../../_instances/general_services"
import { assetRepo, fileSystemRepo } from "../../_instances/repositories"

class MediaController extends Controller {
    constructor(fileSystemRepo, assetRepo, imagePicker, documentPicker, shareService) {
        super()
        this.addPhotoToAssetsService = new AddPhotoToAssets(assetRepo, imagePicker, fileSystemRepo, documentPicker)
        this.deletePhotoFromAssetsService = new DeletePhotoFromAssets(fileSystemRepo, assetRepo)
        this.shareService = shareService
    }

    addPhotoToAssets(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 432, async () => {
            const { itemId, itemType, imageSource, surveyUid } = params
            return this.addPhotoToAssetsService.execute(itemId, itemType, imageSource, surveyUid)
        })
    }

    deletePhotoFromAssets(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 433, async () => {
            const { assetId, fileName, parentType, parentId, surveyUid } = params
            return this.deletePhotoFromAssetsService.execute(assetId, fileName, parentId, parentType, surveyUid)
        })
    }

    sharePhoto(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 430, async () => {
            const { uri, mimeType } = params
            return this.shareService.shareFile(uri, mimeType)
        })
    }

}

const mediaController = new MediaController(
    fileSystemRepo,
    assetRepo,
    imagePicker,
    documentPicker,
    shareService
)

export const addPhotoToAssets = ({ itemId, itemType, imageSource, surveyUid }, onError, onSuccess) => mediaController.addPhotoToAssets({ itemId, itemType, imageSource, surveyUid }, onError, onSuccess)

export const deletePhotoFromAssets = ({ assetId, fileName, parentType, parentId, surveyUid }, onError, onSuccess) => mediaController.deletePhotoFromAssets({ assetId, fileName, parentType, parentId, surveyUid }, onError, onSuccess)

export const sharePhoto = ({ uri, mimeType }, onError, onSuccess) => mediaController.sharePhoto({ uri, mimeType }, onError, onSuccess)
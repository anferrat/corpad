import { AddPhotoToAssets } from "../../../services/survey/other/photos/AddPhotoToAssets"
import { DeletePhotoFromAssets } from "../../../services/survey/other/photos/DeletePhotoFromAssets"
import { GetNewPhoto } from "../../../services/survey/other/photos/GetNewPhoto"
import { SavePhotoToDownloads } from "../../../services/survey/other/photos/SavePhotoToDownloads"
import { SharePhoto } from "../../../services/survey/other/photos/SharePhoto"
import { UpdateItemPhotos } from "../../../services/survey/other/photos/UpdateItemPhotos"
import { GetAllAssets } from "../../../services/survey_file/assets/GetAllAssets"
import { Controller } from "../../../utils/Controller"
import { createAssetFileService, deleteAssetFileService } from "../../_instances/assets"
import { documentPicker, fileNameGenerator, imagePicker, permissions, shareService } from "../../_instances/general_services"
import { assetRepo, fileSystemRepo } from "../../_instances/repositories"

class MediaController extends Controller {
    constructor(fileSystemRepo, assetRepo, imagePicker, documentPicker, shareService, createAssetFileService, deleteAssetFileService, permissions, fileNameGenerator) {
        super()
        this.addPhotoToAssetsService = new AddPhotoToAssets(assetRepo, fileSystemRepo, createAssetFileService)
        this.deletePhotoFromAssetsService = new DeletePhotoFromAssets(deleteAssetFileService, assetRepo)
        this.getNewPhotoService = new GetNewPhoto(imagePicker, documentPicker)
        this.updateItemPhotosService = new UpdateItemPhotos(assetRepo, fileSystemRepo, createAssetFileService, deleteAssetFileService)
        this.sharePhotoService = new SharePhoto(shareService)
        this.savePhotoToDownloadsService = new SavePhotoToDownloads(fileSystemRepo, permissions, fileNameGenerator)
        this.getAllAssetsService = new GetAllAssets(assetRepo, fileSystemRepo)
    }

    addPhotoToAssets(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 432, async () => {
            const { uri, name, itemId, itemType } = params
            return this.addPhotoToAssetsService.execute(uri, name, itemId, itemType)
        })
    }

    deletePhotoFromAssets(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 433, async () => {
            const { assetId, fileName, parentType, parentId } = params
            return this.deletePhotoFromAssetsService.execute(assetId, fileName, parentId, parentType)
        })
    }

    sharePhoto(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 430, async () => {
            const { uri } = params
            return this.sharePhotoService.execute(uri)
        })
    }

    savePhotoToDownloads(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 430, async () => {
            const { path, name } = params
            return this.savePhotoToDownloadsService.execute(path, name)
        })
    }

    getNewPhoto(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 432, async () => {
            const { imageSource } = params
            return this.getNewPhotoService.execute(imageSource)
        })
    }

    updateItemPhotos(params, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 432, async () => {
            const { imageUris, itemId, itemType } = params
            return this.updateItemPhotosService.execute(imageUris, itemId, itemType)
        })
    }

    getAll(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 438, async () => {
            return this.getAllAssetsService.execute()
        })
    }


}

const mediaController = new MediaController(
    fileSystemRepo,
    assetRepo,
    imagePicker,
    documentPicker,
    shareService,
    createAssetFileService,
    deleteAssetFileService,
    permissions,
    fileNameGenerator
)

export const addPhotoToAssets = ({ uri, name, itemId, itemType }, onError, onSuccess) => mediaController.addPhotoToAssets({ uri, name, itemId, itemType }, onError, onSuccess)

export const deletePhotoFromAssets = ({ assetId, fileName, parentType, parentId }, onError, onSuccess) => mediaController.deletePhotoFromAssets({ assetId, fileName, parentType, parentId }, onError, onSuccess)

export const sharePhoto = ({ uri }, onError, onSuccess) => mediaController.sharePhoto({ uri }, onError, onSuccess)

export const savePhotoToDownloads = ({ path, name }, onError, onSuccess) => mediaController.savePhotoToDownloads({ path, name }, onError, onSuccess)

export const getNewPhoto = ({ imageSource }, onError, onSuccess) => mediaController.getNewPhoto({ imageSource }, onError, onSuccess)

export const updateItemPhotos = ({ imageUris, itemId, itemType }, onError, onSuccess) => mediaController.updateItemPhotos({ imageUris, itemId, itemType }, onError, onSuccess)

export const getSurveyAssetList = (onError, onSuccess) => mediaController.getAll(onError, onSuccess)
import { Controller } from '../../../utils/Controller'
import { GetLocale } from '../../../services/other/localization/GetLocale'
import { UpdateLocale } from '../../../services/other/localization/UpdateLocale'
import { settingRepo } from '../../_instances/repositories'

class LocalizationController extends Controller {
    constructor(settingRepo) {
        super()
        this.getLocaleService = new GetLocale(settingRepo)
        this.updateLocaleService = new UpdateLocale(settingRepo)
    }

    getLocale(onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 637, () => this.getLocaleService.execute())
    }

    updateLocale(locale, onError = null, onSuccess = null) {
        return super.controllerHandler(onSuccess, onError, 637, () => this.updateLocaleService.execute(locale))
    }
}

const localizationController = new LocalizationController(settingRepo)

export const getLocale = (onError, onSuccess) => localizationController.getLocale(onError, onSuccess)

export const updateLocale = (locale, onError, onSuccess) => localizationController.updateLocale(locale, onError, onSuccess)

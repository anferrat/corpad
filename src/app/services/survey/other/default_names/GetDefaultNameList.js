export class GetDefaulNameList {
    constructor(defaultNameRepo, settingRepo, defaultNamePresenter) {
        this.settingRepo = settingRepo
        this.defaultNameRepo = defaultNameRepo
        this.defaultNamePresenter = defaultNamePresenter
    }

    async execute() {
        const [defaultNames, settings] = await Promise.all([
            this.defaultNameRepo.getAll(),
            this.settingRepo.get()
        ])
        return this.defaultNamePresenter.execute(defaultNames, settings.pipelineNameAsDefault)
    }
}
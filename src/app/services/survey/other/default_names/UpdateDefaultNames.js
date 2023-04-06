export class UpdateDefaultNames {
    constructor(defaultNameRepo, settingRepo) {
        this.defaultNameRepo = defaultNameRepo
        this.settingRepo = settingRepo
    }

    async execute(defaultNames, pipelineNameAsDefault) {
        return await Promise.all([
            this.defaultNameRepo.updateAll(defaultNames),
            this.settingRepo.updatePipelineNameAsDefault(pipelineNameAsDefault)
        ])
    }
}
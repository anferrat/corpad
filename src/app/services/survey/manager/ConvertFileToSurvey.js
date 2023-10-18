import { Error, errors } from "../../../utils/Error"

export class ConvertFileToSurvey {
    constructor(surveyFileConverterInput, surveyFileValidation, warningHandler) {
        this.surveyFileConverterInput = surveyFileConverterInput
        this.surveyFileValidation = surveyFileValidation
        this.warningHandler = warningHandler
    }

    async execute(content) {
        const { valid, corrupted } = this.surveyFileValidation.validateFile(content)
        const surveyFileVersion = this.surveyFileValidation.getVersion(content)
        if (!valid) {
            throw new Error(errors.GENERAL, 'Unable to convert file to survey', 'File format is not valid.', 437)
        }
        else {
            try {
                if (!corrupted)
                    return {
                        surveyFile: this.surveyFileConverterInput.execute(content, surveyFileVersion),
                        isRecovered: false
                    }
                else {
                    const confirm = await this.warningHandler.execute('Survey file is corrupted. Opening this file may erase some of its content. If you encountered lost data after opening, use "Exit without saving" feature in Settings to avoid original file to be ovewritten. Contact support for help with recovering data.',
                        'Proceed',
                        'Cancel')
                    if (confirm) {
                        const recovered = this.surveyFileValidation.recoverFile(content)
                        return {
                            surveyFile: this.surveyFileConverterInput.execute(recovered, surveyFileVersion),
                            isRecovered: true
                        }
                    }
                    else throw new Error(errors.GENERAL, 'Recovering survey cancelled', 'User cancelled operation', 101)
                }
            }
            catch (er) {
                throw new Error(errors.GENERAL, 'Unable to convert file to survey', 'File format is not valid.', 437)
            }
        }
    }
}
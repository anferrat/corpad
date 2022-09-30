import { validateSurvey } from "./validation"

export const generateMetaData = (fileName, surveyObject, timeModified, filePath = null, hash = null, isCloud = false, cloudId = null) => {
    const validation = validateSurvey(surveyObject)
    if (validation.status === 200) {
        return {
            name: surveyObject.data.survey[0][1],
            tpCount: surveyObject.data.testPoints.length,
            rectifierCount: surveyObject.data.rectifiers.length,
            pipelineCount: surveyObject.data.pipelines.length,
            good: surveyObject.data.testPoints.filter(tp => (tp[8] ?? -1) === 0).length,
            timeModified: timeModified,
            uid: surveyObject.data.survey[0][0],
            filePath: filePath,
            hash: hash,
            isCloud: isCloud,
            cloudId: cloudId,
            fileName: fileName,
        }
    }
    else return null
}
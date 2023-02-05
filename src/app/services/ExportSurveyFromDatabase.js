import { PotentialRepository } from "../repository/sqlite/PotentialRepository";
import { PotentialTypeRepository } from "../repository/sqlite/PotentialTypeRepository";
import { RectifierRepository } from "../repository/sqlite/RectifierRepository";
import { ReferenceCellRepository } from "../repository/sqlite/ReferenceCellRepository";
import { SubitemRepository } from "../repository/sqlite/SubitemRepository";
import { SurveyRepository } from "../repository/sqlite/SurveyRepository";
import { TestPointRepository } from "../repository/sqlite/TestPointRepository";

export class ExportSurveyFromDatabase {
    constructor() {
        this.testPointRepo = new TestPointRepository()
        this.rectifierRepo = new RectifierRepository()
        this.referenceCellRepo = new ReferenceCellRepository()
        this.potentialTypeRepo = new PotentialTypeRepository()
        this.subitemRepo = new SubitemRepository()
        this.potentialRepo = new PotentialRepository()
        this.surveyRepo = new SurveyRepository()
    }

    execute() {
       
    }

}
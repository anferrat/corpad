import { BasicPresenter } from "../../presenters/BasciPresenter";
import { DefaultNamePresenter } from "../../presenters/DefaultNamePresenter";
import { ImportDataPresenter } from "../../presenters/ImportDataPresenter";
import { ItemPreseneter } from "../../presenters/ItemPresenter";
import { ListPresenter } from "../../presenters/ListPresenter";
import { MapLayerPresenter } from "../../presenters/MapLayerPresenter";
import { PotentialPresenter } from "../../presenters/PotentialPresenter";
import { PotentialTypePresenter } from "../../presenters/PotentialTypePresenter";
import { SubitemPresenter } from "../../presenters/SubitemPresenter";
import { SurveyFileListPresenter } from "../../presenters/SurveyFileListPresenter";
import { geoJsonPointExtractor } from "./converters";

export const basicPresenter = new BasicPresenter()

export const defaultNamePresenter = new DefaultNamePresenter()

export const importDataPresenter = new ImportDataPresenter()

export const itemPresenter = new ItemPreseneter()

export const listPresenter = new ListPresenter()

export const potentialPresenter = new PotentialPresenter()

export const potentialTypePresenter = new PotentialTypePresenter()

export const subitemPresenter = new SubitemPresenter()

export const surveyFileListPresenter = new SurveyFileListPresenter()

export const mapLayerPresenter = new MapLayerPresenter(geoJsonPointExtractor)
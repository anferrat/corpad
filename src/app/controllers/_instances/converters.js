import { GeoJsonParser } from "../../converters/geoJson/GeoJsonParser";
import { GeoJsonPointExtractor } from "../../converters/geoJson/GeoJsonPointExtractor";
import { SurveyFileConverterInput } from "../../converters/survey_file/SurveyFileConverterInput";
import { SurveyFileConverterOutput } from "../../converters/survey_file/SurveyFileConverterOutput";
import { ConvertPotentialUnits } from "../../services/survey/subitems/potentials/ConvertPotentialUnits";
import { ConvertSubitemUnits } from "../../services/survey/subitems/subitem/ConvertSubitemUnits";
import { subitemFactory, unitConverter } from "./general_services";

export const surveyFileConverterOutput = new SurveyFileConverterOutput()

export const surveyFileConverterInput = new SurveyFileConverterInput(subitemFactory)

export const geoJsonPointExtractor = new GeoJsonPointExtractor()

export const geoJsonParser = new GeoJsonParser()

export const convertPotentialUnits = new ConvertPotentialUnits(unitConverter)

export const convertSubitemUnits = new ConvertSubitemUnits(unitConverter)
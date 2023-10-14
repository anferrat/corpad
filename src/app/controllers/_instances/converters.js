import { GeoJsonPointExtractor } from "../../converters/geoJson/GeoJsonPointExtractor";
import { SurveyFileConverterInput } from "../../converters/survey_file/SurveyFileConverterInput";
import { SurveyFileConverterOutput } from "../../converters/survey_file/SurveyFileConverterOutput";
import { subitemFactory } from "./general_services";

export const surveyFileConverterOutput = new SurveyFileConverterOutput()

export const surveyFileConverterInput = new SurveyFileConverterInput(subitemFactory)

export const geoJsonPointExtractor = new GeoJsonPointExtractor()
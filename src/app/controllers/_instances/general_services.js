import { GetMapRegionFromBbox } from "../../services/location/GetMapRegionFromBbox";
import { AppStateListener } from "../../services/other/AppStateListenerService";
import { CommaSeparatedFileParser } from "../../services/other/CommaSeparatedFileParser";
import { DocumentPicker } from "../../services/other/DocumentPicker";
import { FileNameGenerator } from "../../services/other/FileNameGenerator";
import { GeolocationCalculator } from "../../services/other/GeolocationCalculator";
import { ImagePicker } from "../../services/other/ImagePicker";
import { Linking } from "../../services/other/Linking";
import { OpenInExternalApp } from "../../services/other/OpenInExternalApp";
import { Permissions } from "../../services/other/Permissions";
import { Share } from "../../services/other/Share";
import { SubitemFactory } from "../../services/other/SubitemFactory";
import { UnitConverter } from "../../services/other/UnitConverter";
import { WarningHandler } from "../../services/other/WarningHandler";
import { MultimeterFactory } from "../../services/survey/other/multimeter/_devices/MultimeterFactory";
import { GeoJsonValidation } from "../../validation/geoJson/GeoJsonValidation";
import { bluetoothRepo, fileSystemRepo, xlsxRepo } from "./repositories";
import { UrlFileAccess } from "../../services/other/UrlFileAccess";
import { AlertHandler } from "../../services/other/AlertHandler";
import { SpreadsheetDataParser } from "../../services/other/SpreadsheetDataParser";

export const fileNameGenerator = new FileNameGenerator()

export const permissions = new Permissions()

export const commaSeparatedFileParser = new CommaSeparatedFileParser()

export const shareService = new Share()

export const openInExternalAppService = new OpenInExternalApp()

export const geolocationCalculator = new GeolocationCalculator()

export const linkingService = new Linking()

export const imagePicker = new ImagePicker()

export const documentPicker = new DocumentPicker()

export const multimeterFactory = new MultimeterFactory(bluetoothRepo)

export const unitConverter = new UnitConverter()

export const subitemFactory = new SubitemFactory()

export const warningHandler = new WarningHandler()

export const alertHandler = new AlertHandler()

export const appStateListener = new AppStateListener()

export const geoJsonValidation = new GeoJsonValidation()

export const getMapRegionFromBbox = new GetMapRegionFromBbox()

export const urlFileAccessService = new UrlFileAccess()

export const spreadsheetDataParser = new SpreadsheetDataParser(fileSystemRepo, commaSeparatedFileParser, xlsxRepo, alertHandler)
import { AppStateListener } from "../../services/other/AppStateListenerService";
import { CommaSeparatedFileParser } from "../../services/other/CommaSeparatedFileParser";
import { DocumentPicker } from "../../services/other/DocumentPicker";
import { FileNameGenerator } from "../../services/other/FileNameGenerator";
import { GeoParser } from "../../services/other/GeoParser";
import { GeolocationCalculator } from "../../services/other/GeolocationCalculator";
import { ImagePicker } from "../../services/other/ImagePicker";
import { KmlParser } from "../../services/other/KmlParser";
import { Linking } from "../../services/other/Linking";
import { OpenInExternalApp } from "../../services/other/OpenInExternalApp";
import { Permissions } from "../../services/other/Permissions";
import { Share } from "../../services/other/Share";
import { SubitemFactory } from "../../services/other/SubitemFactory";
import { UnitConverter } from "../../services/other/UnitConverter";
import { WarningHandler } from "../../services/other/WarningHandler";
import { MultimeterFactory } from "../../services/survey/other/multimeter/_devices/MultimeterFactory";
import { GeoJsonValidation } from "../../validation/geoJson/GeoJsonValidation";
import { bluetoothRepo } from "./repositories";

export const kmlParser = new KmlParser()

export const fileNameGenerator = new FileNameGenerator()

export const permissions = new Permissions()

export const commaSeparatedFileParser = new CommaSeparatedFileParser()

export const shareService = new Share()

export const openInExternalAppService = new OpenInExternalApp()

export const geolocationCalculator = new GeolocationCalculator()

export const geoParser = new GeoParser()

export const linkingService = new Linking()

export const imagePicker = new ImagePicker()

export const documentPicker = new DocumentPicker()

export const multimeterFactory = new MultimeterFactory(bluetoothRepo)

export const unitConverter = new UnitConverter()

export const subitemFactory = new SubitemFactory()

export const warningHandler = new WarningHandler()

export const appStateListener = new AppStateListener()

export const geoJsonValidation = new GeoJsonValidation()
import { ConnectMultimeter } from "../../services/survey/other/multimeter/connect/ConnectMultimeter";
import { MultimeterFactory } from "../../services/survey/other/multimeter/devices/MultimeterFactory";
import { MultimeterPropertyCaptureParameters } from "../../services/survey/other/multimeter/utils/MultimeterPropertyCaptureParameters";
import { permissions } from "./general_services";
import { bluetoothRepo, settingRepo } from "./repositories";

export const multimeterFactory = new MultimeterFactory(bluetoothRepo)

export const connectMultimeterService = new ConnectMultimeter(settingRepo, permissions, multimeterFactory, bluetoothRepo)

export const multimeterPropertyCaptureParameters = new MultimeterPropertyCaptureParameters()
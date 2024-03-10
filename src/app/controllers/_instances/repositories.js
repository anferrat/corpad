import { BluetoothRepository } from "../../repository/bluetooth/BluetoothRepository";
import { GoogleDriveAuthorizationRepository } from "../../repository/cloud_drive/GoogleDriveAuthorizationRepository";
import { GoogleDriveFileSystemRepository } from "../../repository/cloud_drive/GoogleDriveFileSystemRepository";
import { FileSystemRepository } from "../../repository/fs/FileSystemRepository";
import { GeolocationRepository } from "../../repository/geolocation/GeolocationRepository";
import { PurchaseRepository } from "../../repository/inAppPurchases/PurchaseRepository";
import { NetworkRepository } from "../../repository/network/NetworkRepository";
import { NdefRepository } from "../../repository/nfc/ndefRepository";
import { AppRepository } from "../../repository/sqlite/AppRepository";
import { AssetRepository } from "../../repository/sqlite/AssetRepository";
import { CalculatorRepository } from "../../repository/sqlite/CalculatorRepository";
import { DefaultNameRepository } from "../../repository/sqlite/DefaultNameRepository";
import { MapLayerRepository } from "../../repository/sqlite/MapLayerRepository";
import { PipelineRepository } from "../../repository/sqlite/PipelineRepository";
import { PotentialRepository } from "../../repository/sqlite/PotentialRepository";
import { PotentialTypeRepository } from "../../repository/sqlite/PotentialTypeRepository";
import { RectifierRepository } from "../../repository/sqlite/RectifierRepository";
import { ReferenceCellRepository } from "../../repository/sqlite/ReferenceCellRepository";
import { SettingRepository } from "../../repository/sqlite/SettingRepository";
import { SubitemRepository } from "../../repository/sqlite/SubitemRepository";
import { SurveyRepository } from "../../repository/sqlite/SurveyRepository";
import { TestPointRepository } from "../../repository/sqlite/TestPointRepository";
import { TestRepository } from "../../repository/sqlite/TestRepo";

//SQLITE REPOS
export const appRepo = new AppRepository()
export const assetRepo = new AssetRepository()
export const calculatorRepo = new CalculatorRepository()
export const defaultNameRepo = new DefaultNameRepository()
export const mapLayerRepo = new MapLayerRepository()
export const pipelineRepo = new PipelineRepository()
export const potentialRepo = new PotentialRepository()
export const potentialTypeRepo = new PotentialTypeRepository()
export const rectifierRepo = new RectifierRepository()
export const referenceCellRepo = new ReferenceCellRepository()
export const settingRepo = new SettingRepository()
export const subitemRepo = new SubitemRepository()
export const surveyRepo = new SurveyRepository()
export const testPointRepo = new TestPointRepository()
export const testRepo = new TestRepository()

//NETWORK
export const networkRepo = new NetworkRepository()

//GEOLOCATION
export const geolocationRepo = new GeolocationRepository()

//FILESYSTEM
export const fileSystemRepo = new FileSystemRepository()

//GOOGLEDRIVEREPO
export const googleDriveFileSystemRepo = new GoogleDriveFileSystemRepository()

//GOOGLEDRIVE AUTH
export const googleDriveAuthorizationRepo = new GoogleDriveAuthorizationRepository()

//Bluetooth
export const bluetoothRepo = new BluetoothRepository()

//Purchases
export const purchaseRepo = new PurchaseRepository()

//NFC
export const ndefRepo = new NdefRepository()

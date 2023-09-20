import { CreateAssetFile } from "../../services/survey/other/photos/CreateAssetFile";
import { DeleteAssetFile } from "../../services/survey/other/photos/DeleteAssetFile";
import { fileSystemRepo } from "./repositories";

export const createAssetFileService = new CreateAssetFile(fileSystemRepo)

export const deleteAssetFileService = new DeleteAssetFile(fileSystemRepo)
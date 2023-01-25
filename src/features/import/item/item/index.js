import { ImportDataProvider } from "../ImportDataProvider"
import FileData from "./FileData"
import ItemView from "./Item"

export const ImportItem = ({ navigateToSpreadsheet, navigateToParameters, pushToSubitem, navigateToList, navigateToFile }) => {
    return (
        <ImportDataProvider
            navigateToFile={navigateToFile}
            subitemIndex={null}
            pushToSubitem={pushToSubitem}
            navigateToList={navigateToList}
            navigateToParameters={navigateToParameters}>
            <FileData
                navigateToSpreadsheet={navigateToSpreadsheet} />
            <ItemView />
        </ImportDataProvider>
    )
}
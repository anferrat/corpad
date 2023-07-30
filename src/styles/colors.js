import { ItemStatuses, WireColors } from "../constants/global"

export const primary = "#7186C7"
export const success = "#43C150"
export const warning = "#FFD311"
export const danger = "#FF5D4F"
export const basic = "#9ca9cb"
export const basic1100 = "#141414"
export const basic1000 = "#6a6a77"
export const basic200 = "#f1f4fc"
export const basic300 = '#e1e5ef'
export const basic400 = '#d4d9ea'
export const basic700 = '#888892'
export const primary100 = '#E6EDFC'
export const primary200 = '#CEDCF9'
export const primary400 ='#95A8DD'
export const success100 = "#E3FBDB"
export const control = '#fff'

export const WireColorColors = Object.freeze({
    [WireColors.BLACK]: ['#1c1d20'],
    [WireColors.BLACK_RED]: ['#1c1d20', '#bd4131'],
    [WireColors.DARK_BLUE]: ['#1d507e'],
    [WireColors.GREEEN_YELLOW]: ['#0a7340', '#c2b942'],
    [WireColors.GREEN]: ['#0a7340'],
    [WireColors.LIGHT_BLUE]: ['#3390e3'],
    [WireColors.PINK]: ['#af5ca4'],
    [WireColors.RED]: ['#bd4131'],
    [WireColors.WHITE]: ['#dedede'],
    [WireColors.WHITE_BLACK]: ['#dedede', '#1c1d20'],
    [WireColors.WHITE_RED]: ['#dedede', '#bd4131'],
    [WireColors.YELLOW]: ['#c2b942']
})

export const StatusColors = Object.freeze({
    [ItemStatuses.ATTENTION]: warning,
    [ItemStatuses.BAD]: danger,
    [ItemStatuses.UNKNOWN]: basic,
    [ItemStatuses.GOOD]: success
})

export const StatusStatuses = Object.freeze({
    [ItemStatuses.ATTENTION]: 'warning',
    [ItemStatuses.BAD]: 'danger',
    [ItemStatuses.GOOD]: 'success',
    [ItemStatuses.UNKNOWN]: 'basic',
    [ItemStatuses.NO_STATUS]: 'basic'
})
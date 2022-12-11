export const primary = "#7186C7"
export const success = "#43C150"
export const warning = "#FFD311"
export const danger = "#FF5D4F"
export const basic = "#9ca9cb"
export const basic1000 = "#6a6a77"
export const basic200 = "#f1f4fc"
export const basic300 = '#e1e5ef'
export const basic400 = '#d4d9ea'
export const basic700 = '#888892'
export const primary100 = '#E6EDFC'
export const primary200 = '#CEDCF9'
export const success100 = "#E3FBDB"
export const control = '#fff'

export const getColor = (status) => {
    if (status === 'success' || status === 0)
        return success
    else if (status === 'warning' || status === 1)
        return warning
    else if (status === 'danger' || status === 2)
        return danger
    else return basic
}
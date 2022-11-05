import { StyleSheet, StatusBar } from "react-native";

export const primary = "#7186C7" // basic colors copied to avoid using useTheme and withStyles in heavly reusable parts. If theme changes needs to be updated
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
export const success100 = "#E3FBDB"

export const androidRipple = { color: basic200 }

export const androidStyle = StyleSheet.create({
  AndroidSafeArea: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: basic200,
    overflow: 'hidden',
  },
  SubitemListItem: {
    elevation: 5,
    padding: 12,
    borderWidth: 0,
    borderRadius: 6,
    margin: 6,
  },
  SaveButton: {
    position: 'absolute',
    bottom: 10,
    left: '2.5%',
    height: 50,
    width: '95%',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  SaveButtonDisabled: {
    position: 'absolute',
    bottom: 10,
    left: '2.5%',
    height: 50,
    width: '95%',
    paddingHorizontal: 15,
  },
  ConnectionCard: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 12,
    borderWidth: 0,
    borderRadius: 6,
    margin: 6,
    marginTop: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  EmptyCard: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 12,
    borderWidth: 0,
    borderRadius: 6,
    margin: 6,
    marginTop: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 350
  },
  EmptyCardList: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 350
  },
  ConnectionCardMain: {
    overflow: "hidden",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 0,
    borderRadius: 6,
    margin: 6,
    marginTop: 12
  },

  UnitText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  OverFlowMenu: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  TopBar: {
    height: StatusBar.currentHeight + 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  TopBarItem: {
    height: 80,
    paddingBottom: 10,
    paddingTop: 30,
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  }
})

export const displayCard = StyleSheet.create({
  pressable: {
    elevation: 5,
    borderRadius: 6,
    margin: 6,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  hidden: {
    display: 'none'
  },
  iconRow: {
    width: 17,
    height: 17,
    marginRight: 10
  },
  iconText: {
    width: 20,
    height: 20,
    color: basic,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    height: 22,
  },
  DataRow: {
    paddingVertical: 3,
    flexDirection: 'row',
    height: 22,
  },
  Card: {
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: basic300,
    borderBottomWidth: 1
  },
  TitleView: {
    paddingBottom: 6,
  },
  statusBasic: {
    borderRadius: 5,
    marginRight: 12,
    flexDirection: 'row',
    width: 12,
    backgroundColor: basic,
  },
  statusGood: {
    borderRadius: 5,
    marginRight: 12,
    flexDirection: 'row',
    width: 12,
    backgroundColor: success,
  },
  statusWarning: {
    borderRadius: 5,
    marginRight: 12,
    flexDirection: 'row',
    width: 12,
    backgroundColor: warning,
  },
  statusDanger: {
    borderRadius: 5,
    marginRight: 12,
    flexDirection: 'row',
    width: 12,
    backgroundColor: danger,
  },
  subtitle: {
    marginTop: 3,
    textAlignVertical: 'bottom',
    height: 22,
    lineHeight: 18,
    paddingBottom: 6
  },

  dataText: {
    fontSize: 13,
    textAlignVertical: 'bottom',
    height: 22,
    lineHeight: 20,
    paddingVertical: 3,
  },
  readingBar: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedBarIcon: {
    height: 22,
    width: 22,
    marginLeft: 5,
  },
  readingBarIcons: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  TitleDisplay: {
    paddingRight: 20,
  },
  StatusAndTitleView: {
    flex: 1,
    flexDirection: 'row',
  },
  ReadingDisplay: {

    justifyContent: 'center',
    alignItems: 'center'
  },
  ReadingDisplayPressable: {
    padding: 12
  },
  ReadingDisplayRoundBorder: {
    borderRadius: 6,
    overflow: 'hidden',
  }
})





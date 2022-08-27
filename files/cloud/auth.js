// google signIn functions here
import { GoogleSignin } from "react-native-google-signin"
import NetInfo from '@react-native-community/netinfo'
import { gdrive } from './gd'

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata'],
    webClientId: '658257365487-176osqqi2nft7vvige3diu2grea884mi.apps.googleusercontent.com',
    offlineAccess: false,
})

export const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        const token = (await GoogleSignin.getTokens()).accessToken
        return {
            status: 200,
            driveToken: token,
            userName: userInfo.user.name
        }
    } catch (er) {
        return {
            status: 707
        }
    }
}

export const signInSilently = async () => {
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signInSilently()
        const token = (await GoogleSignin.getTokens()).accessToken
        return {
            status: 200,
            driveToken: token,
            userName: userInfo.user.name
        }
    } catch (er) {
        return {
            status: 707
        }
    }
}

export const getSession = async () => {
    const netStatus = await NetInfo.fetch()
    if (netStatus.isInternetReachable) {
        const isSignedIn = await GoogleSignin.isSignedIn()
        if (isSignedIn) {
            const userInfo = await GoogleSignin.getCurrentUser()
            const token = (await GoogleSignin.getTokens()).accessToken
            return {
                status: 200,
                isSigned: true,
                driveToken: token,
                userName: userInfo.user.name
            }
        }
        else return {
            status: 200,
            isSigned: false,
        }
    }
    else {
        return { status: 102 }
    }
}

export const signOut = async () => {
    try {
        await GoogleSignin.signOut()
        return {
            status: 200
        }
    }
    catch (er) {
        return {
            status: 708
        }
    }
}

export const authHandler = async (driveRequest, errorCode) => {
    //wrapper for gdrive functions to handle 401 unathorized error. Attemts to get new token if old token is no longer valid
    try {
        return await driveRequest()
    }
    catch (er) {
        if (er?.json?.error?.code)
            if (er.json.error.code === 401) {
                const newSession = await getSession()
                if (newSession.status === 200) {
                    if (!newSession.isSigned)
                        throw { corpadErrorStatus: 302 }
                    else {
                        gdrive.accessToken = newSession.driveToken
                        return await driveRequest()
                    }
                }
                else throw { corpadErrorStatus: newSession.status }
            }
            else throw { corpadErrorStatus: errorCode }
        else throw { corpadErrorStatus: errorCode }
    }
}

export const checkConnection = async () => {
    try {
        const netStatus = await NetInfo.fetch()
        if (netStatus.isInternetReachable)
            return {
                status: 200
            }
        else
            return { status: 102 }
    }
    catch (er) {
        return {
            status: 301
        }
    }
}
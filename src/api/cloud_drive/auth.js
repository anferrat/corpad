// google signIn functions here
import { GoogleSignin } from "react-native-google-signin"
import { gdrive } from './gd'
import { checkConnection } from "./netinfo"

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata'],
    webClientId: '658257365487-176osqqi2nft7vvige3diu2grea884mi.apps.googleusercontent.com',
    offlineAccess: false,
})

export const signIn = async () => {
    //Attempt to sign in 
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        const token = (await GoogleSignin.getTokens()).accessToken
        gdrive.accessToken = token
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
        gdrive.accessToken = token
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
    const netStatus = await checkConnection()
    if (netStatus.status === 200) {
        const isSignedIn = await GoogleSignin.isSignedIn()
        if (isSignedIn) {
            const userInfo = await GoogleSignin.getCurrentUser()
            const token = (await GoogleSignin.getTokens()).accessToken
            gdrive.accessToken = token
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
    else netStatus
}

export const signOut = async () => {
    try {
        await GoogleSignin.signOut()
        gdrive.accessToken = null
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

export const authHandler = async (driveRequest) => {
    /*
    wrapper for gdrive functions to handle 401 unathorized error. 
    Attemts to get new token if old token is no longer valid and resubmits the request,
    throws error if request failed the second time with {status: <errorCode>}.
    For use only within gd API, do not use outside to prevent mess
    */
    try {
        return await driveRequest()
    }
    catch (er) {
        if (er?.json?.error?.code)
            if (er.json.error.code === 401) {
                const newSession = await getSession()
                if (newSession.status === 200) {
                    if (!newSession.isSigned)
                        throw { status: 302 }
                    else
                        return await driveRequest()
                }
                else throw newSession
            }
            else {
                const verifyConnection = await checkConnection()
                if (verifyConnection.status !== 200)
                    throw verifyConnection
                else
                    throw 'Unknown auth handler error'
            }
        else throw 'Unknown auth handler error'
    }
}
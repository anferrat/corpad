
import QRCode from 'qrcode'
import RNQRGenerator from 'rn-qr-generator'
import { Error, errors } from '../../utils/Error'
import { basic1000, basic1100, control } from '../../../styles/colors'

export class QRCodeRepository {
    constructor() {
    }

    async generateSvgString(link, params = {
        width: 100,
        height: 100,
        color: {
            dark: basic1000,
            light: control
        }
    }) {
        try {
            const { width, height, color } = params
            return await QRCode.toString(link, {
                errorCorrectionLevel: 'H',
                type: 'svg',
                width,
                height,
                color
            })
        }
        catch (er) {
            throw new Error(errors.QRCODE, 'Unable to generate svg string', er, 844)
        }
    }

    async generatePngFile(link, params = {
        width: 600,
        height: 600,
        color: {
            dark: basic1100,
            light: control
        }
    }) {
        try {
            const { width, height, color } = params
            const { uri } = await RNQRGenerator.generate({
                value: link,
                height,
                width,
                correctionLevel: 'H',
                padding: {
                    top: 20,
                    left: 20,
                    bottom: 20,
                    right: 20
                },
                backgroundColor: color.light,
                color: color.dark
            })
            return uri
        }
        catch (er) {
            throw new Error(errors.QRCODE, 'Unable to generate png file', er, 845)
        }
    }

}
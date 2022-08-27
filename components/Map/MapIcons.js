import { Image } from 'react-native'
import TSSuccess from '../../assets/MapIcons/TS/success.png'
import TSWarning from '../../assets/MapIcons/TS/warning.png'
import TSDanger from '../../assets/MapIcons/TS/danger.png'
import TSBasic from '../../assets/MapIcons/TS/basic.png'
import TSActive from '../../assets/MapIcons/TS/active.png'
import FNSuccess from '../../assets/MapIcons/FN/success.png'
import FNWarning from '../../assets/MapIcons/FN/warning.png'
import FNDanger from '../../assets/MapIcons/FN/danger.png'
import FNBasic from '../../assets/MapIcons/FN/basic.png'
import FNActive from '../../assets/MapIcons/FN/active.png'
import HDSuccess from '../../assets/MapIcons/HD/success.png'
import HDWarning from '../../assets/MapIcons/HD/warning.png'
import HDDanger from '../../assets/MapIcons/HD/danger.png'
import HDBasic from '../../assets/MapIcons/HD/basic.png'
import HDActive from '../../assets/MapIcons/HD/active.png'
import JBSuccess from '../../assets/MapIcons/JB/success.png'
import JBWarning from '../../assets/MapIcons/JB/warning.png'
import JBDanger from '../../assets/MapIcons/JB/danger.png'
import JBBasic from '../../assets/MapIcons/JB/basic.png'
import JBActive from '../../assets/MapIcons/JB/active.png'
import RTSuccess from '../../assets/MapIcons/RT/success.png'
import RTWarning from '../../assets/MapIcons/RT/warning.png'
import RTDanger from '../../assets/MapIcons/RT/danger.png'
import RTBasic from '../../assets/MapIcons/RT/basic.png'
import RTActive from '../../assets/MapIcons/RT/active.png'
import DefaultSuccess from '../../assets/MapIcons/Default/success.png'
import DefaultWarning from '../../assets/MapIcons/Default/warning.png'
import DefaultDanger from '../../assets/MapIcons/Default/danger.png'
import DefaultBasic from '../../assets/MapIcons/Default/basic.png'
import DefaultActive from '../../assets/MapIcons/Default/active.png'

//In order to avoid dealing with TrackViewChanges and custom markers view, marker icons saved as png assets. 
//Tt significantly improves markers render and updates, but limits what can be displayed as marker.
//If number of markers keeps increasing, needs to be re-disigned. Possible solution is to limit number of markers displayed at the time and update it onRegionChange
//However this way seems reasonable at the time.

const mapIcons = {
    TS: ['ts_success',
        'ts_warning',
        'ts_danger',
        'ts_basic',
        'active_ts'
    ],
    FN: ['fn_success',
        'fn_warning',
        'fn_danger',
        'fn_basic',
        'active_fn'
    ],
    HD: ['hd_success',
    'hd_warning',
    'hd_danger',
    'hd_basic',
    'active_hd'
    ],
    JB: ['jb_success',
    'jb_warning',
    'jb_danger',
    'jb_basic',
    'active_jb'
    ],
    RT: ['rt_success',
    'rt_warning',
    'rt_danger',
    'rt_basic',
    'active_rt'
    ],
    default: ['default_success',
    'default_warning',
    'default_danger',
    'default_basic',
    'active_default'
    ]
}

export const getMapIcon = (icon, status) => {
    if (mapIcons.hasOwnProperty(icon)) {
        return { uri: mapIcons[icon][status] ?? mapIcons[icon][3] }
    }
    else return { uri: mapIcons.default[status] ?? mapIcons.default[3] }
}

export const getActiveMapIcon = (icon) => {
    if (mapIcons.hasOwnProperty(icon)) {
        return { uri: mapIcons[icon][4] }
    }
    else return { uri: mapIcons.default[4] }
}
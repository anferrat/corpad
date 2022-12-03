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
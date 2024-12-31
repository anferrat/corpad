export class PokitProUUID {
    constructor() {
        this.services = {
            MULTIMETER: 'e7481d2f-5781-442e-bb9a-fd4e3441dadc',
            DSO: '1569801e-1425-4a7a-b617-a4f4ed719de6',
            DATA_LOGGER: 'a5ff3566-1fd8-4e10-8362-590a578a4121',
            STATUS: '57d3a771-267c-4394-8872-78223e92aec5',
        }
        this.characteristics = {
            MULTIMETER: {
                SETTINGS: '53dc9a7a-bc19-4280-b76b-002d0e23b078',
                READING: '047d3559-8bee-423a-b229-4417fa603b90',
            },
            STATUS: {
                BUTTON_PRESS: '8fe5b5a9-b5b4-4a7b-8ff2-87224b970f89',
                STATUS: '3dba36e1-6120-4706-8dfd-ed9c16e569b6'
            },
            DSO: {
                SETTINGS: 'a81af1b6-b8b3-4244-8859-3da368d2be39',
                READING: '98e14f8e-536e-4f24-b4f4-1debfed0a99e',
                METADATA: '970f00ba-f46f-4825-96a8-153a5cd0cda9'
            }
        }

    }
}
const alert_by_images = {
    p: 'https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i0b7521ebe95b9430/version/1470063035/image.png',
    s: 'https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png',
};

const type_images = {
    b: 'https://image.jimcdn.com/app/cms/image/transf/dimension=120x10000:format=png/path/s47c677f812c00ba1/image/i41ccc95d7b5bfbe6/version/1531755152/image.png',
    t: 'https://image.jimcdn.com/app/cms/image/transf/dimension=320x10000:format=png/path/s47c677f812c00ba1/image/i26273cd4d48cb25f/version/1531755148/image.png',
    s: 'https://image.jimcdn.com/app/cms/image/transf/dimension=278x10000:format=gif/path/s47c677f812c00ba1/image/i398e35b7bba28a00/version/1531755156/image.gif',
};

const vehicle_images = {
    'tlf': {
        name: {
            short: 'TLF-A 2000',
            long: 'Tanklöschfahrzeug'
        },
        image: 'https://image.jimcdn.com/app/cms/image/transf/dimension=118x10000:format=png/path/s47c677f812c00ba1/image/i65e49bdd863c0ab8/version/1446024823/image.png',
        url: 'http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/tlf-a/'
    },
    'rf-s': {
        name: {
            short: 'RF-S',
            long: 'Rüstfahrzeug mit Seilwinde'
        },
        image: 'https://image.jimcdn.com/app/cms/image/transf/dimension=125x10000:format=png/path/s47c677f812c00ba1/image/i02b8c065ba22cf22/version/1446024826/image.png',
        url: 'http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/rf-s/'
    },
    'mtf': {
        name: {
            short: 'MTF',
            long: 'Mannschaftstransportfahrzeug'
        },
        image: 'https://image.jimcdn.com/app/cms/image/transf/dimension=110x10000:format=jpg/path/s47c677f812c00ba1/image/i2a56691932c87b5c/version/1502553907/image.jpg',
        url: 'https://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/mtf/'
    },
    'vf': {
        name: {
            short: 'VF',
            long: 'Versorgungsfahrzeug'
        },
        image: 'https://image.jimcdn.com/app/cms/image/transf/dimension=105x10000:format=png/path/s47c677f812c00ba1/image/i2ad687b46b32d5a8/version/1446024814/image.png',
        url: 'http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/vf/'
    },
    'klf': {
        name: {
            short: 'KLF',
            long: 'Kleinlöschfahrzeug'
        },
        image: 'https://image.jimcdn.com/app/cms/image/transf/dimension=95x10000:format=png/path/s47c677f812c00ba1/image/ia8690be94128764c/version/1446024810/image.png',
        url: 'http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/klf/'
    },
    'wlf': {
        name: {
            short: 'WLF',
            long: 'Wechselladefahrzeug'
        },
        image: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s47c677f812c00ba1/image/i8e708ecd35554d8b/version/1699901501/image.png',
        url: 'http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/wlf/'
    },
};

const additional_crew = {
    Feuerwehren: {
        ausserkasten: {
            name: "Freiwillige Feuerwehr Ausserkasten-Furth",
            link: "https://www.ff-ausserkasten.at/",
        },
        mechters: {
            name: "Freiwillige Feuerwehr Mechters",
            link: "https://feuerwehr.mechters.at/",
        },
        kirchstetten: {
            name: "Freiwillige Feuerwehr Kirchstetten-Markt",
            link: "https://www.ff-kirchstetten.at/",
        },
        pyhra: {
            name: "Freiwillige Feuerwehr Pyhra",
            link: "https://www.feuerwehr-pyhra.at/",
        },
        kasten: {
            name: "Freiwillige Feuerwehr Kasten",
            link: "https://ff-kasten.jimdofree.com/",
        },
        perersdorf: {
            name: "Freiwillige Feuerwehr Perersdorf",
            link: "https://www.facebook.com/p/Freiwillige-Feuerwehr-Perersdorf-100067318706752/",
        },
        stpstadt: {
            name: "Freiwillige Feuerwehr St. Pölten-Stadt",
            link: "https://www.feuerwehr-stpoelten.at/",
        },
        wald: {
            name: "Freiwillige Feuerwehr Wald",
            link: "http://www.ff-wald.com/",
        },
        untergrafendorf: {
            name: "Freiwillige Feuerwehr Untergrafendorf",
            link: "https://www.ff-untergrafendorf.at/",
        },
        murstetten: {
            name: "Freiwillige Feuerwehr Murstetten",
            link: "https://www.facebook.com/FFMurstetten/",
        },
        weisching: {
            name: "Freiwillige Feuerwehr Weisching",
            link: "https://www.facebook.com/Weisching/?locale=de_DE",
        },
        kapelln: {
            name: "Freiwillige Feuerwehr Kapelln",
            link: "http://www.feuerwehr-kapelln.at/",
        },
    },
    BOS: {
        rettung: {
            name: "Rettung",
        },
        notarzt: {
            name: "Notarzt",
        },
        polizei: {
            name: "Polizei",
        },
    },
    Andere: {
        presse: {
            name: "NÖN",
            link: "https://www.noen.at/",
        },
        bauhofbhk: {
            name: "Bauhof Böheimkirchen",
        },
        asfinag: {
            name: "ASFINAG",
        },
    },
};

export { alert_by_images, type_images, vehicle_images, additional_crew };
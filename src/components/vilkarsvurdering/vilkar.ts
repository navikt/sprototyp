export interface Regel {
    navn: string
    lovverk: LovverkPeker[]
}

interface LovverkPeker {
    lovverk: string
    lovverksversjon: string
    paragraf: string
    ledd?: number
    punktum?: number
    bokstav?: string
}

const utelandsfart = 'Sjekk om norsk skip i utenriksfart, betydning for kap 2 medlemskap'
const opptjeneingUnntakUtlandsfart = 'Opptjening hovedregel, unntak fra 8-2 for utenriksfart'
const tapAvPensjonsgivendeInntekt = 'Tap av pensjonsgivende inntekt'
const sykepengegrunnlaget = 'Sykepengegrunnlaget'
const minsteInntektHalvG = 'Krav til minste inntekt (1/2G)'
const sendtSøknadIRiktigTid = 'Sendt søknad i riktig tid'
const medlemskap = 'Medlemskap'
const opptjeningstid = 'Opptjeningstid'
export const regler: Regel[] = [
    {
        navn: utelandsfart,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-44',
            },
        ],
    },
    {
        navn: opptjeneingUnntakUtlandsfart,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-2',
            },
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-44',
                bokstav: 'b',
            },
        ],
    },
    {
        navn: tapAvPensjonsgivendeInntekt,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-3',
            },
        ],
    },
    {
        navn: sykepengegrunnlaget,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-28',
            },
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-29',
            },
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-30',
            },
        ],
    },
    {
        navn: minsteInntektHalvG,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-3',
                ledd: 2,
            },
        ],
    },
    {
        navn: sendtSøknadIRiktigTid,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '22-13',
            },
        ],
    },
    {
        navn: medlemskap,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '2-1',
            },
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '2-2',
            },
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '2-3',
            },
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '2-4',
            },
        ],
    },
    {
        navn: opptjeningstid,
        lovverk: [
            {
                lovverk: 'Folketrygdloven',
                lovverksversjon: '2020-01-01',
                paragraf: '8-2',
            },
        ],
    },
]

export const sakstyper: { [key: string]: string[] } = {
    'Norsk skip utenlandsfart': [
        utelandsfart,
        opptjeneingUnntakUtlandsfart,
        tapAvPensjonsgivendeInntekt,
        sykepengegrunnlaget,
        minsteInntektHalvG,
        sendtSøknadIRiktigTid,
    ],
    'Midlertidig ute av inntektsgivende arbeid': [sendtSøknadIRiktigTid, medlemskap, opptjeningstid],
}

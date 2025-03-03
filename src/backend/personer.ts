import { RSSoknad } from '@typer/soknad'

export const personer: Person[] = [
    {
        fodselsnummer: '12345678901',
        aktorId: '1234567890123',
        navn: 'Ola Nordmann',
        alder: 42,
        bohenetId: '123456789',
        boenhetNavn: 'Oslo kommune',
    },
    {
        fodselsnummer: '22345678902',
        aktorId: '2234567890123',
        navn: 'Kari Nordmann',
        alder: 35,
        bohenetId: '223456789',
        boenhetNavn: 'Bergen kommune',
    },
    {
        fodselsnummer: '32345678903',
        aktorId: '3234567890123',
        navn: 'Per Hansen',
        alder: 29,
        bohenetId: '323456789',
        boenhetNavn: 'Trondheim kommune',
    },
    {
        fodselsnummer: '42345678904',
        aktorId: '4234567890123',
        navn: 'Anne Larsen',
        alder: 50,
        bohenetId: '423456789',
        boenhetNavn: 'Stavanger kommune',
    },
    {
        fodselsnummer: '52345678905',
        aktorId: '5234567890123',
        navn: 'Jonas Olsen',
        alder: 27,
        bohenetId: '523456789',
        boenhetNavn: 'Kristiansand kommune',
    },
    {
        fodselsnummer: '62345678906',
        aktorId: '6234567890123',
        navn: 'Maria Nilsen',
        alder: 33,
        bohenetId: '623456789',
        boenhetNavn: 'Tromsø kommune',
    },
    {
        fodselsnummer: '72345678907',
        aktorId: '7234567890123',
        navn: 'Sindre Pedersen',
        alder: 40,
        bohenetId: '723456789',
        boenhetNavn: 'Drammen kommune',
    },
    {
        fodselsnummer: '82345678908',
        aktorId: '8234567890123',
        navn: 'Elin Johansen',
        alder: 38,
        bohenetId: '823456789',
        boenhetNavn: 'Fredrikstad kommune',
    },
    {
        fodselsnummer: '92345678909',
        aktorId: '9234567890123',
        navn: 'Henrik Kristiansen',
        alder: 45,
        bohenetId: '923456789',
        boenhetNavn: 'Porsgrunn kommune',
    },
    {
        fodselsnummer: '02345678910',
        aktorId: '0234567890123',
        navn: 'Linda Berg',
        alder: 32,
        bohenetId: '023456789',
        boenhetNavn: 'Skien kommune',
    },
]

export function hentPerson(aktorid: string): Person | undefined {
    return personer.find((person) => person.aktorId === aktorid)
}

interface Person {
    fodselsnummer: string
    aktorId: string
    navn: string
    alder: number
    bohenetId: string
    boenhetNavn: string
    soknader?: RSSoknad[]
}

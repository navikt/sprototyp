'use client'

import React, { ReactElement, useState } from 'react'
import { BodyShort, Radio, RadioGroup, Table, Select, Button, Textarea } from '@navikt/ds-react'
import {
    CheckmarkCircleFillIcon,
    XMarkOctagonFillIcon,
    QuestionmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
} from '@navikt/aksel-icons'

// Sentral datastruktur med alle predefinerte vilkår
const vilkarData: { [key: string]: { id: string; name: string; gruppe: string } } = {
    '8-1': { id: '8-1', name: '§ 8-1. Formål', gruppe: 'Kapittel 8 – Innledende bestemmelser' },
    '8-1a': {
        id: '8-1a',
        name: '§ 8-1 a. Forholdet til bestemmelser om internasjonal trygdekoordinering',
        gruppe: 'Kapittel 8 – Innledende bestemmelser',
    },
    '8-2': { id: '8-2', name: '§ 8-2. Opptjeningstid', gruppe: 'I. Generelle bestemmelser' },
    '8-3': {
        id: '8-3',
        name: '§ 8-3. Tap av pensjonsgivende inntekt og minsteinntekt',
        gruppe: 'I. Generelle bestemmelser',
    },
    '8-4': { id: '8-4', name: '§ 8-4. Arbeidsuførhet', gruppe: 'I. Generelle bestemmelser' },
    '8-5': {
        id: '8-5',
        name: '§ 8-5. Sykepenger ved friskmelding til arbeidsformidling',
        gruppe: 'I. Generelle bestemmelser',
    },
    '8-6': { id: '8-6', name: '§ 8-6. Gradert sykmelding', gruppe: 'I. Generelle bestemmelser' },
    '8-7': { id: '8-7', name: '§ 8-7. Dokumentasjon av arbeidsuførhet', gruppe: 'I. Generelle bestemmelser' },
    '8-7a': {
        id: '8-7a',
        name: '§ 8-7 a. Oppfølging mv. i regi av Arbeids- og velferdsetaten',
        gruppe: 'I. Generelle bestemmelser',
    },
    '8-8': { id: '8-8', name: '§ 8-8. Medlemmets medvirkning', gruppe: 'I. Generelle bestemmelser' },
    '8-9': { id: '8-9', name: '§ 8-9. Oppholdskrav', gruppe: 'I. Generelle bestemmelser' },
    '8-10': { id: '8-10', name: '§ 8-10. Sykepengegrunnlag', gruppe: 'I. Generelle bestemmelser' },
    '8-11': { id: '8-11', name: '§ 8-11. Sykepengedager', gruppe: 'I. Generelle bestemmelser' },
    '8-12': { id: '8-12', name: '§ 8-12. Antall sykepengedager', gruppe: 'I. Generelle bestemmelser' },
    '8-13': { id: '8-13', name: '§ 8-13. Graderte sykepenger', gruppe: 'I. Generelle bestemmelser' },
    '8-14': { id: '8-14', name: '§ 8-14. Tilskott til arbeidsreiser', gruppe: 'I. Generelle bestemmelser' },
    '8-15': {
        id: '8-15',
        name: '§ 8-15. Rett til sykepenger og feriepenger som arbeidstaker',
        gruppe: 'II. Arbeidstakere',
    },
    '8-16': { id: '8-16', name: '§ 8-16. Sykepengenes størrelse (kompensasjonsnivå)', gruppe: 'II. Arbeidstakere' },
    '8-17': { id: '8-17', name: '§ 8-17. Sykepenger fra trygden', gruppe: 'II. Arbeidstakere' },
    '8-18': { id: '8-18', name: '§ 8-18. Sykepenger fra arbeidsgiveren', gruppe: 'II. Arbeidstakere' },
    '8-19': { id: '8-19', name: '§ 8-19. Beregning av arbeidsgiverperiode', gruppe: 'II. Arbeidstakere' },
    '8-20': {
        id: '8-20',
        name: '§ 8-20. Risiko for særlig stort sykefravær eller svangerskapsrelatert sykefravær',
        gruppe: 'II. Arbeidstakere',
    },
    '8-21': {
        id: '8-21',
        name: '§ 8-21. Forsikring mot ansvar for sykepenger i arbeidsgiverperioden',
        gruppe: 'II. Arbeidstakere',
    },
    '8-22': {
        id: '8-22',
        name: '§ 8-22. Trygdens ansvar når arbeidsgiveren ikke betaler',
        gruppe: 'II. Arbeidstakere',
    },
    '8-23': { id: '8-23', name: '§ 8-23. Egenmelding', gruppe: 'II. Arbeidstakere' },
    '8-24': { id: '8-24', name: '§ 8-24. Rett til å nytte egenmelding', gruppe: 'II. Arbeidstakere' },
    '8-25': { id: '8-25', name: '§ 8-25. Unntak fra retten til å nytte egenmelding', gruppe: 'II. Arbeidstakere' },
    '8-26': { id: '8-26', name: '§ 8-26. Egenerklæring', gruppe: 'II. Arbeidstakere' },
    '8-27': { id: '8-27', name: '§ 8-27. Tap av retten til å nytte egenmelding', gruppe: 'II. Arbeidstakere' },
    '8-28': { id: '8-28', name: '§ 8-28. Sykepengegrunnlaget i arbeidsgiverperioden', gruppe: 'II. Arbeidstakere' },
    '8-29': {
        id: '8-29',
        name: '§ 8-29. Inntekter som inngår i beregning av den aktuelle månedsinntekten',
        gruppe: 'II. Arbeidstakere',
    },
    '8-30': {
        id: '8-30',
        name: '§ 8-30. Sykepengegrunnlaget når trygden yter sykepenger',
        gruppe: 'II. Arbeidstakere',
    },
    '8-31': { id: '8-31', name: '§ 8-31. Sykepenger under streik og lockout', gruppe: 'II. Arbeidstakere' },
    '8-32': { id: '8-32', name: '§ 8-32. Sykepenger under gå-sakte-aksjon', gruppe: 'II. Arbeidstakere' },
    '8-33': { id: '8-33', name: '§ 8-33. Feriepenger', gruppe: 'II. Arbeidstakere' },
    '8-34': { id: '8-34', name: '§ 8-34. Sykepengedekning m.m.', gruppe: 'III. Selvstendig næringsdrivende' },
    '8-35': { id: '8-35', name: '§ 8-35. Sykepengegrunnlag', gruppe: 'III. Selvstendig næringsdrivende' },
    '8-36': {
        id: '8-36',
        name: '§ 8-36. Forsikring for tillegg til sykepenger',
        gruppe: 'III. Selvstendig næringsdrivende',
    },
    '8-37': {
        id: '8-37',
        name: '§ 8-37. Opphør av forsikring for tillegg til sykepenger',
        gruppe: 'III. Selvstendig næringsdrivende',
    },
    '8-38': { id: '8-38', name: '§ 8-38. Sykepengedekning og sykepengegrunnlag', gruppe: 'IV. Frilansere' },
    '8-39': { id: '8-39', name: '§ 8-39. Forsikring for tilleggssykepenger', gruppe: 'IV. Frilansere' },
    '8-40': { id: '8-40', name: '§ 8-40. Arbeidstaker og frilanser', gruppe: 'V. Medlemmer med kombinerte inntekter' },
    '8-41': {
        id: '8-41',
        name: '§ 8-41. Arbeidstaker og selvstendig næringsdrivende',
        gruppe: 'V. Medlemmer med kombinerte inntekter',
    },
    '8-42': {
        id: '8-42',
        name: '§ 8-42. Selvstendig næringsdrivende og frilanser',
        gruppe: 'V. Medlemmer med kombinerte inntekter',
    },
    '8-43': {
        id: '8-43',
        name: '§ 8-43. Arbeidstaker, selvstendig næringsdrivende og frilanser',
        gruppe: 'V. Medlemmer med kombinerte inntekter',
    },
    '8-44': { id: '8-44', name: '§ 8-44. Arbeidstaker på skip', gruppe: 'VI. Særskilte grupper' },
    '8-45': { id: '8-45', name: '§ 8-45. Fiskere', gruppe: 'VI. Særskilte grupper' },
    '8-46': { id: '8-46', name: '§ 8-46. Vernepliktige', gruppe: 'VI. Særskilte grupper' },
    '8-47': {
        id: '8-47',
        name: '§ 8-47. Yrkesaktive medlemmer som midlertidig har vært ute av inntektsgivende arbeid',
        gruppe: 'VI. Særskilte grupper',
    },
    '8-48': {
        id: '8-48',
        name: '§ 8-48. Forholdet mellom sykepenger og andre folketrygdytelser',
        gruppe: 'VII. Medlemmer som har rett til andre ytelser',
    },
    '8-49': {
        id: '8-49',
        name: '§ 8-49. Medlemmer med dagpenger under arbeidsløshet eller ventelønn m.m.',
        gruppe: 'VII. Medlemmer som har rett til andre ytelser',
    },
    '8-50': {
        id: '8-50',
        name: '§ 8-50. Medlemmer med uføretrygd',
        gruppe: 'VII. Medlemmer som har rett til andre ytelser',
    },
    '8-51': {
        id: '8-51',
        name: '§ 8-51. Medlem mellom 62 og 70 år',
        gruppe: 'VII. Medlemmer som har rett til andre ytelser',
    },
    '8-52': {
        id: '8-52',
        name: '§ 8-52. Medlemmer med avtalefestet pensjon',
        gruppe: 'VII. Medlemmer som har rett til andre ytelser',
    },
    '8-53': {
        id: '8-53',
        name: '§ 8-53. Sykepenger under opphold i helseinstitusjon o.l.',
        gruppe: 'VIII. Opphold i institusjon',
    },
    '8-54': { id: '8-54', name: '§ 8-54. Opphold i fengsel', gruppe: 'VIII. Opphold i institusjon' },
    '8-55': { id: '8-55', name: '§ 8-55. Sykepenger ved yrkesskade', gruppe: 'IX. Yrkesskade' },
}

// Sakstyper med kun en array av vilkårs-IDer
const sakstyper: { [key: string]: string[] } = {
    arbeidstaker: ['8-15', '8-16', '8-17', '8-18', '8-19', '8-23', '8-24'],
    næringsdrivende: ['8-34', '8-35', '8-36', '8-37', '8-2', '8-7'],
    'arbeidstaker kombinert med næringsdrivende': ['8-15', '8-16', '8-34', '8-35', '8-2', '8-7', '8-23'],
    'arbeidstaker med yrkesskade': ['8-15', '8-16', '8-17', '8-19', '8-55', '8-20'],
}

export default function Page(): ReactElement {
    const [selectedCaseType, setSelectedCaseType] = useState('arbeidstaker')
    const [customVilkarIds, setCustomVilkarIds] = useState<string[]>([])
    const [selectedCustomVilkarId, setSelectedCustomVilkarId] = useState<string>('')

    // Hent de base vilkårs-IDene for valgt sakstype
    const baseVilkarIds = sakstyper[selectedCaseType] || []
    // Kombiner med eventuelle egendefinerte vilkårs-IDer
    const currentVilkarIds = [...baseVilkarIds, ...customVilkarIds]

    // Filtrer ut de vilkårene som ikke allerede er valgt
    const availableVilkarOptions = Object.values(vilkarData).filter((vilkar) => !currentVilkarIds.includes(vilkar.id))

    const handleAddCustomVilkars = () => {
        if (selectedCustomVilkarId !== '') {
            setCustomVilkarIds([...customVilkarIds, selectedCustomVilkarId])
            setSelectedCustomVilkarId('')
        }
    }

    // Ved bytte av sakstype tømmes egendefinerte vilkår
    const handleCaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCaseType(e.target.value)
        setCustomVilkarIds([])
    }

    return (
        <div className="mt-4">
            <div className="mb-4">
                <Select size="small" label="Sakstype" value={selectedCaseType} onChange={handleCaseTypeChange}>
                    <option value="arbeidstaker">Arbeidstaker</option>
                    <option value="næringsdrivende">Næringsdrivende</option>
                    <option value="arbeidstaker kombinert med næringsdrivende">
                        Arbeidstaker kombinert med næringsdrivende
                    </option>
                    <option value="arbeidstaker med yrkesskade">Arbeidstaker med yrkesskade</option>
                </Select>
            </div>

            <Table size="small" className="mb-8">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">
                            <BodyShort>Vilkår</BodyShort>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">
                            <BodyShort>Vurdering</BodyShort>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {currentVilkarIds.map((vilkarId) => {
                        const vilkar = vilkarData[vilkarId]
                        if (!vilkar) return null
                        return <EnkeltVilkarRad key={vilkar.id} name={vilkar.name} />
                    })}
                </Table.Body>
            </Table>

            <div>
                <Select
                    size="small"
                    label="Nytt vilkår"
                    value={selectedCustomVilkarId}
                    onChange={(e) => setSelectedCustomVilkarId(e.target.value)}
                >
                    <option value="">-- Velg vilkår --</option>
                    {availableVilkarOptions.map((vilkar) => (
                        <option key={vilkar.id} value={vilkar.id}>
                            {vilkar.name}
                        </option>
                    ))}
                </Select>
                <Button onClick={handleAddCustomVilkars} className="mt-2" variant="secondary-neutral" size="small">
                    Legg til
                </Button>
            </div>
        </div>
    )
}

function EnkeltVilkarRad({ name }: { name: string }) {
    const [vurdering, setVurdering] = useState<string | null>(null)

    const [expanded, setExpanded] = useState(false)

    function oppfyltTekst(vurdering: string | null) {
        switch (vurdering) {
            case 'ja':
                return 'Oppfylt'
            case 'nei':
                return 'Ikke oppfylt'
            case 'uavklart':
            case 'ikke-aktuelt':
                return '---'
            default:
                return ''
        }
    }

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            expandOnRowClick={true}
            open={expanded}
            onOpenChange={(open) => setExpanded(open)}
            content={
                <div className="bg-blue-50 p-4 rounded">
                    <RadioGroup
                        className="mb-4"
                        size="small"
                        legend="Er vilkåret oppfylt?"
                        value={vurdering}
                        onChange={(e) => setVurdering(e)}
                    >
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                        <Radio value="uavklart">Uavklart</Radio>
                        <Radio value="ikke-aktuelt">Ikke aktuelt</Radio>
                    </RadioGroup>
                    <Textarea className="mb-4" size="small" label="Notat til beslutter" />
                    <div className="flex gap-2">
                        <Button
                            variant="primary"
                            size="small"
                            onClick={() => {
                                setExpanded(false)
                            }}
                        >
                            Lagre
                        </Button>
                        <Button
                            variant="secondary"
                            size="small"
                            onClick={() => {
                                setExpanded(false)
                            }}
                        >
                            Avbryt
                        </Button>
                    </div>
                </div>
            }
        >
            <Table.DataCell scope="row">
                <Ikon vurdering={vurdering} />
            </Table.DataCell>
            <Table.DataCell scope="row">{name}</Table.DataCell>
            <Table.DataCell scope="row">{oppfyltTekst(vurdering)}</Table.DataCell>
        </Table.ExpandableRow>
    )
}

function Ikon({ vurdering }: { vurdering: string | null }) {
    switch (vurdering) {
        case 'ja':
            return <CheckmarkCircleFillIcon color="var(--a-icon-success)" />
        case 'nei':
            return <XMarkOctagonFillIcon color="var(--a-icon-danger)" />
        case 'uavklart':
            return <QuestionmarkCircleFillIcon color="var(--a-icon-info)" />
        case 'ikke-aktuelt':
            return <ExclamationmarkTriangleFillIcon color="var(--a-icon-warning)" />
        default:
            return <QuestionmarkCircleFillIcon color="var(--a-icon-info)" />
    }
}

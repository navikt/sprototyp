'use client'

import React, { ReactElement, useState } from 'react'
import { BodyShort, Radio, RadioGroup, Table } from '@navikt/ds-react'
import {
    CheckmarkCircleFillIcon,
    XMarkOctagonFillIcon,
    QuestionmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
} from '@navikt/aksel-icons'

import ExpandableComponent from '@/components/customekspander/EkspanderbarSporto'

export default function Page(): ReactElement {
    return (
        <div className="mt-4">
            {vilkar.map(({ gruppe, vilkar }, i) => {
                return (
                    <ExpandableComponent key={i} header={gruppe}>
                        <Table size="small">
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
                                {vilkar.map(({ name }, i) => {
                                    return <EnkeltVilkarRad name={name} key={i} />
                                })}
                            </Table.Body>
                        </Table>
                    </ExpandableComponent>
                )
            })}
        </div>
    )
}

function EnkeltVilkarRad({ name }: { name: string }) {
    const [vurdering, setVurdering] = useState<string | null>(null)

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            expandOnRowClick={true}
            content={
                <div className="bg-blue-50 p-4 rounded">
                    <RadioGroup
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
                </div>
            }
        >
            <Table.DataCell scope="row">
                <Ikon vurdering={vurdering} />
            </Table.DataCell>
            <Table.DataCell scope="row">{name}</Table.DataCell>
        </Table.ExpandableRow>
    )
}

function Ikon({ vurdering }: { vurdering: string | null }) {
    switch (vurdering) {
        case 'ja':
            return <CheckmarkCircleFillIcon color="var(--a-icon-success)"></CheckmarkCircleFillIcon>
        case 'nei':
            return <XMarkOctagonFillIcon color="var(--a-icon-danger)"></XMarkOctagonFillIcon>
        case 'uavklart':
            return <QuestionmarkCircleFillIcon color="var(--a-icon-info)"></QuestionmarkCircleFillIcon>
        case 'ikke-aktuelt':
            return <ExclamationmarkTriangleFillIcon color="var(--a-icon-warning)"></ExclamationmarkTriangleFillIcon>
        default:
            return <QuestionmarkCircleFillIcon color="var(--a-icon-info)"></QuestionmarkCircleFillIcon>
    }
}

const vilkar = [
    {
        gruppe: 'Kapittel 8 – Innledende bestemmelser',
        vilkar: [
            { name: '§ 8-1. Formål' },
            { name: '§ 8-1 a. Forholdet til bestemmelser om internasjonal trygdekoordinering' },
        ],
    },
    {
        gruppe: 'I. Generelle bestemmelser',
        vilkar: [
            { name: '§ 8-2. Opptjeningstid' },
            { name: '§ 8-3. Tap av pensjonsgivende inntekt og minsteinntekt' },
            { name: '§ 8-4. Arbeidsuførhet' },
            { name: '§ 8-5. Sykepenger ved friskmelding til arbeidsformidling' },
            { name: '§ 8-6. Gradert sykmelding' },
            { name: '§ 8-7. Dokumentasjon av arbeidsuførhet' },
            { name: '§ 8-7 a. Oppfølging mv. i regi av Arbeids- og velferdsetaten' },
            { name: '§ 8-8. Medlemmets medvirkning' },
            { name: '§ 8-9. Oppholdskrav' },
            { name: '§ 8-10. Sykepengegrunnlag' },
            { name: '§ 8-11. Sykepengedager' },
            { name: '§ 8-12. Antall sykepengedager' },
            { name: '§ 8-13. Graderte sykepenger' },
            { name: '§ 8-14. Tilskott til arbeidsreiser' },
        ],
    },
    {
        gruppe: 'II. Arbeidstakere',
        vilkar: [
            { name: '§ 8-15. Rett til sykepenger og feriepenger som arbeidstaker' },
            { name: '§ 8-16. Sykepengenes størrelse (kompensasjonsnivå)' },
            { name: '§ 8-17. Sykepenger fra trygden' },
            { name: '§ 8-18. Sykepenger fra arbeidsgiveren' },
            { name: '§ 8-19. Beregning av arbeidsgiverperiode' },
            { name: '§ 8-20. Risiko for særlig stort sykefravær eller svangerskapsrelatert sykefravær' },
            { name: '§ 8-21. Forsikring mot ansvar for sykepenger i arbeidsgiverperioden' },
            { name: '§ 8-22. Trygdens ansvar når arbeidsgiveren ikke betaler' },
            { name: '§ 8-23. Egenmelding' },
            { name: '§ 8-24. Rett til å nytte egenmelding' },
            { name: '§ 8-25. Unntak fra retten til å nytte egenmelding' },
            { name: '§ 8-26. Egenerklæring' },
            { name: '§ 8-27. Tap av retten til å nytte egenmelding' },
            { name: '§ 8-28. Sykepengegrunnlaget i arbeidsgiverperioden' },
            { name: '§ 8-29. Inntekter som inngår i beregning av den aktuelle månedsinntekten' },
            { name: '§ 8-30. Sykepengegrunnlaget når trygden yter sykepenger' },
            { name: '§ 8-31. Sykepenger under streik og lockout' },
            { name: '§ 8-32. Sykepenger under gå-sakte-aksjon' },
            { name: '§ 8-33. Feriepenger' },
        ],
    },
    {
        gruppe: 'III. Selvstendig næringsdrivende',
        vilkar: [
            { name: '§ 8-34. Sykepengedekning m.m.' },
            { name: '§ 8-35. Sykepengegrunnlag' },
            { name: '§ 8-36. Forsikring for tillegg til sykepenger' },
            { name: '§ 8-37. Opphør av forsikring for tillegg til sykepenger' },
        ],
    },
    {
        gruppe: 'IV. Frilansere',
        vilkar: [
            { name: '§ 8-38. Sykepengedekning og sykepengegrunnlag' },
            { name: '§ 8-39. Forsikring for tilleggssykepenger' },
        ],
    },
    {
        gruppe: 'V. Medlemmer med kombinerte inntekter',
        vilkar: [
            { name: '§ 8-40. Arbeidstaker og frilanser' },
            { name: '§ 8-41. Arbeidstaker og selvstendig næringsdrivende' },
            { name: '§ 8-42. Selvstendig næringsdrivende og frilanser' },
            { name: '§ 8-43. Arbeidstaker, selvstendig næringsdrivende og frilanser' },
        ],
    },
    {
        gruppe: 'VI. Særskilte grupper',
        vilkar: [
            { name: '§ 8-44. Arbeidstaker på skip' },
            { name: '§ 8-45. Fiskere' },
            { name: '§ 8-46. Vernepliktige' },
            { name: '§ 8-47. Yrkesaktive medlemmer som midlertidig har vært ute av inntektsgivende arbeid' },
        ],
    },
    {
        gruppe: 'VII. Medlemmer som har rett til andre ytelser fra folketrygden m.m.',
        vilkar: [
            { name: '§ 8-48. Forholdet mellom sykepenger og andre folketrygdytelser' },
            { name: '§ 8-49. Medlemmer med dagpenger under arbeidsløshet eller ventelønn m.m.' },
            { name: '§ 8-50. Medlemmer med uføretrygd' },
            { name: '§ 8-51. Medlem mellom 62 og 70 år' },
            { name: '§ 8-52. Medlemmer med avtalefestet pensjon' },
        ],
    },
    {
        gruppe: 'VIII. Opphold i institusjon',
        vilkar: [
            { name: '§ 8-53. Sykepenger under opphold i helseinstitusjon o.l.' },
            { name: '§ 8-54. Opphold i fengsel' },
        ],
    },
    {
        gruppe: 'IX. Yrkesskade',
        vilkar: [{ name: '§ 8-55. Sykepenger ved yrkesskade' }],
    },
]

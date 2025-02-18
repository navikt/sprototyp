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
        gruppe: 'Generelle bestemmelser',
        vilkar: [
            {
                name: '§ 8-2 Opptjeningstid',
            },
            {
                name: '§ 8-3 Tap av pensjonsgivende inntekt og minsteinntekt ',
            },
            {
                name: '§ 8-4 Arbeidsuførhet',
            },
            {
                name: '§ 8-5 Yrkesmessig uførhet',
            },
        ],
    },
    {
        gruppe: 'Arbeidstakere',
        vilkar: [
            {
                name: '§ 8-55 Bla bla',
            },
            {
                name: '§ 8-3 Tap av pensjonsgivende inntekt og minsteinntekt ',
            },
            {
                name: '§ 8-4 Arbeidsuførhet',
            },
        ],
    },
]

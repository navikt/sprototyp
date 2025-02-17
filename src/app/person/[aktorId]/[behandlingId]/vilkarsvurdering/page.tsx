'use client'

import React, { ReactElement, useState } from 'react'
import { ExpansionCard, Radio, RadioGroup, Table } from '@navikt/ds-react'

export default function Page(): ReactElement {
    return (
        <div className="mt-4">
            {vilkar.map(({ gruppe, vilkar }, i) => {
                return (
                    <ExpansionCard
                        key={i}
                        //  className="[&>*]:border-0 [&>*:hover]:!border-0"
                        aria-label="Demo med custom styling"
                        style={
                            {
                                '--__ac-expansioncard-border-hover-width': '0px',
                            } as React.CSSProperties
                        }
                    >
                        <ExpansionCard.Header>
                            <ExpansionCard.Title>{gruppe}</ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell scope="col">Vilkår</Table.HeaderCell>
                                        <Table.HeaderCell scope="col">Vurdering</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {vilkar.map(({ name }, i) => {
                                        return <EnkeltVilkarRad name={name} key={i} />
                                    })}
                                </Table.Body>
                            </Table>
                        </ExpansionCard.Content>
                    </ExpansionCard>
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
                <div className="bg-blue-50 p-4">
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
            <Table.DataCell scope="row">ikon</Table.DataCell>
            <Table.DataCell scope="row">{name}</Table.DataCell>
        </Table.ExpandableRow>
    )
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

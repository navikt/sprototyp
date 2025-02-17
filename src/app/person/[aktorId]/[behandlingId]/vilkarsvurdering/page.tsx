'use client'

import { ReactElement } from 'react'
import { Accordion, Radio, RadioGroup, Table } from '@navikt/ds-react'

export default function Page(): ReactElement {
    return (
        <Accordion className="w-full">
            <Accordion.Item>
                <Accordion.Header>Generelle bestemmelser</Accordion.Header>
                <Accordion.Content className="p-0">
                    {data.map(({ name }, i) => {
                        return (
                            <Accordion.Item key={i}>
                                <Accordion.Header>{name}</Accordion.Header>
                                <Accordion.Content className="p-0">
                                    <RadioGroup legend="Er vilkåret oppfylt?">
                                        <Radio value="10">Ja</Radio>
                                        <Radio value="20">Nei</Radio>
                                        <Radio value="40">Uavklart</Radio>
                                        <Radio value="40">Ikke aktuelt</Radio>
                                    </RadioGroup>
                                </Accordion.Content>
                            </Accordion.Item>
                        )
                    })}
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Arbeidstakere</Accordion.Header>
                <Accordion.Content className="p-0">
                    <Table className="mt-10">
                        <Table.Body>
                            {data.map(({ name }, i) => {
                                return (
                                    <Table.ExpandableRow key={i} content="Innhold i ekspanderbar rad">
                                        <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
                                    </Table.ExpandableRow>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

const data = [
    {
        name: '§ 8-2 Opptjeningstid',
    },
    {
        name: '§ 8-3 Tap av pensjonsgivende inntekt og minsteinntekt ',
    },
    {
        name: '§ 8-4 Arbeidsuførhet',
    },
]

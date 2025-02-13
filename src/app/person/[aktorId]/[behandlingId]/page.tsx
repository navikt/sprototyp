'use client'

import { ReactElement } from 'react'
import { Table } from '@navikt/ds-react'

export default function Page(): ReactElement {
    return (
        <div className="flex">
            <div className="w-40" />
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
            <div className="w-20" />
        </div>
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

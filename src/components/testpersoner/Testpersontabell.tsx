'use client'

import React, { ReactElement } from 'react'
import { Table } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

import { personer } from '@/backend/personer'

export function Testpersontabell(): ReactElement {
    const router = useRouter()

    return (
        <>
            <Table size="small" className="w-2/3">
                <Table.Body>
                    {personer.map((person) => (
                        <Table.Row
                            key={person.fodselsnummer}
                            className="hover:cursor-pointer"
                            onClick={() => {
                                router.push('/person/' + person.aktorId)
                            }}
                        >
                            <Table.DataCell>{person.navn}</Table.DataCell>
                            <Table.DataCell>{person.fodselsnummer}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}

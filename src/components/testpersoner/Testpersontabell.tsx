'use client'

import React, { ReactElement } from 'react'
import { Label, Search, Table } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

import { hentPersonMedFnr, personer } from '@/backend/personer'

export function Testpersontabell(): ReactElement {
    const router = useRouter()

    const [fnr, setFnr] = React.useState('')
    return (
        <>
            <div className="mb-8">
                <Label>Fødselsnummer/D-nummer</Label>
                <Search
                    label="Fødselsnummer/D-nummer"
                    variant="primary"
                    htmlSize="12"
                    value={fnr}
                    onChange={setFnr}
                    onSearchClick={() => {
                        if (fnr.length > 0) {
                            const person = hentPersonMedFnr(fnr) || personer[0]
                            router.push('/person/' + person.aktorId)
                        }
                    }}
                />
            </div>

            <Table size="small" className="w-72 border-dashed border">
                <Table.Body>
                    {personer.map((person) => (
                        <Table.Row
                            key={person.fodselsnummer}
                            className="hover:cursor-pointer hover:underline border-0 text-text-action"
                            onClick={() => {
                                setFnr(person.fodselsnummer)
                            }}
                        >
                            <Table.DataCell className="border-0">{person.navn}</Table.DataCell>
                            <Table.DataCell className="border-0">{person.fodselsnummer}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}

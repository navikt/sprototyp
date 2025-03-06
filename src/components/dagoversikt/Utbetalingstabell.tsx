import React, { ReactElement } from 'react'
import { Table } from '@navikt/ds-react'

import { useDager } from '@hooks/queries/useDager'
import { somNorskDato } from '@utils/date'

interface UtbetalingstabellProps {
    inntektId: string
}

export const Utbetalingstabell = ({ inntektId }: UtbetalingstabellProps): ReactElement => {
    const { data: dager } = useDager(inntektId)
    if (!dager) {
        return <></>
    }

    return (
        <Table aria-label="Dager" size="small" className="mt-4">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Dato</Table.ColumnHeader>
                    <Table.ColumnHeader>Dagtype</Table.ColumnHeader>
                    <Table.ColumnHeader>Grad</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {dager.map((dag, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell>{somNorskDato(dag.dato)}</Table.DataCell>
                        <Table.DataCell>{dag.dagtype}</Table.DataCell>
                        <Table.DataCell>-</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

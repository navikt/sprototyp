import React, { ReactElement } from 'react'
import { Button, Checkbox, Heading, HStack, Table } from '@navikt/ds-react'
import { MultiplyIcon, PersonPencilIcon } from '@navikt/aksel-icons'

import { useDager } from '@hooks/queries/useDager'
import { somNorskDato } from '@utils/date'
import { Inntekt } from '@typer/manuellbehandlingtypes'

interface UtbetalingstabellProps {
    inntekt: Inntekt
}

export const Utbetalingstabell = ({ inntekt }: UtbetalingstabellProps): ReactElement => {
    const { data: dager } = useDager(inntekt.id)
    const [editMode, setEditMode] = React.useState(false)
    const [selectedDager, setSelectedDager] = React.useState<string[]>([])
    if (!dager) {
        return <></>
    }

    return (
        <>
            <HStack align="center" gap="1" className="mt-8">
                <Heading size="small">{inntekt.orgnavn || inntekt.inntektstype}</Heading>
                {!editMode && (
                    <Button
                        size="xsmall"
                        variant="tertiary"
                        onClick={() => setEditMode(!editMode)}
                        icon={<PersonPencilIcon fontSize="1.5rem" />}
                    >
                        Endre dager
                    </Button>
                )}
                {editMode && (
                    <Button
                        size="xsmall"
                        variant="tertiary"
                        onClick={() => setEditMode(!editMode)}
                        icon={<MultiplyIcon fontSize="1.5rem" />}
                    >
                        Avbryt
                    </Button>
                )}
            </HStack>
            <Table aria-label="Dager" size="small" className="mt-4">
                <Table.Header>
                    <Table.Row>
                        {editMode && (
                            <Table.ColumnHeader className="w-10">
                                <Checkbox
                                    hideLabel
                                    onClick={() => {
                                        if (selectedDager.length > 0) {
                                            setSelectedDager([])
                                        } else {
                                            setSelectedDager(dager.map((dag) => dag.id))
                                        }
                                    }}
                                    checked={selectedDager.length === dager.length}
                                    indeterminate={selectedDager.length > 0 && selectedDager.length < dager.length}
                                >
                                    Alle dager
                                </Checkbox>
                            </Table.ColumnHeader>
                        )}
                        <Table.ColumnHeader>Dato</Table.ColumnHeader>
                        <Table.ColumnHeader>Dagtype</Table.ColumnHeader>
                        <Table.ColumnHeader>Grad</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dager.map((dag, index) => (
                        <Table.Row key={index}>
                            {editMode && (
                                <Table.ColumnHeader className="w-10">
                                    <Checkbox
                                        checked={selectedDager.includes(dag.id)}
                                        onClick={() => {
                                            if (selectedDager.includes(dag.id)) {
                                                setSelectedDager(selectedDager.filter((id) => id !== dag.id))
                                            } else {
                                                setSelectedDager([...selectedDager, dag.id])
                                            }
                                        }}
                                        hideLabel
                                    >
                                        {dag.dato}
                                    </Checkbox>
                                </Table.ColumnHeader>
                            )}
                            <Table.DataCell>{somNorskDato(dag.dato)}</Table.DataCell>
                            <Table.DataCell>{dag.dagtype}</Table.DataCell>
                            <Table.DataCell>-</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}

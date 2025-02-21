import classNames from 'classnames'
import React, { ReactElement, useMemo } from 'react'
import { Table } from '@navikt/ds-react'
import dayjs from 'dayjs'

import { getFormattedDateString } from '@utils/date'
import { Utbetalingstabelldag } from '@typer/utbetalingstabell'

import styles from './Utbetalingstabell.module.css'

interface UtbetalingstabellProps {
    fom: string
    tom: string
}

export const Utbetalingstabell = ({ fom, tom }: UtbetalingstabellProps): ReactElement => {
    const formattedFom = getFormattedDateString(fom)
    const formattedTom = getFormattedDateString(tom)

    const dagerList: Array<Utbetalingstabelldag> = useMemo(() => {
        // konstruerer en mappe med dager
        const dager: Map<string, Utbetalingstabelldag> = new Map()
        // lag alle dager fra fom til tom og putt i mappet
        const fromDate = dayjs(fom)
        const toDate = dayjs(tom)
        // loop gjennom alle dager fra fom til tom
        for (let date = fromDate; date.isBefore(toDate.add(1, 'day')); date = date.add(1, 'day')) {
            const dato = date.format('YYYY-MM-DD')
            // sett inn dag i mappet
            dager.set(dato, {
                dato,
            })
        }

        return Array.from(dager.values())
    }, [fom, tom])

    return (
        <section className={classNames(styles.container)}>
            <div className={styles.tableContainer}>
                <Table aria-label={`Utbetalinger for sykmeldingsperiode fra ${formattedFom} til ${formattedTom}`}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Dato
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Dagtype
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Grad
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Kilde
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Total grad
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Refusjon
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Utbetaling
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Dager igjen
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className={styles.header} scope="col" colSpan={1}>
                                Merknader
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {dagerList.map((dag, index) => (
                            <Table.Row key={index}>
                                <Table.DataCell className={styles.data} colSpan={1}>
                                    {dag.dato}
                                </Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}>
                                    dagtype
                                </Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}></Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}>
                                    type
                                </Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}>
                                    {dag.grad} %
                                </Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}></Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}></Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}></Table.DataCell>
                                <Table.DataCell className={styles.data} colSpan={1}>
                                    <span className={styles.merknader}>Merknader</span>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </section>
    )
}

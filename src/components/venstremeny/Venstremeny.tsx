import React, { ReactElement } from 'react'
import { Button, DatePicker, Label, useRangeDatepicker, VStack } from '@navikt/ds-react'
import { usePathname } from 'next/navigation'

import styles from './Venstremeny.module.css'

export const Venstremeny = (): ReactElement => {
    const pathname = usePathname()
    if (pathname.includes('behandling')) {
        return (
            <section className={styles.Venstremeny}>
                <SykmeldingPeriode />

                <div>
                    <Button variant="tertiary" size="xsmall">
                        Skriv individuell begrunnelse
                    </Button>
                </div>
                <div>
                    <Button size="small">Send til godkjenning</Button>
                </div>
            </section>
        )
    }
    return <section className={styles.Venstremeny}></section>
}

const SykmeldingPeriode = () => {
    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({})

    return (
        <div>
            <Label size="small" className="mb-4">
                Periode
            </Label>
            <DatePicker {...datepickerProps}>
                <VStack gap="4" justify="center" className="pl-4 ">
                    <DatePicker.Input size="small" {...fromInputProps} label="Fra" />
                    <DatePicker.Input size="small" {...toInputProps} label="Til" />
                </VStack>
            </DatePicker>
        </div>
    )
}

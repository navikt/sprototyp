'use client'

import { ReactElement } from 'react'
import { Button, DatePicker, Heading, HStack, useDatepicker, useRangeDatepicker } from '@navikt/ds-react'
import { useParams, useRouter } from 'next/navigation'

import { useNyBehandling } from '@hooks/mutations/useNyBehandling'

export default function Page(): ReactElement {
    const { datepickerProps, toInputProps, fromInputProps, selectedRange } = useRangeDatepicker({
        defaultSelected: { from: new Date('2025-02-01'), to: new Date('2025-02-20') },
    })
    const {
        datepickerProps: datepickerPropsSkjaring,
        inputProps,
        selectedDay,
    } = useDatepicker({
        fromDate: new Date('Aug 23 2019'),
    })
    const mutation = useNyBehandling()
    const router = useRouter()
    const params = useParams()

    return (
        <div className="p-4">
            <Heading size="medium" className="mb-8">
                Ny manuell behandling
            </Heading>

            <div className="mb-8">
                <DatePicker {...datepickerProps}>
                    <HStack wrap gap="4" justify="center">
                        <DatePicker.Input {...fromInputProps} label="Fra" />
                        <DatePicker.Input {...toInputProps} label="Til" />
                    </HStack>
                </DatePicker>
            </div>
            <div className="mb-8">
                <DatePicker {...datepickerPropsSkjaring}>
                    <DatePicker.Input {...inputProps} label="Skjæringstidspunkt" />
                </DatePicker>
            </div>
            <div className="flex pt-4 gap-4">
                <Button
                    type="button"
                    onClick={() => {
                        const fom = selectedRange?.from?.toISOString().split('T')[0] ?? ''
                        const tom = selectedRange?.to?.toISOString().split('T')[0] ?? ''
                        const skjaring = selectedDay?.toISOString().split('T')[0] ?? ''
                        mutation.mutate({
                            callback: (behandlingId) =>
                                router.push(
                                    `/person/${params.aktorId}/behandling/${behandlingId.id}/sykepengegrunnlag`,
                                ),
                            request: { fom, tom, skjaring },
                        })
                    }}
                >
                    Opprett
                </Button>
                <Button type="button" variant="secondary" onClick={() => router.back()}>
                    Avbryt
                </Button>
            </div>
        </div>
    )
}

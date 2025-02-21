'use client'

import { ReactElement, useRef } from 'react'
import { BodyLong, Button, DatePicker, HStack, Modal, Select, useRangeDatepicker } from '@navikt/ds-react'
import { usePathname, useRouter } from 'next/navigation'

import { useNyBehandling } from '@hooks/mutations/useNyBehandling'

export default function Page(): ReactElement {
    const mutation = useNyBehandling()
    const router = useRouter()
    const pathname = usePathname()
    const ref = useRef<HTMLDialogElement>(null)
    const { datepickerProps, toInputProps, fromInputProps, selectedRange } = useRangeDatepicker({
        defaultSelected: { from: new Date('2025-02-01'), to: new Date('2025-02-20') },
    })
    return (
        <div className="p-16">
            <Button variant="secondary-neutral" onClick={() => ref.current?.showModal()}>
                Start ny behandling
            </Button>

            <div className="py-16">
                <Modal ref={ref} header={{ heading: 'Opprett ny behandling' }}>
                    <Modal.Body>
                        <Select label="Velg behandling" className="mb-8">
                            <option value="ss">Søknad om sykepenger</option>
                            <option value="serwws">Reisetilskudd</option>
                            <option value="ssweq2314">Behandlingsdager</option>
                            <option value="s123123s">Refusjon av arbeidsgiverperioden - kronisk syk</option>
                            <option value="s12312s">Refusjon av arbeidsgiverperioden - gravid</option>
                        </Select>
                        <BodyLong spacing>
                            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui incididunt dolor do ad ut.
                            Incididunt eiusmod nostrud deserunt duis laborum. Proident aute culpa qui nostrud velit
                            adipisicing minim. Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua
                            exercitation non minim minim pariatur sunt laborum ipsum. Exercitation nostrud est laborum
                            magna non non aliqua qui esse.
                        </BodyLong>
                        <DatePicker {...datepickerProps}>
                            <HStack wrap gap="4" justify="center">
                                <DatePicker.Input {...fromInputProps} label="Fra" />
                                <DatePicker.Input {...toInputProps} label="Til" />
                            </HStack>
                        </DatePicker>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="button"
                            onClick={() => {
                                const fom = selectedRange?.from?.toISOString().split('T')[0] ?? ''
                                const tom = selectedRange?.to?.toISOString().split('T')[0] ?? ''
                                mutation.mutate({
                                    callback: (behandlingId) =>
                                        router.push(pathname + '/behandling/' + behandlingId.id + '/vilkarsvurdering'),
                                    request: { fom, tom },
                                })
                                ref.current?.close()
                            }}
                        >
                            Opprett
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => ref.current?.close()}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

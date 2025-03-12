'use client'

import React, { ReactElement, useState } from 'react'
import { BodyShort, Radio, RadioGroup, Table, Select, Button, Textarea, Detail } from '@navikt/ds-react'
import { CheckmarkCircleFillIcon, XMarkOctagonFillIcon, CircleBrokenIcon } from '@navikt/aksel-icons'

import { sakstyper, regler, Regel } from '@components/vilkarsvurdering/vilkar'
import { useVilkar } from '@hooks/queries/useVilkar'
import { useNyeVilkaar } from '@hooks/mutations/useNyeVilkaar'
import { Vilkarsvurdering } from '@typer/manuellbehandlingtypes'
import { useDeleteVilkar } from '@hooks/mutations/useDeleteVilkar'
import { useNyttVilkaar } from '@hooks/mutations/useNyttVilkaar'
import { useUpdateVilkaar } from '@hooks/mutations/useUpdateVilkar'

export default function Page(): ReactElement {
    const [selectedCaseType, setSelectedCaseType] = useState('velg')
    const [selectedCustomVilkarId, setSelectedCustomVilkarId] = useState<string>('')

    const { data: vilkar } = useVilkar()
    const { mutate: leggTilNyeVilkaar } = useNyeVilkaar()
    const { mutate: leggTilNyttVilkaar } = useNyttVilkaar()

    // Ved bytte av sakstype tømmes egendefinerte vilkår
    const handleCaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCaseType(e.target.value)
        const reglerFraCase = sakstyper[e.target.value]
        leggTilNyeVilkaar({ request: { vilkar: reglerFraCase } })
    }

    const availableVilkarOptions = regler.filter((r) => !(vilkar?.map((v) => v.regelId) || []).includes(r.id))
    const { mutate: updateVilkar } = useUpdateVilkaar()

    const alleVilkarUndefined = vilkar?.every((v) => v.vurdering === undefined)
    return (
        <div className="mt-4">
            <div className="mb-4">
                <Select size="small" label="Sakstype" value={selectedCaseType} onChange={handleCaseTypeChange}>
                    <option value="velg">-- Velg sakstype --</option>
                    {Object.keys(sakstyper).map((sakstype) => {
                        return (
                            <option key={sakstype} value={sakstype}>
                                {sakstype}
                            </option>
                        )
                    })}
                </Select>
            </div>

            <Table size="small" className="mb-8">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            {alleVilkarUndefined && (
                                <Button
                                    size="small"
                                    variant="tertiary"
                                    icon={<CheckmarkCircleFillIcon color="var(--a-icon-success)" title="check alle" />}
                                    onClick={() => {
                                        vilkar?.forEach((v) => {
                                            const oppdatering = { ...v, vurdering: 'ja' }
                                            updateVilkar({ request: oppdatering })
                                        })
                                    }}
                                />
                            )}
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">
                            <BodyShort className="font-bold">Vilkår</BodyShort>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">
                            <BodyShort className="font-bold">Vurdering</BodyShort>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(vilkar || []).map((v) => {
                        //TODO enb sortering
                        return <EnkeltVilkarRad key={v.id} vilkarsvurdering={v} />
                    })}
                </Table.Body>
            </Table>

            <div>
                <Select
                    size="small"
                    label="Ny regel"
                    value={selectedCustomVilkarId}
                    onChange={(e) => setSelectedCustomVilkarId(e.target.value)}
                >
                    <option value="">-- Velg regel --</option>
                    {availableVilkarOptions.map((regel) => (
                        <option key={regel.navn} value={regel.id}>
                            {regel.navn}
                        </option>
                    ))}
                </Select>
                <Button
                    className="mt-2"
                    variant="secondary-neutral"
                    size="small"
                    onClick={() => {
                        leggTilNyttVilkaar({ request: { regelId: selectedCustomVilkarId } })
                    }}
                >
                    Legg til
                </Button>
            </div>
        </div>
    )
}

function EnkeltVilkarRad({ vilkarsvurdering }: { vilkarsvurdering: Vilkarsvurdering }) {
    const { mutate: updateVilkar } = useUpdateVilkaar()
    const [expanded, setExpanded] = useState(false)
    const { mutate: slettVilkar } = useDeleteVilkar()
    const regel = regler.find((r) => r.id === vilkarsvurdering.regelId) as Regel
    const vurdering = vilkarsvurdering.vurdering

    function oppfyltTekst(vurdering: string | undefined) {
        switch (vurdering) {
            case 'ja':
                return 'Oppfylt'
            case 'nei':
                return 'Ikke oppfylt'
            case 'unntak':
                return 'Unntak'
            default:
                return ''
        }
    }

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            expandOnRowClick={true}
            open={expanded}
            onOpenChange={(open) => setExpanded(open)}
            content={
                <>
                    {regel.lovverk.map((lovverk) => {
                        const tekst = []
                        tekst.push(lovverk.lovverk)
                        tekst.push('§ ' + lovverk.paragraf)
                        if (lovverk.ledd) tekst.push(lovverk.ledd)
                        if (lovverk.bokstav) tekst.push(lovverk.bokstav)
                        const lovverkTekst = tekst.join(' ')
                        return <Detail key={lovverkTekst}>{lovverkTekst}</Detail>
                    })}
                    <div className="bg-blue-50 p-4 rounded">
                        <RadioGroup
                            className="mb-4"
                            size="small"
                            legend="Er vilkåret oppfylt?"
                            value={vurdering}
                            onChange={(e) => {
                                const oppdatering = { ...vilkarsvurdering, vurdering: e.target.value }
                                updateVilkar({ request: oppdatering })
                            }}
                        >
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                            <Radio value="unntak">Unntak</Radio>
                        </RadioGroup>
                        <Textarea className="mb-4" size="small" label="Notat til beslutter" />
                        <div className="flex justify-between">
                            <Button
                                variant="primary"
                                size="small"
                                onClick={() => {
                                    setExpanded(false)
                                }}
                            >
                                Lagre
                            </Button>
                            <Button
                                variant="secondary-neutral"
                                size="small"
                                onClick={() => {
                                    // Fjern fra vilkårliste
                                    slettVilkar({ vilkarId: vilkarsvurdering.id })
                                }}
                            >
                                Ikke aktuelt
                            </Button>
                        </div>
                    </div>
                </>
            }
        >
            <Table.DataCell scope="row">
                <Ikon vurdering={vurdering} />
            </Table.DataCell>
            <Table.DataCell scope="row">{regel.navn}</Table.DataCell>
            <Table.DataCell scope="row">{oppfyltTekst(vurdering)}</Table.DataCell>
        </Table.ExpandableRow>
    )
}

function Ikon({ vurdering }: { vurdering: string | undefined }) {
    switch (vurdering) {
        case 'ja':
            return <CheckmarkCircleFillIcon color="var(--a-icon-success)" />
        case 'nei':
            return <XMarkOctagonFillIcon color="var(--a-icon-danger)" />
        case 'unntak':
            return <CircleBrokenIcon color="var(--a-icon-info)" />
        default:
            return null
    }
}

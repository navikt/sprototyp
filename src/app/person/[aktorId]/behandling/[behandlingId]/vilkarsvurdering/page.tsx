'use client'

import React, { ReactElement, useState } from 'react'
import { BodyShort, Radio, RadioGroup, Table, Select, Button, Textarea, Detail } from '@navikt/ds-react'
import {
    CheckmarkCircleFillIcon,
    XMarkOctagonFillIcon,
    QuestionmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
} from '@navikt/aksel-icons'

import { sakstyper, regler, Regel } from '@components/vilkarsvurdering/vilkar'

export default function Page(): ReactElement {
    const [selectedCaseType, setSelectedCaseType] = useState('velg')
    const [customVilkarIds, setCustomVilkarIds] = useState<string[]>([])
    const [selectedCustomVilkarId, setSelectedCustomVilkarId] = useState<string>('')

    // Hent de base vilkårs-IDene for valgt sakstype
    const baseVilkarIds = sakstyper[selectedCaseType] || []
    // Kombiner med eventuelle egendefinerte vilkårs-IDer
    const currentVilkarIds = [...baseVilkarIds, ...customVilkarIds]

    // Filtrer ut de vilkårene som ikke allerede er valgt
    const availableVilkarOptions = regler.filter((vilkar) => !currentVilkarIds.includes(vilkar.id))

    const handleAddCustomVilkars = () => {
        if (selectedCustomVilkarId !== '') {
            setCustomVilkarIds([...customVilkarIds, selectedCustomVilkarId])
            setSelectedCustomVilkarId('')
        }
    }

    // Ved bytte av sakstype tømmes egendefinerte vilkår
    const handleCaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCaseType(e.target.value)
        setCustomVilkarIds([])
    }

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
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">
                            <BodyShort>Vilkår</BodyShort>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">
                            <BodyShort>Vurdering</BodyShort>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {currentVilkarIds.map((id) => {
                        const vilkar = regler.find((v) => v.id === id)
                        if (!vilkar) return null
                        return <EnkeltVilkarRad key={vilkar.navn} regel={vilkar} />
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
                <Button onClick={handleAddCustomVilkars} className="mt-2" variant="secondary-neutral" size="small">
                    Legg til
                </Button>
            </div>
        </div>
    )
}

function EnkeltVilkarRad({ regel }: { regel: Regel }) {
    const [vurdering, setVurdering] = useState<string | null>(null)

    const [expanded, setExpanded] = useState(false)

    function oppfyltTekst(vurdering: string | null) {
        switch (vurdering) {
            case 'ja':
                return 'Oppfylt'
            case 'nei':
                return 'Ikke oppfylt'
            case 'unntak':
            case 'ikke-aktuelt':
                return '---'
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
                            onChange={(e) => setVurdering(e)}
                        >
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                            <Radio value="unntak">Unntak</Radio>
                            <Radio value="ikke-aktuelt">Ikke aktuelt</Radio>
                        </RadioGroup>
                        <Textarea className="mb-4" size="small" label="Notat til beslutter" />
                        <div className="flex gap-2">
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
                                variant="secondary"
                                size="small"
                                onClick={() => {
                                    setExpanded(false)
                                }}
                            >
                                Avbryt
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

function Ikon({ vurdering }: { vurdering: string | null }) {
    switch (vurdering) {
        case 'ja':
            return <CheckmarkCircleFillIcon color="var(--a-icon-success)" />
        case 'nei':
            return <XMarkOctagonFillIcon color="var(--a-icon-danger)" />
        case 'unntak':
            return <QuestionmarkCircleFillIcon color="var(--a-icon-info)" />
        case 'ikke-aktuelt':
            return <ExclamationmarkTriangleFillIcon color="var(--a-icon-warning)" />
        default:
            return <QuestionmarkCircleFillIcon color="var(--a-icon-info)" />
    }
}

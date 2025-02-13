import React, { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

import { GenderIcon } from '@/components/personheader/GenderIcon'
import { Fødselsnummer } from '@/components/personheader/Fødselsnummer'
import { AktørId } from '@/components/personheader/AktørId'

import styles from './PersonHeader.module.css'

export const PersonHeaderWithContent = ({ person }: { person: Person }): ReactElement => {
    return (
        <div className={styles.PersonHeader}>
            <GenderIcon />
            <BodyShort weight="semibold">{`${person.navn} (${person.alder} år)`}</BodyShort>
            <BodyShort className={styles.Separator}>/</BodyShort>
            <Fødselsnummer fødselsnummer={person.fodselsnummer} />
            <BodyShort className={styles.Separator}>/</BodyShort>
            <AktørId aktørId={person.aktorId} />
            <BodyShort className={styles.Separator}>/</BodyShort>
            <BodyShort>
                Boenhet: {person.bohenetId} ({person.boenhetNavn})
            </BodyShort>
        </div>
    )
}

interface Person {
    fodselsnummer: string
    aktorId: string
    navn: string
    alder: number
    bohenetId: string
    boenhetNavn: string
}

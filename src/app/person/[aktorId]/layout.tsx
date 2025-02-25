'use client'

import React, { PropsWithChildren, ReactElement } from 'react'

import { PersonHeaderWithContent } from '@/components/personheader/Personheader'
import { Saksbilde } from '@/components/saksbilde/Saksbilde'
import { Venstremeny } from '@/components/venstremeny/Venstremeny'
import { Historikk } from '@/components/historikk/Historikk'
import { Tidslinje } from '@components/tidslinje/Tidslinje'

import styles from './layout.module.css'

export default function Layout({ children }: PropsWithChildren): ReactElement {
    const person = {
        fodselsnummer: '12345678901',
        aktorId: '1234567890123',
        navn: 'Ola Nordmann',
        alder: 42,
        bohenetId: '123456789',
        boenhetNavn: 'Oslo kommune',
    }

    return (
        <div>
            <div>
                <PersonHeaderWithContent person={person} />
                <Tidslinje />
            </div>
            <div className={styles.Saksbilde}>
                <Venstremeny />
                <Saksbilde>{children}</Saksbilde>
                <Historikk />
            </div>
        </div>
    )
}

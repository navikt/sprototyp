'use client'

import React, { PropsWithChildren, ReactElement } from 'react'

import { PersonHeaderWithContent } from '@/components/personheader/Personheader'

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
            <PersonHeaderWithContent person={person} />
            <div className={styles.Saksbilde}>{children}</div>
        </div>
    )
}

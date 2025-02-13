'use client'

import Link from 'next/link'
import React from 'react'
import { InternalHeader } from '@navikt/ds-react'

import { Personsøk } from '@/components/header/Personsøk'
import { UserMenu } from '@/components/UserMenu'

import styles from './Header.module.css'

export const Header = () => {
    return (
        <InternalHeader className="h-14 bg-green-700">
            <InternalHeader.Title as={Link} href="/" className={styles.Link}>
                Manuell saksbehandling
            </InternalHeader.Title>
            <Personsøk />

            <UserMenu />
        </InternalHeader>
    )
}

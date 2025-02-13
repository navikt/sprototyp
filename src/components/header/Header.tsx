'use client'

import classNames from 'classnames/bind'
import Link from 'next/link'
import React from 'react'
import { InternalHeader } from '@navikt/ds-react'

import { erLokal } from '@/env'
import { Personsøk } from '@/components/header/Personsøk'
import { UserMenu } from '@/components/UserMenu'

import styles from './Header.module.css'

const cx = classNames.bind(styles)

export const Header = () => {
    return (
        <InternalHeader className={cx(styles.header, { localhostHeader: erLokal, devHeader: !erLokal })}>
            <InternalHeader.Title as={Link} href="/" className={styles.Link}>
                NAV Sykepenger
            </InternalHeader.Title>
            <Personsøk />

            <UserMenu />
        </InternalHeader>
    )
}

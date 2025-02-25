'use client'

import React, { PropsWithChildren, ReactElement } from 'react'
import { useParams } from 'next/navigation'

import { PersonHeaderWithContent } from '@/components/personheader/Personheader'
import { Saksbilde } from '@/components/saksbilde/Saksbilde'
import { Venstremeny } from '@/components/venstremeny/Venstremeny'
import { Historikk } from '@/components/historikk/Historikk'
import { Tidslinje } from '@components/tidslinje/Tidslinje'
import { testpersoner } from '@components/testpersoner/testpersoner'

import styles from './layout.module.css'

export default function Layout({ children }: PropsWithChildren): ReactElement {
    const params = useParams()
    const aktorId = params.aktorId

    const person = testpersoner.find((person) => person.aktorId === aktorId) || testpersoner[0]

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

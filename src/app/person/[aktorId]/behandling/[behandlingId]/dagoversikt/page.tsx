'use client'

import { ReactElement } from 'react'

import { Utbetalingstabell } from '@components/dagoversikt/Utbetalingstabell'

export default function Page(): ReactElement {
    return <Utbetalingstabell fom="2025-01-01" tom="2025-01-25" />
}

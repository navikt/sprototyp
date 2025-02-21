'use client'

import React, { ReactElement } from 'react'

import { Utbetalingstabell } from '@components/dagoversikt/Utbetalingstabell'
import { useBehandling } from '@hooks/queries/useBehandling'

export default function Page(): ReactElement {
    const { data: behandling } = useBehandling()
    if (!behandling) {
        return <div />
    }
    return <Utbetalingstabell fom={behandling.fom} tom={behandling.tom} />
}

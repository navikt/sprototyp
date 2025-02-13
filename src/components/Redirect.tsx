'use client'

import React, { ReactElement, useEffect } from 'react'
import { Heading } from '@navikt/ds-react'

export function Redirect(): ReactElement {
    useEffect(() => {
        window.location.href = '/person/1210841234500'
    }, [])
    return (
        <Heading size="xsmall" level="1">
            videresender
        </Heading>
    )
}

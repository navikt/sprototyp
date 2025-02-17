'use client'

import { ReactElement } from 'react'
import { usePathname } from 'next/navigation'
import { Heading } from '@navikt/ds-react'

export default function Page(): ReactElement {
    const pathname = usePathname()

    const lastPath = pathname.split('/').pop()
    return <Heading size="medium">{lastPath}</Heading>
}

'use client'

import { ReactElement } from 'react'
import { Button } from '@navikt/ds-react'
import { usePathname, useRouter } from 'next/navigation'
import { v4 } from 'uuid'

export default function Page(): ReactElement {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className="p-16">
            <Button onClick={() => router.push(pathname + '/' + v4())} variant="secondary-neutral">
                Start ny behandling
            </Button>
        </div>
    )
}

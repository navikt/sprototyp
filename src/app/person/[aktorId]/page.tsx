'use client'

import { ReactElement } from 'react'
import { Button } from '@navikt/ds-react'
import { usePathname, useRouter } from 'next/navigation'

import { useNyBehandling } from '@hooks/mutations/useNyBehandling'

export default function Page(): ReactElement {
    const mutation = useNyBehandling()
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className="p-16">
            <Button
                onClick={() =>
                    mutation.mutate({
                        callback: (behandlingId) =>
                            router.push(pathname + '/behandling/' + behandlingId.id + '/vilkarsvurdering'),
                        request: { fom: '2025-01-01', tom: '2025-01-16' },
                    })
                }
                variant="secondary-neutral"
            >
                Start ny behandling
            </Button>
        </div>
    )
}

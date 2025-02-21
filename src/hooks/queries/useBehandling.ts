import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { Behandling } from '@typer/manuellbehandlingtypes'

export function useBehandling() {
    const params = useParams()

    return useQuery<Behandling, Error>({
        queryKey: ['behandling', params.behandlingId],
        queryFn: async () => {
            return (await (
                await fetch(`/api/${params.aktorId}/behandling/${params.behandlingId}`, {
                    method: 'GET',
                })
            ).json()) as Behandling
        },
    })
}

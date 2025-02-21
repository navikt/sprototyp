import { nextleton } from 'nextleton'

import { Behandling } from '@typer/manuellbehandlingtypes'

export const behandlingstore = nextleton('behandlinger', () => {
    return {} as Record<string, Behandling>
})

export function hentBehandling(behandlingid: string): Behandling {
    return behandlingstore[behandlingid]
}

export function lagreBehandling(behandling: Behandling): Behandling {
    return (behandlingstore[behandling.id] = behandling)
}

export function hentPaaAktorid(aktorid: string): Behandling[] {
    // loop and filter
    const keys = Object.keys(behandlingstore)

    return keys.map((k) => behandlingstore[k]).filter((f) => f.aktorid == aktorid)
}

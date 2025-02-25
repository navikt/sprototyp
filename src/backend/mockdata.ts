import { nextleton } from 'nextleton'

import { Behandling, Inntekt } from '@typer/manuellbehandlingtypes'

export const behandlingstore = nextleton('behandlinger', () => {
    return {} as Record<string, Behandling>
})

export const inntektstore = nextleton('inntekter', () => {
    return {} as Record<string, Inntekt>
})

export function hentBehandling(behandlingid: string) {
    if (!behandlingstore[behandlingid]) {
        return null
    }
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

export function hentInntektForBehandling(behandlingId: string): Inntekt[] {
    const keys = Object.keys(inntektstore)

    return keys.map((k) => inntektstore[k]).filter((f) => f.behandlingId == behandlingId)
}

export function lagreInntekt(inntekt: Inntekt): Inntekt {
    return (inntektstore[inntekt.id] = inntekt)
}

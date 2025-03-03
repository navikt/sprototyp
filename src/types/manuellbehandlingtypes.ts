export interface Behandling {
    id: string
    fom: string
    tom: string
    aktorid: string
    skjaring: string
    soknadIder: string[]
}

export interface Inntekt extends NyInntekt {
    id: string
    behandlingId: string
}

export interface NyInntekt {
    sykmeldt: boolean
    inntektstype: string
    orgnummer?: string
    orgnavn?: string
}

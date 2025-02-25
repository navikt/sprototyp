export interface Behandling {
    id: string
    fom: string
    tom: string
    aktorid: string
}

export interface Inntekt {
    id: string
    behandlingId: string
    sykmeldt: boolean
    inntektstype: string
    orgnummer?: string
    orgnavn?: string
}

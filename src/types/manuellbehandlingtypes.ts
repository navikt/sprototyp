import { RSArbeidssituasjonType } from '@typer/soknad'

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
    inntektstype: RSArbeidssituasjonType | null
    orgnummer?: string
    orgnavn?: string
}

export interface Dag {
    id: string
    inntektId: string
    dagtype: string
    dato: string
}

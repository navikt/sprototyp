import { v4 } from 'uuid'

import { hentInntektForBehandling, lagreInntekt } from '@/backend/mockdata'
import { Inntekt } from '@typer/manuellbehandlingtypes'

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ aktorid: string; behandlingId: string }>
    },
) {
    const req = await request.json()
    const slug = await params

    const behandling: Inntekt = {
        id: v4(),
        sykmeldt: req.sykmeldt,
        behandlingId: slug.behandlingId,
        inntektstype: req.inntektstype,
        orgnavn: req.orgnavn,
        orgnummer: req.orgnummer,
    }
    lagreInntekt(behandling)
    return Response.json(behandling)
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ aktorid: string; behandlingId: string }> },
) {
    const slug = await params

    return Response.json(hentInntektForBehandling(slug.behandlingId))
}

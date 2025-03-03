import { v4 } from 'uuid'

import { hentPaaAktorid, lagreBehandling } from '@/backend/mockdata'
import { Behandling } from '@typer/manuellbehandlingtypes'

export async function POST(request: Request, { params }: { params: Promise<{ aktorid: string }> }) {
    const req = await request.json()
    const slug = await params

    const behandling: Behandling = {
        id: v4(),
        fom: req.fom,
        tom: req.tom,
        aktorid: slug.aktorid,
        skjaring: req.skjaring,
        soknadIder: req.soknadIder,
    }
    lagreBehandling(behandling)
    return Response.json(behandling)
}

export async function GET(request: Request, { params }: { params: Promise<{ aktorid: string }> }) {
    const slug = await params

    return Response.json(hentPaaAktorid(slug.aktorid))
}

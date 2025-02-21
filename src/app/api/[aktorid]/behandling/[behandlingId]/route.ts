import { hentBehandling } from '@/backend/mockdata'

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ aktorid: string; behandlingId: string }>
    },
) {
    const slug = await params

    return Response.json(hentBehandling(slug.behandlingId))
}

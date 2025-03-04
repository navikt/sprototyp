import { PencilIcon, PersonIcon } from '@navikt/aksel-icons'
import { Timeline } from '@navikt/ds-react'

import { useBehandlinger } from '@hooks/queries/useBehandlinger'
import { useSoknader } from '@hooks/queries/useSoknader'
import { RSSoknad } from '@typer/soknad'

export const Tidslinje = () => {
    const { data: behandlinger } = useBehandlinger()
    const { data: soknader } = useSoknader()
    if (!behandlinger) return null
    if (behandlinger.length == 0 && soknader?.length == 0) return null

    // grupper søknader på orgnummer sekundært arbeidssituasjon
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const soknaderGruppert = soknader?.reduce((acc: Record<string, RSSoknad[]>, soknad) => {
        const key = soknad.arbeidsgiver?.orgnummer || '' + soknad.arbeidssituasjon
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(soknad)
        return acc
    }, {})

    return (
        <div className="w-100">
            <Timeline className="pt-8 pb-16 px-8" direction="right">
                {behandlinger.length > 0 && (
                    <Timeline.Row label="Manuell behandling" icon={<PersonIcon aria-hidden />}>
                        {behandlinger.map((p, i) => (
                            <Timeline.Period
                                key={i}
                                start={new Date(p.fom)}
                                end={new Date(p.tom)}
                                status="info"
                                icon={<PencilIcon aria-hidden />}
                                statusLabel="Manuell behandliung"
                            />
                        ))}
                    </Timeline.Row>
                )}
                {Object.entries(soknaderGruppert || {}).map(([label, soknader]) => (
                    <Timeline.Row key={label} label={label}>
                        {soknader.map((soknad, i) => (
                            <Timeline.Period
                                key={i}
                                start={new Date(soknad.fom!)}
                                end={new Date(soknad.tom!)}
                                status="success"
                                statusLabel="Sendt"
                            />
                        ))}
                    </Timeline.Row>
                ))}
                <Timeline.Zoom>
                    <Timeline.Zoom.Button label="3 mnd" interval="month" count={3} />
                    <Timeline.Zoom.Button label="6 mnd" interval="month" count={7} />
                    <Timeline.Zoom.Button label="9 mnd" interval="month" count={9} />
                </Timeline.Zoom>
            </Timeline>
        </div>
    )
}

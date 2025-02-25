import { PencilIcon, PersonIcon } from '@navikt/aksel-icons'
import { Timeline } from '@navikt/ds-react'

import { useBehandlinger } from '@hooks/queries/useBehandlinger'

export const Tidslinje = () => {
    const { data: behandlinger } = useBehandlinger()
    if (!behandlinger) return null
    if (behandlinger.length == 0) return null

    return (
        <div className="w-100">
            <Timeline className="pt-8 pb-16 px-8" direction="right">
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
                <Timeline.Zoom>
                    <Timeline.Zoom.Button label="3 mnd" interval="month" count={3} />
                    <Timeline.Zoom.Button label="7 mnd" interval="month" count={7} />
                    <Timeline.Zoom.Button label="9 mnd" interval="month" count={9} />
                    <Timeline.Zoom.Button label="1.5 år" interval="year" count={1.5} />
                </Timeline.Zoom>
            </Timeline>
        </div>
    )
}

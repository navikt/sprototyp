import dayjs, { Dayjs } from 'dayjs'

import { DateString } from '@typer/shared'

export const NORSK_DATOFORMAT_MED_KLOKKESLETT = 'DD.MM.YYYY kl. HH.mm'
export const NORSK_DATOFORMAT = 'DD.MM.YYYY'
export const NORSK_DATOFORMAT_LANG = 'D. MMMM YYYY'
export const ISO_DATOFORMAT = 'YYYY-MM-DD'
export const ISO_TIDSPUNKTFORMAT = 'YYYY-MM-DDTHH:mm:ss'

export const getFormattedDateString = (dateString: DateString): string =>
    typeof dateString === 'string' ? dayjs(dateString).format(NORSK_DATOFORMAT) : ''

export const getFormattedDatetimeString = (dateString?: DateString): string =>
    typeof dateString === 'string' ? dayjs(dateString).format(NORSK_DATOFORMAT_MED_KLOKKESLETT) : ''

export const somDato = (dato: string): Dayjs => dayjs(dato ?? null, ISO_DATOFORMAT)

export const somDate = (dato?: string): Date | undefined =>
    dayjs(dato, ISO_DATOFORMAT, true).isValid() ? dayjs(dato, ISO_DATOFORMAT).toDate() : undefined

export const somNorskDato = (dato: string | undefined): string | undefined =>
    dato ? dayjs(somDate(dato)).format(NORSK_DATOFORMAT) : undefined

export const plussEnDag = (dato: DateString): DateString =>
    dayjs(dato, ISO_DATOFORMAT, true).add(1, 'day').format(ISO_DATOFORMAT)

export const minusEnDag = (dato: DateString): DateString =>
    dayjs(dato, ISO_DATOFORMAT, true).subtract(1, 'day').format(ISO_DATOFORMAT)

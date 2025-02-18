import React, { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

import styles from './Venstremeny.module.css'

export const Venstremeny = (): ReactElement => {
    return (
        <section className={styles.Venstremeny}>
            <BodyShort>Venstremeny</BodyShort>
        </section>
    )
}

import React, { ReactElement } from 'react'
import { Search } from '@navikt/ds-react'

import styles from './Personsøk.module.css'

export const Personsøk = (): ReactElement => {
    return (
        <form className={styles.searchForm} autoComplete="off">
            <Search label="Søk" size="small" variant="secondary" placeholder="Søk" />
        </form>
    )
}

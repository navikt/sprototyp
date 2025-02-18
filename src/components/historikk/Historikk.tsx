import { motion } from 'motion/react'
import React, { ReactElement } from 'react'

import { JusterbarSidemeny } from '@/components/justerbarSidemeny/JusterbarSidemeny'

import styles from './Historikk.module.css'

const HistorikkWithContent = (): ReactElement => {
    return (
        <div className={styles['historikk-container']}>
            <JusterbarSidemeny defaultBredde={320} visSidemeny={true} localStorageNavn="historikkBredde">
                <motion.div
                    key="historikk"
                    transition={{
                        type: 'tween',
                        duration: 0.2,
                        ease: 'easeInOut',
                    }}
                    style={{ overflow: 'hidden' }}
                ></motion.div>
            </JusterbarSidemeny>
        </div>
    )
}

export const Historikk = (): ReactElement => {
    return <HistorikkWithContent />
}

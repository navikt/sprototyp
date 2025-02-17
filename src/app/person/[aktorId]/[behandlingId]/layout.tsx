'use client'

import React, { PropsWithChildren, ReactElement } from 'react'

import { SaksbildeMenu } from '@/components/saksbildeMenu/SaksbildeMenu'

export default function Layout({ children }: PropsWithChildren): ReactElement {
    return (
        <div className="flex">
            <div className="w-40" />
            <div>
                <SaksbildeMenu />
                {children}
            </div>
            <div className="w-20" />
        </div>
    )
}

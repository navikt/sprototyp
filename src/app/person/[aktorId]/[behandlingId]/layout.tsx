'use client'

import React, { PropsWithChildren, ReactElement } from 'react'

import { SaksbildeMenu } from '@/components/saksbildeMenu/SaksbildeMenu'

export default function Layout({ children }: PropsWithChildren): ReactElement {
    return (
        <div className="h-full">
            <SaksbildeMenu />
            {children}
        </div>
    )
}

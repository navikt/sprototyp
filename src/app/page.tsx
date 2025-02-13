import { ReactElement } from 'react'

import { Redirect } from '@/components/Redirect'

export default async function Page(): Promise<ReactElement> {
    return <Redirect />
}

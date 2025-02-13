import { ReactElement } from 'react'

import { HelloWorld } from '@/components/Hello'

export default async function Page(): Promise<ReactElement> {
    return <HelloWorld />
}

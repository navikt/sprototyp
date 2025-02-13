import '../../styles/globals.css'
import { ReactElement } from 'react'

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    return (
        <html lang="en">
            <head>
                <title>Sprototyp</title>
                <meta name="robots" content="noindex" />
            </head>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}

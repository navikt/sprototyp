import React, { ReactElement } from 'react'
import { BodyShort, Box, BoxProps, HStack } from '@navikt/ds-react'

import { ErrorBoundary } from '@/components/ErrorBoundary'

import { NavLenke } from './NavLenke'

const SaksbildeMenuContainer = (): ReactElement => {
    return (
        <SaksbildeMenuWrapper>
            <HStack>
                <HStack as="nav" role="tablist">
                    <NavLenke to="inntekter" tittel="Inntekter" />
                    <NavLenke to="vilkarsvurdering" tittel="Vilkårsvurdering" />
                    <NavLenke to="dagoversikt" tittel="Dagoversikt" />
                    <NavLenke to="inngangsvilkar" tittel="Inngangsvilkår" />
                    <NavLenke to="sykepengegrunnlag" tittel="Sykepengegrunnlag" />
                </HStack>
            </HStack>
        </SaksbildeMenuWrapper>
    )
}

const SaksbildeMenuWrapper = (props: BoxProps) => (
    <Box
        paddingInline="4"
        borderWidth="0 0 1 0"
        borderColor="border-subtle"
        height="3rem"
        overflow="hidden"
        {...props}
    />
)

const SaksbildeMenuError = (): ReactElement => (
    <SaksbildeMenuWrapper background="surface-danger-subtle">
        <HStack height="100%" align="center">
            <BodyShort>Det oppstod en feil. Kan ikke vise saksbildemeny.</BodyShort>
        </HStack>
    </SaksbildeMenuWrapper>
)

export const SaksbildeMenu = (): ReactElement => (
    <ErrorBoundary fallback={<SaksbildeMenuError />}>
        <SaksbildeMenuContainer />
    </ErrorBoundary>
)

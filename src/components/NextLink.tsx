import React, { forwardRef } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

// react-router-dom LinkProps types
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: any
  replace?: boolean
  innerRef?: React.Ref<HTMLAnchorElement>
  // next
  prefetch?: boolean
}

const A = styled.a`
  align-self: center;
  padding: 8px 16px;
  border-radius: 16px;
`

const B = styled.a`
  ${({ theme }) => theme.mediaQueries.sm} {
    align-self: center;
  }
`

/**
 * temporary solution for migrating React Router to Next.js Link
 */
export const NextLinkFromReactRouter = forwardRef<any, LinkProps>(
  ({ to, replace, children, prefetch, ...props }, ref) => (
    <NextLink href={to as string} replace={replace} passHref prefetch={prefetch}>
      <A ref={ref} {...props}>
        {children}
      </A>
    </NextLink>
  ),
)

/**
 * temporary solution for migrating React Router to Next.js Link
 */
export const NextLinkFromReactRouterSlim = forwardRef<any, LinkProps>(
  ({ to, replace, children, prefetch, ...props }, ref) => (
    <NextLink href={to as string} replace={replace} passHref prefetch={prefetch}>
      <B ref={ref} {...props}>
        {children}
      </B>
    </NextLink>
  ),
)

import React from 'react'
import Logo from 'components/logo'

const config = {
  logo: <Logo />,
  darkMode: false,
  nextThemes: {
    defaultTheme: 'dark',
  },
  project: {
    link: process.env.NEXT_PUBLIC_GITHUB_LINK,
  },
  chat: {
    link: process.env.NEXT_PUBLIC_DISCORD_LINK,
  },
  feedback: {
    content: 'Submit feedback',
  },
  docsRepositoryBase: 'https://github.com/stakersunion/docs/tree/main/',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Stakers Union',
    }
  },
  head: (
    <>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
      <meta
        property='og:title'
        content='Stakers Union: Documentation'
      />
      <meta
        property='og:description'
        content='A documentation site for the Stakers Union proposal.'
      />
      <meta
        property='og:image'
        content='https://www.stakersunion.com/logo.png'
      />
      <meta
        property='og:url'
        content='https://docs.stakersunion.com/'
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content='Stakers Union: Documentation'
      />
      <meta
        name='twitter:description'
        content='A documentation site for the Stakers Union proposal.'
      />
      <meta
        name='twitter:image'
        content='https://www.stakersunion.com/logo.png'
      />
    </>
  ),
  primaryHue: 0,
  primarySaturation: 0,
  footer: {
    text: 'Stakers Union',
  },
  banner: {
    key: 'graffiti',
    text: (
      <a
        href={'https://github.com/stakersunion/docs/compare/main...graffiti'}
        target={'_blank'}
      >
        📜 This is a proposal for <strong>'graffiti'</strong> | View changes →
      </a>
    ),
    dismissible: false,
  },
}

export default config

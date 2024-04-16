import React from 'react'
import Logo from 'components/logo'

const config = {
  logo: <Logo />,
  project: {
    link: 'https://github.com/stakersunion/docs',
  },
  chat: {
    link: 'https://discord.gg/57EJbMGX',
  },
  docsRepositoryBase: 'https://github.com/stakersunion/docs/tree/main/',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Stakers Union',
    }
  },
  primaryHue: 0,
  primarySaturation: 0,
  footer: {
    text: 'Stakers Union',
  },
}

export default config

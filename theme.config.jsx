import React from 'react'

const config = {
  logo: <span>Stakers Union Docs</span>,
  project: {
    link: 'https://github.com/stakersunion/docs',
  },
  chat: {
    link: 'https://discord.gg/57EJbMGX',
  },
  docsRepositoryBase: 'https://github.com/stakersunion/docs',
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

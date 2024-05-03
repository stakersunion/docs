import { createPublicClient, http } from 'viem'
import { gnosis, mainnet } from 'viem/chains'

const gnosisClient = createPublicClient({
  chain: gnosis,
  transport: http(),
})

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export { gnosisClient, mainnetClient }

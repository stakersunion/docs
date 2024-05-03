import Link from 'next/link'
import { useSplitMetadata } from '@0xsplits/splits-sdk-react'
import { Button } from 'components/ui/button'
import { Badge } from 'components/ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'components/ui/hover-card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table'
import { Loader2, ReceiptText, ExternalLink, Lock } from 'lucide-react'

const Split = () => {
  const { splitMetadata: data, isLoading } = useSplitMetadata(process.env.NEXT_PUBLIC_SPLIT_ADDRESS)

  if (isLoading) {
    return (
      <div className={'flex flex-1 items-center justify-center'}>
        <Loader2 className={'h-4 w-4 animate-spin'} />
      </div>
    )
  }

  const formatEthAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className={'mt-4'}>
      <div className={'my-4 flex flex-row'}>
        <HoverCard>
          <HoverCardTrigger className={'flex flex-row'}>
            <Button variant={'link'}>
              <ReceiptText className={'w-4 h-4 mr-2'} />
              Contract
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <h4 className={'text-sm font-semibold'}>Split Contract Address</h4>
            <p className='text-sm'>{formatEthAddress(data.address)}</p>
            <Link
              href={'#'}
              asChild
            >
              <Badge className={'mt-2'}>
                View <ExternalLink className={'ml-1 w-3 h-3'} />
              </Badge>
            </Link>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger className={'flex flex-row'}>
            <Button variant={'link'}>
              <Lock className={'w-4 h-4 mr-2'} />
              Controller
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <h4 className={'text-sm font-semibold'}>Controller Address</h4>
            <p className='text-sm'>{formatEthAddress(data.controller.address)}</p>
            <Link
              href={'#'}
              asChild
            >
              <Badge className={'mt-2'}>
                View <ExternalLink className={'ml-1 w-3 h-3'} />
              </Badge>
            </Link>
          </HoverCardContent>
        </HoverCard>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Percent Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.recipients.map((recipient) => (
            <TableRow key={recipient.recipient.address}>
              <TableCell>{recipient.recipient.address}</TableCell>
              <TableCell>{recipient.percentAllocation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Split

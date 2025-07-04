import Link from 'next/link'
import { cn } from 'lib/utils'

const SnapshotLink = ({ href, className, children }) => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_SNAPSHOT_LINK}${href}`}
      className={cn(
        'nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]',
        className
      )}
      target={'_blank'}
    >
      {children}
    </Link>
  )
}

export default SnapshotLink

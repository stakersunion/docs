import Image from 'next/image'

const Logo = () => {
  return (
    <div className={'flex flex-row items-center'}>
      <Image
        src={'/logo.svg'}
        alt={'Stakers Union'}
        className={'mr-2'}
        width={20}
        height={20}
      />
      <span className={'text-sm font-bold'}>Stakers Union Docs</span>
    </div>
  )
}

export default Logo

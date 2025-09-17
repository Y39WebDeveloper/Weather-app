import {SearchField} from './'

function Header() {
  return (
    <div className='flex flex-col items-center mb-8 lg:mb-12'>
        <h1 className='text-2 font-bricolage text-center mb-12 lg:mb-16 max-lg:max-w-[483px]'>How’s the<br className='sm:hidden'/> sky looking today?</h1>
        <SearchField/>
    </div>
  )
}

export default Header
'use client';

const Topbar = () => {
  return (
    <div>
       <header className="mx-auto max-w-[1200px]  pt-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center select-none">
          <span className="text-[34px] leading-none font-extrabold text-[#1E5C3B] tracking-tight">Mov</span>
          <span className="-translate-y-[6px] mx-[4px]" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <polygon points="9,2 18,16 0,16" fill="#B7BE86" />
            </svg>
          </span>
          <span className="text-[34px] leading-none font-extrabold text-[#1E5C3B] tracking-tight">ise</span>
        </a>

        {/* Nav */}
        <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-sm">
            <div className="relative w-8 h-8">
              {/* <Image
                src="" // replace with your own user image
                alt="user avatar"
                fill
                className="rounded-full object-cover"
              /> */}
            </div>
            <span className="font-medium text-gray-800">Jessica Samson</span>
          </div>
      </header>
    </div>
  )
}

export default Topbar

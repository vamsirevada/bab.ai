import React, { useState, useEffect, useRef, useMemo } from 'react'

const StatusBar = () => (
  <div className="w-full h-8 sm:h-10 md:h-11 bg-white flex items-center justify-between px-3 sm:px-4 md:px-5 relative">
    <div className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-[#171717] tracking-[-0.3px]">
      9:41
    </div>
    <div className="flex items-center gap-1">
      {/* Signal bars */}
      <svg
        width="15"
        height="9"
        viewBox="0 0 18 12"
        fill="none"
        className="sm:w-4 sm:h-3 md:w-[17px] md:h-[11px]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.66666 7.33329H2.66666C3.21894 7.33329 3.66666 7.78101 3.66666 8.33329V10.3333C3.66666 10.8856 3.21894 11.3333 2.66666 11.3333H1.66666C1.11437 11.3333 0.666656 10.8856 0.666656 10.3333V8.33329C0.666656 7.78101 1.11437 7.33329 1.66666 7.33329ZM6.33332 5.33329H7.33332C7.88561 5.33329 8.33332 5.78101 8.33332 6.33329V10.3333C8.33332 10.8856 7.88561 11.3333 7.33332 11.3333H6.33332C5.78104 11.3333 5.33332 10.8856 5.33332 10.3333V6.33329C5.33332 5.78101 5.78104 5.33329 6.33332 5.33329ZM11 2.99996H12C12.5523 2.99996 13 3.44767 13 3.99996V10.3333C13 10.8856 12.5523 11.3333 12 11.3333H11C10.4477 11.3333 9.99999 10.8856 9.99999 10.3333V3.99996C9.99999 3.44767 10.4477 2.99996 11 2.99996ZM15.6667 0.666626H16.6667C17.2189 0.666626 17.6667 1.11434 17.6667 1.66663V10.3333C17.6667 10.8856 17.2189 11.3333 16.6667 11.3333H15.6667C15.1144 11.3333 14.6667 10.8856 14.6667 10.3333V1.66663C14.6667 1.11434 15.1144 0.666626 15.6667 0.666626Z"
          fill="#060606"
        />
      </svg>
      {/* WiFi */}
      <svg
        width="13"
        height="9"
        viewBox="0 0 16 12"
        fill="none"
        className="sm:w-4 sm:h-3 md:w-[15px] md:h-[11px]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.33033 2.60802C10.5462 2.60811 12.6774 3.45955 14.2833 4.98635C14.4043 5.10422 14.5976 5.10274 14.7167 4.98302L15.8727 3.81635C15.933 3.75563 15.9666 3.67338 15.9661 3.5878C15.9656 3.50221 15.931 3.42036 15.87 3.36035C11.6549 -0.679198 5.0051 -0.679198 0.789998 3.36035C0.728939 3.42032 0.694296 3.50215 0.693733 3.58773C0.69317 3.67331 0.726734 3.75558 0.786998 3.81635L1.94333 4.98302C2.06236 5.10292 2.25581 5.10441 2.37666 4.98635C3.98282 3.45945 6.11422 2.60801 8.33033 2.60802ZM8.33033 6.40368C9.54782 6.40361 10.7219 6.85614 11.6243 7.67335C11.7464 7.78933 11.9387 7.78682 12.0577 7.66768L13.2123 6.50102C13.2731 6.43982 13.3069 6.3568 13.306 6.27054C13.3051 6.18427 13.2697 6.10196 13.2077 6.04202C10.4595 3.48563 6.20353 3.48563 3.45533 6.04202C3.39325 6.10196 3.35784 6.18432 3.35702 6.27061C3.35621 6.3569 3.39006 6.43991 3.451 6.50102L4.60533 7.66768C4.72432 7.78682 4.9166 7.78933 5.03866 7.67335C5.94054 6.85668 7.11365 6.40419 8.33033 6.40368ZM10.5493 9.18802C10.6111 9.12741 10.6451 9.04401 10.6433 8.9575C10.6416 8.87099 10.6042 8.78905 10.54 8.73102C9.26443 7.65213 7.39624 7.65213 6.12067 8.73102C6.05644 8.789 6.019 8.87092 6.01717 8.95743C6.01534 9.04394 6.04929 9.12737 6.111 9.18802L8.10866 11.2037C8.16722 11.2629 8.24704 11.2963 8.33033 11.2963C8.41362 11.2963 8.49345 11.2629 8.552 11.2037L10.5493 9.18802Z"
          fill="#060606"
        />
      </svg>
      {/* Battery */}
      <div className="flex items-center relative">
        <svg
          width="18"
          height="9"
          viewBox="0 0 22 11"
          fill="none"
          className="sm:w-5 sm:h-2.5 md:w-[22px] md:h-[11px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 0C1.11929 0 0 1.11929 0 2.5V8C0 9.38071 1.11929 10.5 2.5 10.5H18.4687H19.5C20.8807 10.5 22 9.38071 22 8V2.5C22 1.11929 20.8807 0 19.5 0H2.5ZM3 1C1.89543 1 1 1.89543 1 3V7.5C1 8.60457 1.89543 9.5 3 9.5H17.4687H19C20.1046 9.5 21 8.60457 21 7.5V3C21 1.89543 20.1046 1 19 1H3Z"
            fill="#ABABAB"
          />
        </svg>
        <div className="w-[14px] sm:w-[16px] md:w-[18px] h-[5px] sm:h-[6px] md:h-[7px] bg-black rounded-sm absolute left-[2px] top-1/2 transform -translate-y-1/2"></div>
        <div className="w-[1.5px] sm:w-[2px] h-[3px] sm:h-[4px] bg-black/50 absolute right-[-1px] top-1/2 transform -translate-y-1/2 rounded-r-sm"></div>
      </div>
    </div>
  </div>
)

const ContactHeader = () => (
  <div className="w-full h-16 sm:h-18 md:h-22 bg-[#F6F6F6] border-b border-[#A6A6AA] flex items-center px-3 sm:px-4 py-2 sm:py-3">
    {/* Back button */}
    <svg
      width="10"
      height="18"
      viewBox="0 0 12 21"
      fill="none"
      className="mr-3 sm:mr-4 sm:w-3 sm:h-5 md:w-[12px] md:h-[21px]"
    >
      <path
        d="M3.60206 10.5L11.4062 2.55085C11.9866 1.9597 11.9778 1.00999 11.3867 0.429623C10.7955 -0.150747 9.84583 -0.142006 9.26546 0.449147L0.429623 9.44915C-0.143208 10.0326 -0.143208 10.9674 0.429623 11.5509L9.26546 20.5509C9.84583 21.142 10.7955 21.1507 11.3867 20.5704C11.9778 19.99 11.9866 19.0403 11.4062 18.4491L3.60206 10.5Z"
        fill="#007AFF"
      />
    </svg>

    {/* Profile picture */}
    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-brand-dark mr-3 sm:mr-4 flex items-center justify-center text-brand-light text-xs sm:text-sm font-bold border-2 border-gray-dark shadow-lg">
      B
    </div>

    {/* Contact info */}
    <div className="flex-1">
      <div className="text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-black tracking-[-0.3px] flex items-center gap-1">
        bab.ai
        {/* Blue verification tick */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]"
        >
          <circle cx="12" cy="12" r="10" fill="#1DA1F2" />
          <path
            d="M9 12l2 2 4-4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-[11px] sm:text-[12px] text-[#8E8E93] leading-4 tracking-[-0.01px] text-left">
        Online
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      {/* Video call */}
      <button className="p-1 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
        <svg
          width="20"
          height="13"
          viewBox="0 0 25 16"
          fill="none"
          className="sm:w-6 sm:h-4 md:w-[25px] md:h-[16px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 4.5C17 2.29086 15.2091 0.5 13 0.5H4C1.79086 0.5 0 2.29086 0 4.5V12C0 14.2091 1.79086 16 4 16H13C15.2091 16 17 14.2091 17 12V4.5ZM4 1.7H13C14.5464 1.7 15.8 2.9536 15.8 4.5V12C15.8 13.5464 14.5464 14.8 13 14.8H4C2.4536 14.8 1.2 13.5464 1.2 12V4.5C1.2 2.9536 2.4536 1.7 4 1.7ZM24.2926 2.42115C24.4271 2.59596 24.5 2.81032 24.5 3.03086V13.2104C24.5 13.7627 24.0523 14.2104 23.5 14.2104C23.3149 14.2104 23.1335 14.1591 22.9759 14.0621L18.9518 11.5857C18.3603 11.2217 18 10.5769 18 9.88241V6.9848C18 6.36386 18.2884 5.77815 18.7806 5.39956L22.8903 2.23824C23.328 1.9015 23.9559 1.9834 24.2926 2.42115ZM19.5122 6.3507L23.3 3.43704V12.8525L19.5807 10.5637C19.3441 10.4181 19.2 10.1602 19.2 9.88241V6.9848C19.2 6.73643 19.3154 6.50214 19.5122 6.3507Z"
            fill="#007AFF"
          />
        </svg>
      </button>

      {/* Voice call */}
      <button className="p-1 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 22 22"
          fill="none"
          className="sm:w-5 sm:h-5 md:w-[21px] md:h-[21px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.67955 4.9567L6.87343 1.90414C6.06909 0.544685 4.31498 0.0946839 2.95553 0.899035C2.71245 1.04286 2.49201 1.2219 2.30139 1.43033C0.944762 2.9137 0.337482 4.32605 0.53717 5.66529C0.946397 8.40983 2.87595 11.5447 6.30409 15.1037L6.60181 15.3978L6.89633 15.6959L6.90214 15.6916C10.4553 19.124 13.5902 21.0536 16.3347 21.4628C17.674 21.6625 19.0863 21.0552 20.5697 19.6986C20.7781 19.508 20.9571 19.2876 21.101 19.0445C21.9053 17.685 21.4553 15.9309 20.0959 15.1266L17.0433 13.3205L16.8915 13.2378C16.1728 12.8796 15.3176 12.9036 14.6167 13.3109L13.6655 13.8635L13.555 13.9209C13.0684 14.1443 12.488 14.0448 12.1032 13.6601L8.33993 9.89675L8.25623 9.80463C7.91561 9.3915 7.86311 8.80493 8.13646 8.33449L8.68913 7.38334C9.12549 6.63237 9.12182 5.70419 8.67955 4.9567ZM19.7598 18.8131C18.5048 19.9609 17.4288 20.4127 16.5117 20.2759C14.1546 19.9245 11.3397 18.2373 8.08615 15.1632L7.52591 14.6257L7.14745 14.25C3.88274 10.8601 2.0878 7.92787 1.72405 5.48832C1.5873 4.57117 2.03915 3.49517 3.1869 2.24018C3.29755 2.1192 3.42549 2.01528 3.56659 1.9318C4.31182 1.49087 5.26138 1.69935 5.75788 2.3886L5.84067 2.5152L7.64678 5.56776C7.8678 5.94131 7.86964 6.40517 7.65157 6.78046L7.0989 7.73162C6.57438 8.63431 6.66918 9.7661 7.33036 10.568L7.45178 10.7037L11.2547 14.5086C11.993 15.2468 13.1113 15.4451 14.0558 15.0114L14.218 14.9288L15.2195 14.3484C15.5686 14.1456 15.9961 14.1323 16.3562 14.3118L16.4697 14.3745L19.4848 16.1593C20.2739 16.6262 20.5351 17.6443 20.0682 18.4334C19.9847 18.5745 19.8808 18.7025 19.7598 18.8131Z"
            fill="#007AFF"
          />
        </svg>
      </button>
    </div>
  </div>
)

const DateSeparator = ({ date }) => (
  <div className="flex justify-center py-2">
    <div className="bg-[#DDDDE9] px-4 py-1 rounded-lg shadow-sm">
      <span className="text-[12px] font-semibold text-[#3C3C43]">{date}</span>
    </div>
  </div>
)

const ReadReceipt = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.501 0.108955L14 0.59573L8.60042 8L6.41166 5.83835L7.33857 4.56645L8.60042 5.30239L13.501 0.108955ZM9.11925 0L9.61822 0.486775L4.21865 7.89105L0.5 4.23358L1.33033 3.42354L4.21865 5.19343L9.11925 0Z"
      fill="#3497F9"
    />
  </svg>
)

const TypingIndicator = () => (
  <div className="flex justify-start pl-2 mb-1">
    <div className="bg-[#FAFAFA] rounded-2xl rounded-bl-[6px] px-4 py-3 max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px]">
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 ml-2">typing...</span>
      </div>
    </div>
  </div>
)

const MessageContextMenu = ({ isVisible, onClose, position, isSent }) => {
  if (!isVisible) return null

  const menuItems = [
    { icon: '↩️', text: 'Reply', action: () => console.log('Reply') },
    { icon: '⭐', text: 'Star', action: () => console.log('Star') },
    { icon: '📋', text: 'Copy', action: () => console.log('Copy') },
    { icon: '➡️', text: 'Forward', action: () => console.log('Forward') },
    ...(isSent
      ? [{ icon: 'ℹ️', text: 'Info', action: () => console.log('Info') }]
      : []),
    {
      icon: '🗑️',
      text: 'Delete',
      action: () => console.log('Delete'),
      danger: true,
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Context Menu */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[150px]"
        style={{
          left: Math.min(position.x, window.innerWidth - 160),
          top: Math.min(
            position.y,
            window.innerHeight - (menuItems.length * 44 + 16)
          ),
        }}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
              item.danger ? 'text-red-600' : 'text-gray-900'
            }`}
            onClick={() => {
              item.action()
              onClose()
            }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[16px]">{item.text}</span>
          </button>
        ))}
      </div>
    </>
  )
}

const FileAttachment = ({ fileName, fileSize, type }) => (
  <div className="bg-[#767680]/12 rounded-lg p-1 w-full max-w-[151px]">
    {/* File icon */}
    <div className="bg-white border border-[#D1D1D6] rounded-sm p-2 mb-2 relative w-full h-[41px] flex items-center">
      {/* Document icon with lines */}
      <div className="w-6 h-6 mr-3 relative">
        <svg
          width="24"
          height="26"
          viewBox="0 0 30 35"
          fill="none"
          className="absolute"
        >
          <path
            d="M9.5 7.2002H23.4795C23.8237 7.2002 24.1538 7.33699 24.3975 7.58008L29.418 12.5869C29.6625 12.8308 29.7998 13.1625 29.7998 13.5078V32.5C29.7998 33.218 29.218 33.7998 28.5 33.7998H9.5C8.78203 33.7998 8.2002 33.218 8.2002 32.5V8.5C8.2002 7.78203 8.78203 7.2002 9.5 7.2002Z"
            fill="white"
            stroke="#D1D1D6"
            strokeWidth="0.4"
          />
          <path d="M16.6 16.1V16.9H23.9V16.1H16.6Z" fill="#007AFF" />
          <path d="M14.1 25.1V25.9H21.4V25.1H14.1Z" fill="#007AFF" />
          <path d="M14.1 19.1V19.9H23.9V19.1H14.1Z" fill="#007AFF" />
          <path d="M14.1 22.1V22.9H23.9V22.1H14.1Z" fill="#007AFF" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="text-[16px] text-black/70 tracking-[-0.3px] truncate font-normal">
          {fileName}
        </div>
      </div>
    </div>

    {/* File info */}
    <div className="flex items-center text-[11px] text-black/40 tracking-[0.1px] gap-1 px-1">
      <span>{fileSize}</span>
      <div className="w-[3px] h-[3px] bg-black/20 rounded-full"></div>
      <span>{type}</span>
    </div>
  </div>
)

const QuickReplyButtons = ({ buttons }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {buttons.map((button, index) => (
      <button
        key={index}
        className="px-4 py-2 bg-white/20 backdrop-blur-sm text-[#007AFF] rounded-lg text-[14px] font-medium hover:bg-white/30 active:bg-white/40 transition-all duration-200 border border-white/30 min-w-[80px]"
        onClick={button.action}
      >
        {button.text}
      </button>
    ))}
  </div>
)

const WhatsAppActionButtons = ({ buttons }) => (
  <div className="flex gap-2 mt-3 mb-1">
    {buttons.map((button, index) => (
      <button
        key={index}
        className={`flex-1 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 ${
          button.primary
            ? 'bg-white/15 backdrop-blur-sm text-[#25D366] border border-white/20 hover:bg-white/25 active:bg-white/35'
            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-white/20 active:bg-white/30'
        }`}
        onClick={button.action}
      >
        {button.text}
      </button>
    ))}
  </div>
)

const SupplierRecommendation = ({ suppliers }) => (
  <div className="mt-2">
    {/* Header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <span className="text-[14px] font-semibold text-gray-800">
        Recommended Suppliers
      </span>
    </div>

    {/* Suppliers List */}
    <div className="space-y-3">
      {suppliers.map((supplier, index) => (
        <div key={index} className="flex items-center gap-3 py-2">
          {/* Avatar */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
              supplier.color || 'bg-green-500'
            }`}
          >
            {supplier.initial}
          </div>

          {/* Supplier Info */}
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-gray-900 text-left">
              {supplier.name}
            </div>
            <div className="text-[12px] text-blue-500 text-left">
              {supplier.description}
            </div>
          </div>

          {/* Rating and Time */}
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill={i < supplier.rating ? '#FFB800' : '#E5E5E5'}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Get Quotes Button */}
    <button className="w-full mt-4 bg-[#25D366] text-white py-3 rounded-lg text-[15px] font-medium hover:bg-[#1fa050] transition-colors">
      Get Quotes
    </button>
  </div>
)

const CreditApproval = ({ amount, action }) => (
  <div className="mt-2 text-center">
    <div className="text-[15px] text-gray-700 mb-3">
      You&apos;re instantly approved up to{' '}
      <span className="font-semibold">₹{amount}</span>. Pay later?
    </div>
    <button
      className="bg-[#25D366] text-white px-6 py-2 rounded-lg text-[14px] font-medium hover:bg-[#1fa050] transition-colors"
      onClick={action}
    >
      Want to Avail Credit?
    </button>
  </div>
)

const Message = ({
  text,
  time,
  isSent,
  hasReadReceipt,
  file,
  linkPreview,
  quickReply,
  location,
  poll,
  contact,
  actionButtons,
  suppliers,
  creditApproval,
  isReply,
  onContextMenu,
}) => {
  const handleLongPress = (e) => {
    e.preventDefault()
    if (onContextMenu) {
      onContextMenu(e, isSent)
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    if (onContextMenu) {
      onContextMenu(e, isSent)
    }
  }

  return (
    <div
      className={`flex mb-1 ${
        isSent ? 'justify-end pr-2' : 'justify-start pl-2'
      } animate-fade-in-up`}
    >
      <div
        className={`relative max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] ${
          isSent ? 'bg-[#DCF7C5]' : 'bg-[#FAFAFA]'
        } rounded-2xl ${file ? 'p-1' : 'px-2 py-1'} ${
          isSent ? 'rounded-br-[6px]' : 'rounded-bl-[6px]'
        } cursor-pointer hover:opacity-90 transition-all duration-300 select-none transform`}
        onContextMenu={handleContextMenu}
        onMouseDown={handleLongPress}
        onTouchStart={(e) => {
          const timer = setTimeout(() => {
            if (onContextMenu) {
              onContextMenu(e, isSent)
            }
          }, 500)

          const cleanup = () => {
            clearTimeout(timer)
            document.removeEventListener('mouseup', cleanup)
            document.removeEventListener('touchend', cleanup)
          }

          document.addEventListener('mouseup', cleanup)
          document.addEventListener('touchend', cleanup)
        }}
      >
        <div className="px-2 py-1">
          {file && (
            <FileAttachment
              fileName={file.name}
              fileSize={file.size}
              type={file.type}
            />
          )}

          {isReply && (
            <div className="border-l-4 border-[#25D366] pl-3 mb-2 bg-white/20 rounded-r-lg py-2">
              <div className="text-[13px] text-[#25D366] font-medium mb-1">
                Replying to bab.ai
              </div>
              <div className="text-[14px] text-gray-600 truncate">
                Recommended Suppliers
              </div>
            </div>
          )}

          {text && (
            <div className="text-[16px] text-black tracking-[-0.3px] py-1 text-left">
              {text}
            </div>
          )}

          {suppliers && <SupplierRecommendation suppliers={suppliers} />}

          {creditApproval && (
            <CreditApproval
              amount={creditApproval.amount}
              action={creditApproval.action}
            />
          )}

          {quickReply && <QuickReplyButtons buttons={quickReply} />}

          {actionButtons && <WhatsAppActionButtons buttons={actionButtons} />}

          <div
            className={`flex items-center gap-1 ${
              isSent ? 'justify-end' : 'justify-end'
            } mt-1`}
          >
            <span className="text-[11px] text-black/25 tracking-[0.5px]">
              {time}
            </span>
            {isSent && hasReadReceipt && (
              <div className="ml-1">
                <ReadReceipt />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ChatInput = () => (
  <div className="w-full h-20 bg-[#F6F6F6] border-t border-[#A6A6AA] flex items-center px-4 py-2">
    {/* Add button */}
    <button className="p-1 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors mr-3">
      <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
        <path
          d="M10.0996 0.706184L10.2 0.699951C10.6078 0.699951 10.9444 1.00514 10.9938 1.3996L11 1.49995V9.19995H18.7C19.1078 9.19995 19.4444 9.50514 19.4938 9.8996L19.5 9.99995C19.5 10.4078 19.1948 10.7444 18.8003 10.7937L18.7 10.8H11V18.5C11 18.9078 10.6948 19.2444 10.3003 19.2937L10.2 19.3C9.79215 19.3 9.45559 18.9948 9.40623 18.6003L9.39999 18.5V10.8H1.69999C1.29215 10.8 0.955592 10.4948 0.906227 10.1003L0.899994 9.99995C0.899994 9.59211 1.20518 9.25555 1.59964 9.20618L1.69999 9.19995H9.39999V1.49995C9.39999 1.09211 9.70518 0.75555 10.0996 0.706184L10.2 0.699951L10.0996 0.706184Z"
          fill="#007AFF"
        />
      </svg>
    </button>

    {/* Input field */}
    <div className="flex-1 relative">
      <div className="w-full h-8 bg-white border border-[#8E8E93]/45 rounded-2xl flex items-center px-3">
        <div className="flex-1"></div>
        {/* Sticker button */}
        <button className="p-1 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors ml-4 sm:ml-3 md:ml-2">
          <svg width="18" height="18" viewBox="0 0 19 19" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5 0.5C15.8137 0.5 18.5 3.18629 18.5 6.5C18.5 7.51226 18.4265 8.59716 18.2794 9.7547C17.8458 11.9033 17.0666 13.506 15.5006 15.072C14.0324 16.5401 12.4171 17.4497 10.1857 18.1737C8.95927 18.5404 6.5 18.5 6.5 18.5C3.18629 18.5 0.5 15.8137 0.5 12.5V6.5C0.5 3.18629 3.18629 0.5 6.5 0.5H12.5ZM12.5 1.7H6.5C3.84903 1.7 1.7 3.84903 1.7 6.5V12.5C1.7 15.151 3.84903 17.3 6.5 17.3L8.36029 17.3018C9.1201 17.2593 9.5 16.9041 9.5 16.2362L9.5 14.5925C9.5 11.8421 11.7214 9.60811 14.4717 9.59256L15.1304 9.58372L15.5425 9.57083C15.9195 9.55526 16.1913 9.53165 16.3578 9.5C16.95 9.38741 17.2646 8.93277 17.3016 8.13607L17.3 6.5C17.3 3.84903 15.151 1.7 12.5 1.7ZM16.5819 10.6789C16.7137 10.6538 16.8388 10.6203 16.9658 10.5762C16.4898 11.9428 15.7208 13.1547 14.652 14.2235C13.5572 15.3183 12.2211 16.1888 10.6353 16.8354C10.6778 16.6498 10.7 16.4499 10.7 16.2362L10.7 14.5925C10.7 12.5022 12.3883 10.8044 14.4785 10.7925L14.9668 10.7873C15.7316 10.7745 16.2544 10.7411 16.5819 10.6789Z"
              fill="#007AFF"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Camera button */}
    <svg
      width="22"
      height="19"
      viewBox="0 0 23 20"
      fill="none"
      className="mx-3"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2926 1.54944C14.8171 1.11529 14.1996 0.875 13.5593 0.875H10.0526C9.41249 0.875 8.7951 1.11517 8.31965 1.54911L7.63139 2.1773C7.16363 2.60423 6.55622 2.84052 5.92647 2.84052C3.06758 2.84052 0.75 5.18716 0.75 8.0819V14.6336C0.75 17.5284 3.06758 19.875 5.92647 19.875H17.5735C20.4324 19.875 22.75 17.5284 22.75 14.6336V8.0819C22.75 5.18716 20.4324 2.84052 17.5735 2.84052L17.3884 2.83282C16.8974 2.79189 16.4312 2.58904 16.0628 2.25267L15.2926 1.54944ZM10.0526 2.075H13.5593C13.8997 2.075 14.2287 2.20304 14.4835 2.43562L15.2537 3.13885C15.8168 3.65302 16.5321 3.9656 17.2887 4.02867L17.5237 4.03948C19.7663 4.04052 21.55 5.84658 21.55 8.0819V14.6336C21.55 16.8689 19.7663 18.675 17.5735 18.675H5.92647C3.7337 18.675 1.95 16.8689 1.95 14.6336V8.0819C1.95 5.91432 3.62723 4.15037 5.72829 4.04545L6.15806 4.0333C7.00389 3.98049 7.80922 3.63968 8.44035 3.06363L9.12862 2.43544C9.38332 2.20298 9.7123 2.075 10.0526 2.075ZM11.75 5.88C14.5114 5.88 16.75 8.11858 16.75 10.88C16.75 13.6414 14.5114 15.88 11.75 15.88C8.98858 15.88 6.75 13.6414 6.75 10.88C6.75 8.11858 8.98858 5.88 11.75 5.88ZM7.95 10.88C7.95 8.78132 9.65132 7.08 11.75 7.08C13.8487 7.08 15.55 8.78132 15.55 10.88C15.55 12.9787 13.8487 14.68 11.75 14.68C9.65132 14.68 7.95 12.9787 7.95 10.88Z"
        fill="#007AFF"
      />
    </svg>

    {/* Microphone button */}
    <svg width="16" height="23" viewBox="0 0 16 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99999 0C10.4853 0 12.5 2.01472 12.5 4.5V11.5C12.5 13.9853 10.4853 16 7.99999 16C5.51471 16 3.49999 13.9853 3.49999 11.5V4.5C3.49999 2.01472 5.51471 0 7.99999 0ZM0.749994 10.3284C1.04823 10.3284 1.29564 10.546 1.34214 10.831L1.34999 10.9284V11.0603C1.34999 14.8004 4.32949 17.8284 7.99999 17.8284C11.5924 17.8284 14.5229 14.9278 14.646 11.2981L14.65 11.0603V10.9388C14.65 10.6074 14.9186 10.3388 15.25 10.3388C15.5482 10.3388 15.7956 10.5564 15.8421 10.8415L15.85 10.9388L15.8463 11.3084C15.7233 15.3891 12.5766 18.7005 8.59986 19.0055L8.59999 22.5C8.59999 22.8314 8.33136 23.1 7.99999 23.1C7.70176 23.1 7.45435 22.8824 7.40785 22.5973L7.39999 22.5L7.40046 19.0055C3.42608 18.7009 0.280692 15.3934 0.153964 11.3161L0.149994 10.9284C0.149994 10.597 0.418623 10.3284 0.749994 10.3284ZM4.69999 4.5C4.69999 2.67746 6.17745 1.2 7.99999 1.2C9.82253 1.2 11.3 2.67746 11.3 4.5V11.5C11.3 13.3225 9.82253 14.8 7.99999 14.8C6.17745 14.8 4.69999 13.3225 4.69999 11.5V4.5Z"
        fill="#007AFF"
      />
    </svg>
  </div>
)

const HomeIndicator = () => (
  <div className="w-full h-[34px] bg-white flex justify-center items-end pb-2">
    <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
  </div>
)

const PhoneCase = React.forwardRef(({ children }, ref) => (
  <div className="flex items-center justify-center min-h-screen p-2 sm:p-4 md:p-8 overflow-hidden">
    {/* Phone Case Frame */}
    <div
      className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[450px] mx-auto"
      ref={ref}
    >
      {/* Outer case with gradient */}
      <div className="relative p-1 sm:p-1.5 md:p-2 lg:p-2.5 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] lg:rounded-[35px] bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        {/* Inner case shadow */}
        <div className="p-0.5 sm:p-1 md:p-1.5 lg:p-2 rounded-[15px] sm:rounded-[20px] md:rounded-[25px] lg:rounded-[30px] bg-gradient-to-br from-gray-700 to-gray-800">
          {/* Screen area */}
          <div className="relative rounded-[12px] sm:rounded-[15px] md:rounded-[20px] lg:rounded-[25px] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-[15px] sm:h-[20px] md:h-[25px] lg:h-[28px] bg-black rounded-b-xl md:rounded-b-2xl flex items-center justify-center">
              <div className="w-[30px] sm:w-[40px] md:w-[50px] lg:w-[60px] h-[2px] sm:h-[3px] md:h-[4px] lg:h-[5px] bg-gray-800 rounded-full"></div>
            </div>

            {/* Screen content */}
            <div className="relative overflow-hidden">{children}</div>
          </div>
        </div>

        {/* Side buttons - scaled for responsive */}
        <div className="absolute left-[-2px] sm:left-[-3px] md:left-[-4px] lg:left-[-5px] top-[80px] sm:top-[100px] md:top-[120px] lg:top-[140px] w-[2px] sm:w-[3px] md:w-[4px] lg:w-[5px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] bg-gray-900 rounded-l-md"></div>
        <div className="absolute left-[-2px] sm:left-[-3px] md:left-[-4px] lg:left-[-5px] top-[140px] sm:top-[170px] md:top-[200px] lg:top-[230px] w-[2px] sm:w-[3px] md:w-[4px] lg:w-[5px] h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] bg-gray-900 rounded-l-md"></div>
        <div className="absolute left-[-2px] sm:left-[-3px] md:left-[-4px] lg:left-[-5px] top-[170px] sm:top-[205px] md:top-[240px] lg:top-[275px] w-[2px] sm:w-[3px] md:w-[4px] lg:w-[5px] h-[20px] sm:h-[25px] md:h-[30px] lg:h-[35px] bg-gray-900 rounded-l-md"></div>
        <div className="absolute right-[-2px] sm:right-[-3px] md:right-[-4px] lg:right-[-5px] top-[120px] sm:top-[150px] md:top-[180px] lg:top-[210px] w-[2px] sm:w-[3px] md:w-[4px] lg:w-[5px] h-[50px] sm:h-[65px] md:h-[80px] lg:h-[90px] bg-gray-900 rounded-r-md"></div>
      </div>
    </div>
  </div>
))
PhoneCase.displayName = 'PhoneCase'

export default function Index() {
  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    isSent: false,
  })

  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const phoneRef = useRef(null)

  const messages = useMemo(
    () => [
      {
        text: 'Hi, can you please order 100 cement bags?',
        time: '17:47',
        isSent: true,
        hasReadReceipt: true,
      },
      {
        text: 'For ASMR Construction Site',
        time: '17:47',
        isSent: true,
        hasReadReceipt: true,
      },
      {
        file: { name: 'IMG_0475', size: '2.4 MB', type: 'png' },
        time: '10:15',
        isSent: true,
        hasReadReceipt: true,
      },
      {
        text: 'Thank you for your request. I will be happy to assist you with this order.',
        time: '10:15',
        isSent: false,
      },
      {
        text: 'Let me provide you with some vendor recommendations.',
        time: '9:46 AM',
        isSent: false,
      },
      {
        time: '6:59 AM',
        isSent: false,
        suppliers: [
          {
            initial: 'B',
            name: 'BuildFuture',
            description: 'Supplier known for quick deliveries',
            rating: 4,
            color: 'bg-green-500',
          },
          {
            initial: 'S',
            name: 'Sino Traders',
            description: 'Offering structural quantities',
            rating: 3,
            color: 'bg-green-500',
          },
          {
            initial: 'F',
            name: 'Flower Construction',
            description: 'Supplier known for excellent quality',
            rating: 5,
            color: 'bg-green-500',
          },
        ],
      },
      {
        text: '✅ Get Quotes',
        time: '9:47 AM',
        isSent: true,
        hasReadReceipt: true,
        isReply: true,
      },
      {
        time: '9:47 AM',
        isSent: false,
        creditApproval: {
          amount: '85,000',
          action: () => console.log('Credit availed'),
        },
      },
    ],
    []
  )

  const handleMessageContextMenu = (e, isSent) => {
    e.preventDefault()
    setContextMenu({
      isVisible: true,
      position: { x: e.clientX, y: e.clientY },
      isSent,
    })
  }

  const closeContextMenu = () => {
    setContextMenu((prev) => ({ ...prev, isVisible: false }))
  }

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  // Intersection Observer to start animation when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedAnimation) {
            setHasStartedAnimation(true)
          }
        })
      },
      {
        threshold: 0.3, // Start animation when 30% of the component is visible
        rootMargin: '0px 0px -100px 0px', // Start slightly before it's fully in view
      }
    )

    const phoneNode = phoneRef.current
    if (phoneNode) {
      observer.observe(phoneNode)
    }

    return () => {
      if (phoneNode) {
        observer.unobserve(phoneNode)
      }
    }
  }, [hasStartedAnimation])

  // Animate messages appearing one by one
  useEffect(() => {
    if (!hasStartedAnimation) return // Don't start animation until component is in view

    if (visibleMessages < messages.length) {
      const timer = setTimeout(
        () => {
          // Show typing indicator for incoming messages (not sent by user)
          const nextMessage = messages[visibleMessages]
          if (!nextMessage.isSent && visibleMessages > 0) {
            setIsTyping(true)
            setTimeout(() => {
              setIsTyping(false)
              setVisibleMessages((prev) => prev + 1)
            }, 1000 + Math.random() * 1500) // Random typing delay 1-2.5s
          } else {
            setVisibleMessages((prev) => prev + 1)
          }
        },
        visibleMessages === 0 ? 500 : 800 + Math.random() * 1200
      ) // Random delay between messages

      return () => clearTimeout(timer)
    }
  }, [visibleMessages, messages.length, hasStartedAnimation, messages])

  // Auto-scroll when new messages appear
  useEffect(() => {
    scrollToBottom()
  }, [visibleMessages, isTyping])

  return (
    <PhoneCase ref={phoneRef}>
      <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[450px] mx-auto h-[650px] sm:h-[750px] md:h-[850px] lg:h-[900px] bg-[#EFEFF4] flex flex-col relative overflow-hidden">
        <StatusBar />
        <ContactHeader />

        {/* Messages container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-2 py-2 bg-[#EFEFF4] scrollbar-hide"
          style={{
            backgroundImage: `url("https://api.builder.io/api/v1/image/assets/TEMP/782173c234ab608b78019f4d26ec1cb0e20c1441?width=750")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="space-y-1">
            <DateSeparator date="Fri, Jul 26" />

            {messages.slice(0, visibleMessages).map((message, index) => (
              <Message
                key={index}
                text={message.text}
                time={message.time}
                isSent={message.isSent}
                hasReadReceipt={message.hasReadReceipt}
                file={message.file}
                linkPreview={message.linkPreview}
                quickReply={message.quickReply}
                location={message.location}
                poll={message.poll}
                contact={message.contact}
                actionButtons={message.actionButtons}
                suppliers={message.suppliers}
                creditApproval={message.creditApproval}
                isReply={message.isReply}
                onContextMenu={handleMessageContextMenu}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}

            {/* Invisible div for scrolling */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput />
        <HomeIndicator />

        {/* Context Menu */}
        <MessageContextMenu
          isVisible={contextMenu.isVisible}
          onClose={closeContextMenu}
          position={contextMenu.position}
          isSent={contextMenu.isSent}
        />
      </div>
    </PhoneCase>
  )
}

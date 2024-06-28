;(function () {
  const popupBanner = document.querySelector('.popup_banner')

  if (popupBanner == undefined) return

  const closeBtn = document.createElement('button')
  closeBtn.classList.add('popup_banner_close')
  closeBtn.textContent = '&#x2716;'

  popupBanner.appendChild(closeBtn)

  setTimeout(() => {
    popupBanner.classList.add(
      'animate__animated',
      'animate__bounceInUp',
      'triggered'
    )
  }, 500)

  function closePopup () {
    popupBanner.classList.remove('animate__bounceInUp')
    popupBanner.classList.add('animate__bounceOutDown')
  }

  closeBtn.addEventListener('click', closePopup)
})()

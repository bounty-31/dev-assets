;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('header.wp-block-template-part')
    const sticky = navbar.offsetHeight

    function handleMainNavSticky (nav, sticky) {
      window.onscroll = function () {
        myFunction()
      }

      function myFunction () {
        if (window.scrollY >= sticky) {
          nav.classList.add('nav_sticky')
        } else {
          nav.classList.remove('nav_sticky')
        }
      }
    }

    handleMainNavSticky(navbar, sticky)
  })
})()

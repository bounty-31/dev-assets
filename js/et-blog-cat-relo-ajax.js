;(function () {
  document.addEventListener('DOMContentLoaded', handleETBlogCatReloAjax)

  function handleETBlogCatReloAjax () {
    const blogFeed = document.querySelector('#blog_feed')
    handleBlogFeedContent(blogFeed)

    var proxied = window.XMLHttpRequest.prototype.send
    window.XMLHttpRequest.prototype.send = function () {
      var pointer = this
      var intervalId = setInterval(function () {
        if (pointer.readyState != 4) {
          return
        }
        if (pointer.readyState == 4 && pointer.status == 200) {
          const blogFeed = document.querySelector('#blog_feed')
          handleBlogFeedContent(blogFeed)
          clearInterval(intervalId)
        }
      }, 100)
      return proxied.apply(this, [].slice.call(arguments))
    }

    function handleCategoryClone (cats) {
      if (cats.length < 1) return

      const newCatWrap = document.createElement('div')
      newCatWrap.className = 'post-meta category'

      for (const cat of cats) {
        newCatWrap.appendChild(cat)
      }

      return newCatWrap
    }

    function handleBlogFeedContent (blog) {
      if (blog == undefined) return

      //   for divi builder
      if (blog._key) return

      const articles = [...blog.querySelectorAll('article')]

      if (articles.length < 1) return

      for (const article of articles) {
        const categories = [
          ...article.querySelectorAll('.post-meta a[href*="category"]')
        ]
        const catClone = handleCategoryClone(categories)

        // console.log(catClone)
        article.classList.add('blog_cat_relo')
        article.appendChild(catClone)
      }
    }
  }
})()

;(function () {
  const WP_REST_NONCE = mainParam.wp_rest_nonce
  const ROOT = mainParam.root

  function handleGetUsers () {
    const usersArea = document.querySelector('.users_area')
    const getUsers = usersArea.querySelector('.get_users')
    const userList = usersArea.querySelector('.user_list')
    let proceed = false

    const handleWPRestAPIGetRequest = async (url = '', obj = {}) => {
      const postRequest = new Request(url, {
        method: 'GET',
        headers: {
          'X-WP-Nonce': WP_REST_NONCE
        }
      })

      const response = await fetch(postRequest)
      return response.json()
    }
    const handleWPRestAPIDeleteRequest = async (url = '', obj = {}) => {
      const postRequest = new Request(url, {
        method: 'DELETE',
        headers: {
          'X-WP-Nonce': WP_REST_NONCE,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })

      const response = await fetch(postRequest)
      return response.json()
    }

    getUsers.addEventListener('click', handleGetUserRequest)

    function handleGetUserRequest (e) {
      e.preventDefault()
      this.textContent = 'Fetching'
      handleWPRestAPIGetRequest(
        `${ROOT}wp/v2/users?per_page=500&exclude=12613,2`
      )
        .then(res => {
          console.log(res)
          this.textContent = 'Fetch'
          handleUserDisplayTemplate(res)
          proceed = true
          handleDeleteUser(res)
        })
        .catch(error => {
          console.log(error)
        })
    }

    function handleUserDisplayTemplate ([...users]) {
      // console.log(users)
      const item = document.createElement('ul')
      users.map(user => {
        const name = document.createElement('li')
        name.textContent = user.name
        item.appendChild(name)
        userList.appendChild(item)
      })
    }

    function handleDeleteUser ([...users]) {
      if (!proceed) return

      const usersArea = document.querySelector('.users_area')
      const deleteBtn = document.createElement('a')
      deleteBtn.textContent = 'Delete Users'
      deleteBtn.href = '#'
      deleteBtn.className = 'delete_users'
      usersArea.appendChild(deleteBtn)
      proceed = false

      deleteBtn.addEventListener('click', e => {
        handleDeleteUserClick(e, users)
      })
    }

    function handleDeleteUserClick (e, [...users]) {
      e.preventDefault()
      let count = 0,
        refresh = false
      const force = `?reassign=2&force=1`

      e.target.textContent = 'Deleting Users ....'

      for (const user of users) {
        console.log(user.id)
        handleWPRestAPIDeleteRequest(`${ROOT}wp/v2/users/${user.id}${force}`)
          .then(res => {
            count++
            console.log(count, res)
            if (count == users.length) {
              e.target.textContent = 'Deleted Users!'
              refresh = true
              handleRefresh(refresh)
            }
          })
          .catch(error => {
            console.log(error)
          })
      }

      function handleRefresh (ref) {
        console.log(count, users.length)
        if (ref) {
          ref = false
          e.target.closest('.users_area').querySelector('ul').remove()
          e.target
            .closest('.users_area')
            .querySelector('.delete_users')
            .remove()
        }
      }
    }
  }
  handleGetUsers()

  //  *  or other way

  function handleGetUsers () {
    const usersArea = document.querySelector('.users_area')
    const users = usersArea.querySelectorAll('ul li')
    const deleteUsers = usersArea.querySelector('.delete_users')

    const handleWPRestAPIDeleteRequest = async (url = '', obj = {}) => {
      const postRequest = new Request(url, {
        method: 'DELETE',
        headers: {
          'X-WP-Nonce': WP_REST_NONCE,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })

      const response = await fetch(postRequest)
      return response.json()
    }

    deleteUsers.addEventListener('click', e => {
      handleDeleteUserClick(e, users)
    })

    function handleDeleteUserClick (e, [...users]) {
      e.preventDefault()
      let count = 0,
        refresh = false
      const force = `?reassign=2&force=true`

      e.target.textContent = 'Deleting Users ....'

      for (const user of users) {
        const id = user.dataset.userId
        console.log(id)
        handleWPRestAPIDeleteRequest(`${ROOT}wp/v2/users/${id}${force}`)
          .then(res => {
            count++
            console.log(count, res)
            if (count == users.length) {
              e.target.textContent = 'Deleted Users!'
              refresh = true
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
  handleGetUsers()
})()

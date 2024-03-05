// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method : "POST",
        body : userData,
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}

export function getAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/allUsers", {
        method : "GET",
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}

export function AddSavedPost(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/saved/" + id, {
        method : "PATCH",
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}

export function getUserInfo(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/user/${id}`, {
        method : "GET",
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}

export function checkUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method : "POST",
        body : JSON.stringify(userData),
        credentials: 'include',
        headers : {'content-type' : 'application/json'}
      })
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}

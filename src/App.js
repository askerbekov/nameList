import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [change, setChange] = useState('')


  useEffect(() => {
    axios(`https://64e2f01ebac46e480e77eeff.mockapi.io/api/lvl1/users`)
        .then(({data}) => setUsers(data) )
  },[])

  const handleChange = (e,user) => {
    const newData = {...user, hired: e.target.checked}
    axios.put(`https://64e2f01ebac46e480e77eeff.mockapi.io/api/lvl1/users/${user.id}` , newData)
        .then(({data}) => {
          setUsers((users.map(user => user.id === data.id ? data : user)))
        })
  }
  const handleDelete = (user) => {
      console.log(user)
      axios.delete(`https://64e2f01ebac46e480e77eeff.mockapi.io/api/lvl1/users/${user.id}`)
          .then(({data}) => {
              setUsers((users.filter(user => user.id !== data.id )))
          })
  }

  const handleAdd = (user) => {
      user.preventDefault()
      console.log(name)
      axios.post(`https://64e2f01ebac46e480e77eeff.mockapi.io/api/lvl1/users`, {name})
          .then(({data}) => {
              console.log(data)
              setUsers([...users , data])
            setName('')
          })
  }
  const handleEdite = (user) => {
      axios.put(`https://64e2f01ebac46e480e77eeff.mockapi.io/api/lvl1/users/${user.id}`)
          .then(({data}) => {
              console.log(data)
          })
  }
  return (
      <div className={'container'}>
          <h2>My TODO NameList</h2>
          <form onSubmit={handleAdd}>
              <input type="text" onChange={(e) => setName(e.target.value) }/>
              <button type={"submit"}>Submit</button>
          </form>
        {
          users.map(user => {
            return (
                <div className={'todoList'} key={user.name}>
                  <h2>{user.name}</h2>
                  <input
                      type="checkbox"
                      onChange={(e) => handleChange(e, user)}
                      checked={user.hired}
                  />
                    <button onClick={(() => handleDelete(user))}>Delete</button>
                    <button onClick={(() => handleEdite(user))}>Edit</button>

                </div>
            )
          })
        }
      </div>
  );
};

export default App;
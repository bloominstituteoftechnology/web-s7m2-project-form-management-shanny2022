// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let initialTeamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

function App() {
  const [formValues, setFormValues] = useState({ fname: '', lname: '', bio: '' })
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    const member = teamMembers.find(member => member.id === editing)
    setFormValues(member ? member : { fname: '', lname: '', bio: '' })
  }, [editing])

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  const submitForm = (event) => {
    event.preventDefault()
    if (editing === null) {
      setTeamMembers(prevMembers => [...prevMembers, { id: getId(), ...formValues }])
    } else {
      setTeamMembers(prevMembers => {
        const updatedMembers = [...prevMembers]
        const index = updatedMembers.findIndex(member => member.id === editing)
        updatedMembers[index] = { id: editing, ...formValues }
        return updatedMembers
      })
      setEditing(null)
    }
    setFormValues({ fname: '', lname: '', bio: '' })
  }

  const edit = (id) => {
    setEditing(id)
  }

  return (
    <div>
      <h1>Team Builder Mock</h1>
      <h2>Team Members</h2>
      {teamMembers.map(member => (
        <div key={member.id}>
          <h3>{member.fname} {member.lname}</h3>
          <p>{member.bio}</p>
          <button onClick={() => edit(member.id)}>Edit</button>
        </div>
      ))}
      <h2>Add a Team Member</h2>
      <form onSubmit={submitForm}>
        <label>
          First Name
          <input name="fname" value={formValues.fname} onChange={handleInputChange} placeholder="Type First Name" />
        </label>
        <label>
          Last Name
          <input name="lname" value={formValues.lname} onChange={handleInputChange} placeholder="Type Last Name" />
        </label>
        <label>
          Bio
          <textarea name="bio" value={formValues.bio} onChange={handleInputChange} placeholder="Type Bio" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App

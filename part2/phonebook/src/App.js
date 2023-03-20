import { render } from '@testing-library/react'
import { useState, useEffect } from 'react'
import noteService from './services/notes'


const Book = ({ persons, remove }) => {
  return (
    <div>
    <ul>
      {persons.map(person =>
        <li key={person.id}>{person.name} {person.number} <button id={person.id} onClick={remove}>Delete</button></li> 
        )}
    </ul>
    </div>
  )
}

const Form = ({ newName, newNumber, addNames, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addNames}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new name...')
  const [newNumber, setNewNumber] = useState('a new number')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const exists = (name) => {
    let inBook = persons.map(person => person.name)
                   .some(name => name.toLowerCase() === newName.toLowerCase())
    console.log(inBook)
    return inBook
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const addNames = (event) => {
      event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber,
      }
  
      if (!exists(newName)) {
          noteService
            .create(nameObject)
            .then(response => {
              setPersons(persons.concat(response.data))
              setNewName('a new name...')
              setNewNumber('a new number...')
            })
        }
      else {
        alert(`${newName} already exists in phonebook`)
      } 
    }
  
    const removeNames = (event) => {
      event.preventDefault()
      let id = event.target.id
      console.log(id)
      let name = persons.filter(p => p.id === id)
      console.log(name)
      alert(`Delete ${name}`)

      noteService 
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          setNewName('a new name...')
          setNewNumber('a new number...')
        })
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form newName={newName} newNumber={newNumber} addNames={addNames} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <Book persons={persons} remove={removeNames} />
    </div>
  )
}

export default App
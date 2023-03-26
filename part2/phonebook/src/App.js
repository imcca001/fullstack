import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null} )
    }, 3000)
  }

  const cleanForm = () => {
    setNewName('')
    setNewNumber('') 
  }

  const exists = (name) => {
    let inBook = persons.map(person => person.name)
                   .some(name => name.toLowerCase() === newName.toLowerCase())
    console.log(inBook)
    return inBook
  }

  const addNames = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    // if (!exists(newName)) {
        noteService
          .create(nameObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            notifyWith(`${nameObject.name} added!`)
            cleanForm()
          })
          .catch(error => {
            notifyWith(`${error.response.data.error}`)
            console.log(error.response.data.error)
          })
    //   }
    // else {
    //   alert(`${newName} already exists in phonebook`)
    // } 
  }

  const removeNames = (person) => {
    const ok = window.confirm(`remove ${person.name} from phonebook`)
    if ( ok ) {
      noteService 
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        alert(`number of ${person.name} deleted! `)
      })
    }
  }

  const byFilterField =
    p => p.name.toLowerCase().includes(filter.toLowerCase())

  const personsToShow = filter ? persons.filter(byFilterField) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification info={info} />
{/* 
      <Filter filter={filter} setFilter={setFilter} /> */}
      
      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addNames}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h3>Phone numbers</h3>

      <Persons
        persons={personsToShow}
        removePerson={removeNames}
      />
    </div>
  )
}

export default App

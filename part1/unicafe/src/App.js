import { useState } from 'react'

const Display = ({ text, value }) => {
  return (
      <tr>
        <td>{text} {value}</td>
      </tr>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {

  function average(good, neutral, bad) {
    let total = good + neutral + bad
    let count = good - bad
    return (count / total).toFixed(10);
  }

  function positive(good, neutral, bad) {
    let total = good + neutral + bad
    return ((good / total) * 100).toFixed(10) + ' %'
  }

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>statistics</h2>
        No feedback given
        </div>
    )
  }

  return (
    <div>
    <h2>statistics</h2>
    <table>
      <tbody>
        <Display text='good' value={good}/>
        <Display text='neutral' value={neutral}/>
        <Display text='bad' value={bad}/>
        <Display text='all' value={bad + good + neutral}/>
        <Display text='average' value={average(good, neutral, bad)}/>
        <Display text='positive' value={positive(good, neutral, bad)}/>
      </tbody>
    </table>   
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

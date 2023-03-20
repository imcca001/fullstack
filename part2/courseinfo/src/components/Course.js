const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => 
  <p><b>Number of exercises {parts.map(part => part.exercises).reduce((accum, num) => accum + num, 0)}</b></p>

const Part = ({ part }) => 
  <p>
    {(part.name)} {(part.exercises)}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}     
  </>

const Course = ({ course }) =>
<div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
</div>


export default Course
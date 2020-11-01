import React from 'react'

const Goals = () => {
  return <div>
    <div>Base hours:</div>
    <input value={40}/>
    <div>Input goals:</div>
    <textarea />
    <div>Status:</div>
    <table>
      <tr>
        <th>Goal</th>
        <th>Bar</th>
        <th>Actual hours</th>
        <th>Target hours</th>
        <th>% rendered</th>
      </tr>
      <tr>
        <td>work</td>
        <td>[|||||||||.]</td>
        <td>9</td>
        <td>10</td>
        <td>90</td>
      </tr>
      <tr>
        <td>work2</td>
        <td>[|||||||...]</td>
        <td>7</td>
        <td>10</td>
        <td>70</td>
      </tr>
    </table>
  </div>
}

export default Goals

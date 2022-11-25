// import React from 'react'
// import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
// import checkedIcon from '../../assets/images/checked.png'
// import cancelIcon from '../../assets/images/cancel.png'
// import { IEditRow } from '../../types'

// const EditRow = ({ data, handleCheck, setInputVal,
//   setEdit, isEdit }: IEditRow) => {

//   const escapeFromEdit = (e: any) => {
//     if (e.key === 'Escape') {
//       setEdit(!isEdit)
//     }
//   }
//   return (
//     <tr key={data.id}>
//       <td><Form.Check value={data.id} onChange={(e) => handleCheck(e)} /></td>
//       <td>
//         <input type="text" value={data.name} onChange={(e) => setInputVal(e.target.value)} onKeyUp={(e) => escapeFromEdit(e)} />
//       </td>
//       <td>
//         <input type="text" value={data.email} onChange={(e) => setInputVal(e.target.value)} onKeyUp={(e) => escapeFromEdit(e)} /></td>
//       <td>
//         <select id="role" name="role">
//           <option>{data.role}</option>
//         </select>
//       </td>
//       <td>
//         <div className='icons-size'>
//           <OverlayTrigger
//             placement="left"
//             overlay={<Tooltip id="button-tooltip-2">Save</Tooltip>}
//           ><img src={checkedIcon} onClick={() => editFunction(data.id)} alt="checkedIcon" /></OverlayTrigger>
//           <OverlayTrigger
//             placement="right"
//             overlay={<Tooltip id="button-tooltip-2">Cancel</Tooltip>}
//           ><img src={cancelIcon} alt="cancelIcon" className='ms-2' onClick={() => { setEdit(!isEdit) }} /></OverlayTrigger>
//         </div>
//       </td>
//     </tr>
//   )
// }

// export default EditRow

import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index
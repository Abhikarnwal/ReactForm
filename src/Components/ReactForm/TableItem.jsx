import React from "react";

function TableItem({ item,onDelete }) {
  
  const deleteitem=()=>{
    onDelete(item.id)
  }

  return (
    <tr>
      <td>{item.name}</td>
      <td>
        {" "}
        <img src={item.previewUrl} alt="profilepic" width="50" height="50" />
      </td>
      <td>{item.age}</td>
      <td>{item.address}</td>
      <td>{item.departments}</td>
      <td>{item.salary}</td>
      <td>{item.martialStatus ? "Married " : "UnMarried"}</td>

      <td  onClick={deleteitem}><button>Delete</button></td>
    </tr>
  );
}

export default TableItem;

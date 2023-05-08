import React from "react";
import { BiEdit, BiEraser } from "react-icons/bi";

const CustomerProfiles = ({ data, onEdit, onDelete }) => {
  return (
    <div className='container table-responsive-sm'>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Customer ID</th>
            <th scope='col'>Age</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Address</th>
            <th scope='col'>Employment</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, i) => (
            <tr key={i}>
              <td>{p._id}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.address}</td>
              <td>{p.employment}</td>

              <td>
                
                <div className='container'>
                  <button
                    onClick={() => onEdit(p._id)}
                    className='btn btn-info btn-sm mr-2'>
                    <BiEdit size={20}/>
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className='btn btn-danger btn-sm'>
                    <BiEraser size={20}/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerProfiles;

import React from "react";
import { BiEdit, BiEraser } from "react-icons/bi";

const CustomerProfiles = ({ data, onEdit, onDelete }) => {
  return (
    <div className='m-10 text-center overflow-auto rounded-lg shadow-md'>
      <table className='w-full'>
        <thead className='text-md font-semibold  bg-gray-900 text-white'>
          <tr className=''>
            <th className='p-3'>Customer ID</th>
            <th className='p-3'>Age</th>
            <th className='p-3'>Gender</th>
            <th className='p-3'>Address</th>
            <th className='p-3'>Employment</th>
            <th className='p-3'></th>
          </tr>
        </thead>
        <tbody className='text-sm bg-gray-800 text-white'>
          {data.map((p, i) => (
            <tr key={i}>
              <td className='p-3'>{p._id}</td>
              <td className='p-3'>{p.age}</td>
              <td className='p-3'>{p.gender}</td>
              <td className='p-3'>{p.address}</td>
              <td className='p-3'>{p.employment}</td>

              <td className="p-3 space-x-3">
                <button
                  onClick={() => onEdit(p._id)}
                  className='p-3  rounded-lg bg-slate-600'>
                  <BiEdit size={20} />
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className='p-3  rounded-lg bg-rose-600'>
                  <BiEraser size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerProfiles;

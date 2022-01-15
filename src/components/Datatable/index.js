import React from 'react';

const Response = () => {
  /**
   * *table* = database table
   *
   * thead: [
   *  {
   *    "name field in *table*": "displayed value in datatable",
   *  },
   * ]
   * tbody: [
   *  {
   *    "id": "id row in *table*",
   *    "name field in *table*": "field value in *table*",
   *  },
   * ]
   */
  return {
    thead: { name: 'Name', email: 'Email', phone: 'Phone' },
    tbody: [
      {
        id: 1,
        values: { 
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          phone: '08128883123',
        },
      },
      {
        id: 2,
        values: { 
          name: 'Jean De',
          email: 'jeannde@gmail.com',
          phone: '08328883123',
        },
      },
      {
        id: 3,
        values: { 
          name: 'Robert Kiyosaki',
          email: 'robert@gmail.com',
          phone: '08125583123',
        },
      },
      {
        id: 1,
        values: { 
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          phone: '08128883123',
        },
      },
      {
        id: 2,
        values: { 
          name: 'Jean De',
          email: 'jeannde@gmail.com',
          phone: '08328883123',
        },
      },
      {
        id: 3,
        values: { 
          name: 'Robert Kiyosaki',
          email: 'robert@gmail.com',
          phone: '08125583123',
        },
      },
      {
        id: 1,
        values: { 
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          phone: '08128883123',
        },
      },
      {
        id: 2,
        values: { 
          name: 'Jean De',
          email: 'jeannde@gmail.com',
          phone: '08328883123',
        },
      },
      {
        id: 3,
        values: { 
          name: 'Robert Kiyosaki',
          email: 'robert@gmail.com',
          phone: '08125583123',
        },
      },
    ],
  };
};

const response = Response();
const responseLen = response.tbody.length;
const Datatable = ({ className }) => {
  return (
    <>
      <table className={`w-full ${className}`}>
        <thead>
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">No</th>
            {Object.entries(response.thead).map(([name, value]) => (
              <th key={`th-${name}`} className="text-left">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {response.tbody.map((rows, index) => (
            <tr key={`tr-${rows.id}`}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{index+1}</td>
              {Object.entries(rows.values).map(([rowName, rowVal]) => {
                return <td key={`tr-${rows.id}-${rowName}`}>{rowVal}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Datatable.defaultProps = {
  className: '',
};

export default Datatable;

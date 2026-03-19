import React from 'react';

function UsernameInput({ value, onChange, label = "Usuario", type = "text" }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        {label}:
      </label>
      <input
        type={type} //type
        value={value}
        onChange={onChange}
        style={{
          padding: '10px',
          border: '2px solid black',
          backgroundColor: 'white',
          color: 'black',
          width: '200px'
        }}
      />
    </div>
  );
}

export default UsernameInput;
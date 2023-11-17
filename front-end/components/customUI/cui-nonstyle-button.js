import React from 'react';

export default function CUINonstyleButton({ onClick, children }) {
  return (
    <>
      <button onClick={onClick} type="button">
        {children}
      </button>
      <style jsx>
        {`
          button {
            display: block;
            border: none;
            padding: 0;
            margin: 0;
            text-decoration: none;
            background: none;
            cursor: pointer;
            text-align: center;
            -webkit-appearance: none;
            -moz-appearance: none;
          }
        `}
      </style>
    </>
  );
}

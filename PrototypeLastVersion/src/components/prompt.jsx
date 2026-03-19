import React from 'react';

export default function Prompt({ message, visible }) {
  if (!visible) return null;

  return (
    <div className="interaction-prompt">
      <span className="prompt-key">ENTER</span>
      <span>{message}</span>
    </div>
  );
}
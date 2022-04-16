import React from 'react';

export default function RenderOption(props) {

  return (
  <option value={props.workoutId}>{props.workoutName}</option>

  );
}

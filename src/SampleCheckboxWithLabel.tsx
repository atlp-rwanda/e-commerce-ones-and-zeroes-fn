import { useState } from 'react';

interface CheckboxProps {
  labelOn: string; // Specify the type for labelOn
  labelOff: string; // Specify the type for labelOff
}

export default function CheckboxWithLabel({ labelOn, labelOff }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? labelOn : labelOff}
    </label>
  );
}

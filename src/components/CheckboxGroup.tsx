import { ChangeEvent, useState, useEffect } from 'react';
import { useCheckboxGroupContext, useCheckboxGroupDispatchContext } from "../context/checkboxgroup.context";

type CheckboxGroupProps = {
  value: string;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ value }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { checkboxGroup } = useCheckboxGroupContext();
  const { getDerivedCheckboxGroupState, setCheckboxGroupState } = useCheckboxGroupDispatchContext();

  useEffect(() => {
    const genreState = getDerivedCheckboxGroupState(value);

    if (checked !== genreState) {
      setChecked(genreState);
    }
  }, [checkboxGroup, value, checked, getDerivedCheckboxGroupState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setChecked(checked);
    setCheckboxGroupState(value, checked);
  }

  return (
    <div>
      <input 
        id={value}
        name={value}
        onChange={handleChange}
        checked={checked}
        type="checkbox"
      />
      <label htmlFor={value}><b>{value}</b></label>
    </div>
  )
};

export default CheckboxGroup;
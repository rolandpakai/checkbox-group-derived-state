import { ChangeEvent, useState, useEffect } from 'react';
import { useCheckboxGroupContext, useCheckboxGroupDispatchContext } from "../context/checkboxgroup.context";

type CheckboxOptionProps = {
  value: string;
  genre: string;
};

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ value, genre }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { checkboxGroup } = useCheckboxGroupContext();
  const { setCheckboxOptionState, getDerivedCheckboxGroupState, getCheckboxOptionState } = useCheckboxGroupDispatchContext();

  useEffect(() => {
    const genreState = getDerivedCheckboxGroupState(genre);
    const contextValue = getCheckboxOptionState(genre)[value];

    setChecked(genreState ||contextValue)

  }, [checkboxGroup]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setChecked(checked);
    setCheckboxOptionState(value, genre, checked);
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
      <label htmlFor={value}>{value}</label>
    </div>
  )
};

export default CheckboxOption;
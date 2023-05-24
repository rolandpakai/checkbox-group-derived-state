import { ChangeEvent, useState, useEffect } from 'react';
import { useCheckboxGroupContext, useCheckboxGroupDispatchContext } from "../../context/checkboxgroup.context";

type CheckboxOptionProps = {
  value: string;
  group: string;
};

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ value, group }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { checkboxGroup } = useCheckboxGroupContext();
  const { setCheckboxOptionState, getDerivedCheckboxGroupState, getCheckboxOptionState } = useCheckboxGroupDispatchContext();

  useEffect(() => {
    const genreState = getDerivedCheckboxGroupState(group);
    const contextValue = getCheckboxOptionState(group)[value];

    setChecked(genreState ||contextValue)

  }, [checkboxGroup, value, group, getCheckboxOptionState, getDerivedCheckboxGroupState ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setChecked(checked);
    setCheckboxOptionState(value, group, checked);
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
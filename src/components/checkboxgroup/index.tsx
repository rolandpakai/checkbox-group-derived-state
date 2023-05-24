import CheckboxGroup from './CheckboxGroup';
import CheckboxOption from './CheckboxOption';
import CheckboxGroupContextProvider from "../../context/checkboxgroup.context";
import { CheckboxGroupType, CheckboxGroupListType } from '../../types'

interface CheckboxGroupComponentProps {
  value: CheckboxGroupListType;
  defaultValue: CheckboxGroupType;
};

const CheckboxGroupComponent: React.FC<CheckboxGroupComponentProps> = ({ value, defaultValue }) => {
  const groups = Object.keys(value);
  
  return (
    <div>
      <CheckboxGroupContextProvider value={value} defaultValue={defaultValue} >
      {groups.map((group) => {
        return (
          <div key={group}>
            <CheckboxGroup 
              key={group}
              value={group}
            />
            {value[group].map((option) => {
                return (
                  <CheckboxOption 
                    key={option} 
                    value={option}
                    group={group}
                  />
                )
              })
            }
          </div>
        )
      })}
      </CheckboxGroupContextProvider>
    </div>
  )
};

export default CheckboxGroupComponent;
export type { CheckboxGroupType, CheckboxGroupOptionType, CheckboxGroupListType } from '../../types'
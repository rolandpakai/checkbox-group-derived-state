import CheckboxGroup from './CheckboxGroup';
import CheckboxOption from './CheckboxOption';
import CheckboxGroupContextProvider from "../../context/checkboxgroup.context";

interface CheckboxGroupComponentProps {
  value: Record<string, string[]>;
};

const CheckboxGroupComponent: React.FC<CheckboxGroupComponentProps> = ({ value }) => {
  const groups = Object.keys(value);
  
  return (
    <div>
      <CheckboxGroupContextProvider value={value} >
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
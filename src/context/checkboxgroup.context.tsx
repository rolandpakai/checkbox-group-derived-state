import { ReactNode, createContext, useContext, useState, useMemo, useCallback } from "react";
import { CheckboxGroupOptionType, CheckboxGroupType, CheckboxGroupListType } from '../types';

interface ICheckboxGroupContext {
  checkboxGroup: CheckboxGroupType;
}

interface ICheckboxDispatchContext {
  getDerivedCheckboxGroupState: (value:string) => boolean;
  getCheckboxOptionState: (group: string) => CheckboxGroupOptionType;
  setCheckboxOptionState: (value: string, group: string, checked: boolean) => void;
  setCheckboxGroupState: (value: string, checked: boolean) => void;
}

type CheckboxGroupContextProviderProps = {
  children: ReactNode;
  value: CheckboxGroupListType;
  defaultValue: CheckboxGroupType;
}

const CheckboxGroup = createContext<ICheckboxGroupContext | null>(null);

const CheckboxGroupDispatchContext = createContext<ICheckboxDispatchContext | null>(null);

const isAllOptionChecked = (obj: CheckboxGroupOptionType): boolean => {
  if (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!obj[key]) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}

const initCheckboxGroup = (value: CheckboxGroupListType, defaultValue: CheckboxGroupType): CheckboxGroupType => {
  const checkboxGroup: CheckboxGroupType = {};
  
  if (value) {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        const groupOptions: CheckboxGroupOptionType = {};

        value[key].forEach((option) => {
          groupOptions[option] = false;
        });

        checkboxGroup[key] = groupOptions;
      }
    }
  }

  return checkboxGroup;
}

const CheckboxGroupContextProvider: React.FC<CheckboxGroupContextProviderProps> = ({ children, value, defaultValue }) => {
  const [checkboxGroup, setCheckboxGroup] = useState<CheckboxGroupType>(initCheckboxGroup(value, defaultValue));

  const getCheckboxOptionState = useCallback((group: string): CheckboxGroupOptionType => {
    return checkboxGroup[group];
  }, [checkboxGroup]);

  const getDerivedCheckboxGroupState = useCallback((value: string): boolean => {
    const checkboxGroupOptions = getCheckboxOptionState(value);

    return isAllOptionChecked(checkboxGroupOptions);
  }, [getCheckboxOptionState]);

  const setCheckboxGroupState = useCallback((group: string, checked: boolean): void => {
    const checkboxGroupOptions: CheckboxGroupOptionType = checkboxGroup[group];

    for (let option in checkboxGroupOptions) {
      if (checkboxGroupOptions.hasOwnProperty(option)) {
        checkboxGroupOptions[option] = checked;
      }
    }

    setCheckboxGroup({ ...checkboxGroup, [group]: checkboxGroupOptions});
  }, [checkboxGroup, setCheckboxGroup]);

  const setCheckboxOptionState = useCallback((value: string, group: string, checked: boolean): void => {
    setCheckboxGroup(prevState => {
      return {...prevState, [group]: {...prevState[group],  [value]: checked}}
    });
  }, [setCheckboxGroup]);
  
  const checkboxGroupContextProviderValue = useMemo(() => ({ checkboxGroup }), [checkboxGroup]);

  const checkboxGroupDispatchContextProviderValue = useMemo(() => ({ 
    getDerivedCheckboxGroupState, 
    getCheckboxOptionState,
    setCheckboxOptionState, 
    setCheckboxGroupState 
  }), [setCheckboxOptionState, setCheckboxGroupState, getDerivedCheckboxGroupState, getCheckboxOptionState]);

  return (
    <CheckboxGroup.Provider value={checkboxGroupContextProviderValue}>
      <CheckboxGroupDispatchContext.Provider value={checkboxGroupDispatchContextProviderValue}>
        {children}
      </CheckboxGroupDispatchContext.Provider>
    </CheckboxGroup.Provider>
  );
};

export default CheckboxGroupContextProvider;

export const useCheckboxGroupContext = (): ICheckboxGroupContext  =>
  useContext(CheckboxGroup) as ICheckboxGroupContext;

export const useCheckboxGroupDispatchContext = (): ICheckboxDispatchContext  =>
  useContext(CheckboxGroupDispatchContext) as ICheckboxDispatchContext;
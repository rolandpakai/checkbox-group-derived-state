import { ReactNode, createContext, useContext, useState, useMemo, useCallback } from "react";

type CheckboxGroupType = Record<string, Record<string, boolean>>;

interface ICheckboxGroupContext {
  checkboxGroup: CheckboxGroupType;
}

interface ICheckboxDispatchContext {
  getDerivedCheckboxGroupState: (value:string) => boolean;
  getCheckboxOptionState: (group: string) => Record<string, boolean>;
  setCheckboxOptionState: (value: string, group: string, checked: boolean) => void;
  setCheckboxGroupState: (value: string, checked: boolean) => void;
}

type CheckboxGroupContextProviderProps = {
  children: ReactNode;
  value: Record<string, string[]>;
}

const CheckboxGroup = createContext<ICheckboxGroupContext | null>(null);

const CheckboxGroupDispatchContext = createContext<ICheckboxDispatchContext | null>(null);

const isAllOptionChecked = (obj: Record<string, boolean>) => {
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

const initCheckboxGroup = (value: Record<string, string[]>) => {
  const checkboxGroup: CheckboxGroupType = {};
  
  if (value) {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        const groupOptions: Record<string, boolean> = {};

        value[key].forEach((option) => {
          groupOptions[option] = false;
        });

        checkboxGroup[key] = groupOptions;
      }
    }
  }

  return checkboxGroup;
}

const CheckboxGroupContextProvider: React.FC<CheckboxGroupContextProviderProps> = ({ children, value }) => {
  const [checkboxGroup, setCheckboxGroup] = useState<CheckboxGroupType>(initCheckboxGroup(value));

  const getCheckboxOptionState = useCallback((group: string) => {
    return checkboxGroup[group];
  }, [checkboxGroup]);

  const getDerivedCheckboxGroupState = useCallback((value: string) => {
    const checkboxGroupOptions = getCheckboxOptionState(value);

    return isAllOptionChecked(checkboxGroupOptions);
  }, [getCheckboxOptionState]);

  const setCheckboxGroupState = useCallback((group: string, checked: boolean) => {
    const checkboxGroupOptions: Record<string, boolean> = checkboxGroup[group];

    for (let option in checkboxGroupOptions) {
      if (checkboxGroupOptions.hasOwnProperty(option)) {
        checkboxGroupOptions[option] = checked;
      }
    }

    setCheckboxGroup({ ...checkboxGroup, [group]: checkboxGroupOptions});
  }, [checkboxGroup, setCheckboxGroup]);

  const setCheckboxOptionState = useCallback((value: string, group: string, checked: boolean) => {
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
  }), [setCheckboxOptionState, setCheckboxGroupState, getDerivedCheckboxGroupState]);

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
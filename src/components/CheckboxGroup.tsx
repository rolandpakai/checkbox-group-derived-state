import { ChangeEvent, useState, useEffect } from 'react';
import { useSongContext, useSongDispatchContext } from "../context/song.context";

type CheckboxGroupProps = {
  value: string;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ value }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { songOptionSelection } = useSongContext();
  const { getDerivedGenreState, setGenreCheck } = useSongDispatchContext();

  useEffect(() => {
    const genreState = getDerivedGenreState(value);

    if (checked !== genreState) {
      setChecked(genreState);
    }
  }, [songOptionSelection]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setChecked(checked);
    setGenreCheck(value, checked);
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
import { ChangeEvent, useState, useEffect } from 'react';
import { useSongContext, useSongDispatchContext } from "../context/song.context";

type CheckboxOptionProps = {
  value: string;
  genre: string;
};

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ value, genre }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { songOptionSelection } = useSongContext();
  const { setGenreOptionCheck, getDerivedGenreState } = useSongDispatchContext();

  useEffect(() => {
    const genreState = getDerivedGenreState(genre);

    if (genreState) {
      setChecked(genreState);
    }
  }, [songOptionSelection]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setChecked(checked);
    setGenreOptionCheck(value, genre, checked);
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
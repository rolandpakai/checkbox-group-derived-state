import { ChangeEvent, useState, useEffect } from 'react';
import SongContextProvider, { useSongContext, useSongDispatchContext } from "../context/song.context";

type GenreType = string[];

const GENRES: GenreType = ['Pop', 'EDM', 'Rock'];

const OPTIONS: Record<string, string[]> = {
  Pop: ['A-Team', 'Thriller', 'Mirrors'],
  EDM: ['Levels', 'Sahara Love', 'Wake me up'],
  Rock: ['Thunderstorm', 'Feel nothing'],
};

const SongSelector: React.FC = () => {
  return (
    <>
      <h3>Song Selector</h3>
      <div>
        <SongContextProvider songOptions={OPTIONS} >
        {GENRES.map((genre) => {
          return (
            <div key={genre}>
              <Genre 
                key={genre}
                value={genre}
              />
              {OPTIONS[genre].map((option) => {
                  return (
                    <GenreOption 
                      key={option} 
                      value={option}
                      genre={genre}
                    />
                  )
                })
              }
            </div>
          )
        })}
        </SongContextProvider>
      </div>
    </>
  )
};

type GenreProps = {
  value: string;
};

const Genre: React.FC<GenreProps> = ({ value }) => {
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

type GenreOptionProps = {
  value: string;
  genre: string;
};

const GenreOption: React.FC<GenreOptionProps> = ({ value, genre }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { songOptionSelection } = useSongContext();
  const { setGenreOptionCheck, getDerivedGenreState } = useSongDispatchContext();

  useEffect(() => {
    const genreState = getDerivedGenreState(genre);

    if (checked !== genreState) {
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

export default SongSelector;
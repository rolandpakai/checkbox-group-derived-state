import CheckboxGroup from './CheckboxGroup';
import CheckboxOption from './CheckboxOption';
import CheckboxGroupContextProvider from "../context/checkboxgroup.context";

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
        <CheckboxGroupContextProvider value={OPTIONS} >
        {GENRES.map((genre) => {
          return (
            <div key={genre}>
              <CheckboxGroup 
                key={genre}
                value={genre}
              />
              {OPTIONS[genre].map((option) => {
                  return (
                    <CheckboxOption 
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
        </CheckboxGroupContextProvider>
      </div>
    </>
  )
};

export default SongSelector;
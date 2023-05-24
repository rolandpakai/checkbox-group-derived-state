import { ReactNode, createContext, useContext, useState, useMemo, useCallback } from "react";

type SongOptionSelectionType = Record<string, Record<string, boolean>>;
interface ISongContext {
  songOptionSelection: SongOptionSelectionType;
}

interface ISongDispatchContext {
  getDerivedGenreState: (value:string) => boolean;
  getGenreSelectionState: (genre: string) => Record<string, boolean>;
  setGenreOptionCheck: (value: string, genre: string, checked: boolean) => void;
  setGenreCheck: (value: string, checked: boolean) => void;
}

type SongContextProviderProps = {
  children: ReactNode;
  songOptions: Record<string, string[]>;
}


const SongContext = createContext<ISongContext | null>(null);

const SongDispatchContext = createContext<ISongDispatchContext | null>(null);

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

const initSongOptionSelection = (songOptions: Record<string, string[]>) => {
  const initSongOption: SongOptionSelectionType = {};
  
  if (songOptions) {
    for (let key in songOptions) {
      if (songOptions.hasOwnProperty(key)) {
        const genreOptions: Record<string, boolean> = {};

        songOptions[key].forEach((option) => {
          genreOptions[option] = false;
        });

        initSongOption[key] = genreOptions;
      }
    }
  }

  return initSongOption;
}

const SongContextProvider: React.FC<SongContextProviderProps> = ({ children, songOptions }) => {
  const [songOptionSelection, setSongOptionSelection] = useState<SongOptionSelectionType>(initSongOptionSelection(songOptions));

  const getGenreSelectionState = useCallback((genre: string) => {
    return songOptionSelection[genre];
  }, [songOptionSelection]);

  const getDerivedGenreState = useCallback((value: string) => {
    const genreOptions = getGenreSelectionState(value);

    return isAllOptionChecked(genreOptions);
  }, [getGenreSelectionState]);

  const setGenreCheck = useCallback((genre: string, checked: boolean) => {
    const genreOptions: Record<string, boolean> = songOptionSelection[genre];

    for (let option in genreOptions) {
      if (genreOptions.hasOwnProperty(option)) {
        genreOptions[option] = checked;
      }
    }

    setSongOptionSelection({ ...songOptionSelection, [genre]: genreOptions});
  }, [songOptionSelection, setSongOptionSelection]);

  const setGenreOptionCheck = useCallback((value: string, genre: string, checked: boolean) => {
    setSongOptionSelection(prevState => {
      return {...prevState, [genre]: {...prevState[genre],  [value]: checked}}
    });
  }, [setSongOptionSelection]);
  
  const songContextProviderValue = useMemo(() => ({ songOptionSelection }), [songOptionSelection]);

  const songDispatchContextProviderValue = useMemo(() => ({ 
    getDerivedGenreState, 
    getGenreSelectionState,
    setGenreOptionCheck, 
    setGenreCheck 
  }), [setGenreOptionCheck, setGenreCheck, getDerivedGenreState]);

  return (
    <SongContext.Provider value={songContextProviderValue}>
      <SongDispatchContext.Provider value={songDispatchContextProviderValue}>
        {children}
      </SongDispatchContext.Provider>
    </SongContext.Provider>
  );
};

export default SongContextProvider;

export const useSongContext = (): ISongContext  =>
  useContext(SongContext) as ISongContext;

export const useSongDispatchContext = (): ISongDispatchContext  =>
  useContext(SongDispatchContext) as ISongDispatchContext;
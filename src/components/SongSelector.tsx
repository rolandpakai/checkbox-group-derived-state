import CheckboxGroup from './checkboxgroup';

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
        <CheckboxGroup value={OPTIONS} />
      </div>
    </>
  )
};

export default SongSelector;
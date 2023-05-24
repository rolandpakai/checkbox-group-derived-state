import CheckboxGroup, { CheckboxGroupType, CheckboxGroupListType } from '../components/checkboxgroup';

const OPTIONS: CheckboxGroupListType = {
  Pop: ['A-Team', 'Thriller', 'Mirrors'],
  EDM: ['Levels', 'Sahara Love', 'Wake me up'],
  Rock: ['Thunderstorm', 'Feel nothing'],
};

const defaultValue: CheckboxGroupType = {
  Pop: {'A-Team': true}
}

const SongSelector: React.FC = () => {
  return (
    <>
      <h3>Song Selector</h3>
      <div>
        <CheckboxGroup value={OPTIONS} defaultValue={defaultValue}/>
      </div>
    </>
  )
};

export default SongSelector;
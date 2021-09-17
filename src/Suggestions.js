import {
  Dropdown,
  DropdownList,
  DropdownOption,
  DropdownWrapper,
  Input,
  Label,
} from './EmotionStyles';
import { templateList } from './templateList';

export function Suggestions({
  imageName,
  setImageName,
  suggestions,
  setSuggestions,
  suggestionSelected,
}) {
  function onTextChanged(event) {
    setImageName(event.currentTarget.value);
    if (imageName === 0) {
      setSuggestions([]);
    } else {
      const regex = new RegExp(`^${imageName}`, 'i');
      const currentSuggestions = templateList.filter((template) =>
        regex.test(template.name),
      );
      setSuggestions(currentSuggestions);
    }
  }

  return (
    <div>
      <DropdownWrapper>
        <Label htmlFor="image-type-meme">Image</Label>
        <Input
          id="image-type-meme"
          value={imageName}
          onChange={(event) => onTextChanged(event)}
        />

        {suggestions.length > 0 && (
          <Dropdown>
            {suggestions.map((suggestion) => (
              <DropdownList key={suggestion.id}>
                <DropdownOption onClick={() => suggestionSelected(suggestion)}>
                  {suggestion.name}
                </DropdownOption>
              </DropdownList>
            ))}
          </Dropdown>
        )}
      </DropdownWrapper>
    </div>
  );
}

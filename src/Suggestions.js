import { useState } from 'react';
import {
  Dropdown,
  DropdownList,
  DropdownOption,
  DropdownPosition,
  Input,
  InputWrapper,
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
  const [isFocus, setIsFocus] = useState(false);

  function onTextChanged(event) {
    const searchString = event.currentTarget.value;
    setImageName(searchString);

    // the autocomplete was lagging behind by one character
    // the problem was that I used 'searchString' instead of 'searchString.length'
    if (searchString.length === 0) {
      setSuggestions(templateList);
    } else {
      const regex = new RegExp(`^${searchString}`, 'i');
      const currentSuggestions = templateList.filter((template) =>
        regex.test(template.name),
      );
      setSuggestions(currentSuggestions);
    }
  }

  function handleFocus() {
    setIsFocus(true);
    setSuggestions(templateList);
  }

  return (
    <div>
      <InputWrapper>
        <Label htmlFor="image-type-meme">Image</Label>
        <Input
          id="image-type-meme"
          value={imageName}
          onFocus={() => handleFocus(true)}
          onChange={(event) => onTextChanged(event)}
        />

        {isFocus && (
          <DropdownPosition>
            <Dropdown>
              {suggestions.map((suggestion) => (
                <DropdownList key={suggestion.id}>
                  <DropdownOption
                    onClick={() => {
                      suggestionSelected(suggestion);
                      setIsFocus(false);
                    }}
                  >
                    {suggestion.name}
                  </DropdownOption>
                </DropdownList>
              ))}
            </Dropdown>
          </DropdownPosition>
        )}
      </InputWrapper>
    </div>
  );
}

import './App.css';
import { useState } from 'react';
import {
  AppStyle,
  Button,
  Form,
  HeaderOne,
  Image,
  ImageWrapper,
  Input,
  InputWrapper,
  Label,
  Main,
  PreviewImage,
  PreviewWrapper,
  Section,
} from './EmotionStyles';
import { Suggestions } from './Suggestions';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [imagePreviewIsSelected, setImagePreviewIsSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [memeIsSelected, setMemeIsSelected] = useState(false);
  const [meme, setMeme] = useState('');

  // I was passing only id to getMeme() and tried to get imageName from state,
  // but this was not working for the first name I selected, it was always an empty string
  // now I'm getting the name directly from the suggestion and it works.
  // Would be interesting to know why this empty string is happening and all further ones are ok.

  function getMeme(id, name) {
    // console.log(name);
    if (name && topText && bottomText) {
      setMeme(
        `https://api.memegen.link/images/${id}/${topText}%2F${bottomText}.png`,
      );
      setImagePreviewIsSelected(false);
      setMemeIsSelected(true);
    } else if (name) {
      // console.log(name);
      setImagePreview(`https://api.memegen.link/images/${id}.png`);
      setMemeIsSelected(false);
      setImagePreviewIsSelected(true);
    } else {
      // console.log(name);
      alert('Please choose an image and two lines of meme text.');
    }
  }

  function suggestionSelected(suggestion) {
    // console.log(JSON.stringify(suggestion));
    setImage(suggestion);
    setImageName(suggestion.name);
    setSuggestions([]);
    getMeme(suggestion.id, suggestion.name);
  }

  return (
    <AppStyle>
      <HeaderOne>Meme Generator</HeaderOne>
      <Main>
        <Section>
          <Form>
            <InputWrapper>
              <Label htmlFor="top-text-meme">Top text</Label>
              <Input
                id="top-text-meme"
                value={topText}
                onChange={(event) => setTopText(event.currentTarget.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="bottom-text-meme">Bottom text</Label>
              <Input
                id="bottom-text-type-meme"
                value={bottomText}
                onChange={(event) => setBottomText(event.currentTarget.value)}
              />
            </InputWrapper>
            <Suggestions
              imageName={imageName}
              setImageName={setImageName}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              suggestionSelected={suggestionSelected}
            />
            {imagePreviewIsSelected && (
              <PreviewWrapper>
                <PreviewImage src={imagePreview} alt={imageName} />
              </PreviewWrapper>
            )}
            <div>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  getMeme(image.id, image.name);
                }}
              >
                Generate
              </Button>
              <Button>Download</Button>
            </div>
          </Form>
        </Section>
        <Section>
          {memeIsSelected && (
            <ImageWrapper>
              <Image src={meme} alt={imageName} />
            </ImageWrapper>
          )}
        </Section>
      </Main>
    </AppStyle>
  );
}

export default App;

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

  function getMeme(id) {
    if (imageName && topText && bottomText) {
      setMeme(
        `https://api.memegen.link/images/${id}/${topText}%2F${bottomText}.png`,
      );
      setImagePreviewIsSelected(false);
      setMemeIsSelected(true);
    } else if (imageName) {
      setImagePreview(`https://api.memegen.link/images/${id}.png`);
      setMemeIsSelected(false);
      setImagePreviewIsSelected(true);
    } else {
      console.log(id);
      console.log(JSON.stringify(image));
      alert(
        'Sorry, something went wrong. Please try again or call moral support.',
      );
    }
  }

  function suggestionSelected(suggestion) {
    console.log(JSON.stringify(suggestion));
    setImage(suggestion);
    setImageName(suggestion.name);
    setSuggestions([]);
    getMeme(suggestion.id);
  }

  function generateMeme() {
    if (image.id && topText && bottomText) {
      getMeme(image.id);
    } else {
      alert('Please choose image, top and bottom text!');
    }
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
              <Button onClick={generateMeme}>Generate</Button>
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

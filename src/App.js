import './App.css';
import { css } from '@emotion/react';
import { useState } from 'react';
import {
  AppStyle,
  Button,
  ButtontWrapper,
  Form,
  HeaderOne,
  HistoryImage,
  HistoryImageWrapper,
  HistoryItem,
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
  const [currentMeme, setCurrentMeme] = useState('');
  const [memeIsSelected, setMemeIsSelected] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIsSelected, setHistoryIsSelected] = useState(false);

  // I was passing only id to getMeme() and tried to get imageName from state,
  // but this was not working for the first name I selected, it was always an empty string
  // now I'm getting the name directly from the suggestion and it works.
  // Would be interesting to know why this empty string is happening and all further ones are ok.

  function getMeme(meme) {
    // console.log(name);
    if (meme.name && topText && bottomText) {
      meme.customLink = `https://api.memegen.link/images/${meme.id}/${topText}%2F${bottomText}.png`;
      const newHistory = [...history, meme];
      setHistory(newHistory);
      setCurrentMeme(meme);
      setImagePreviewIsSelected(false);
      setMemeIsSelected(true);
    } else if (meme.name) {
      // console.log(name);
      setImagePreview(`https://api.memegen.link/images/${meme.id}.png`);
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
    getMeme(suggestion);
  }

  return (
    <AppStyle>
      <HeaderOne>Meme Generator</HeaderOne>
      <Main>
        <Section width="calc(300px-2vw)">
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
            <ButtontWrapper>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  getMeme(image);
                }}
              >
                Generate
              </Button>
              <Button>Download</Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  setHistoryIsSelected((prev) => setHistoryIsSelected(!prev));
                }}
              >
                History
              </Button>
            </ButtontWrapper>
          </Form>
          {historyIsSelected && (
            <InputWrapper>
              <h3>History</h3>
              {history.map((item) => (
                <HistoryItem key={item.id}>
                  <HistoryImageWrapper>
                    <HistoryImage src={item.customLink} />
                  </HistoryImageWrapper>
                  {item.name}
                </HistoryItem>
              ))}
            </InputWrapper>
          )}
        </Section>
        <Section>
          {memeIsSelected && (
            <ImageWrapper>
              <Image src={currentMeme.customLink} alt={imageName} />
            </ImageWrapper>
          )}
        </Section>
      </Main>
    </AppStyle>
  );
}

export default App;

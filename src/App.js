import './App.css';
import { useEffect, useState } from 'react';
import {
  AppStyle,
  Button,
  ButtonWrapper,
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
  const baseURL = 'https://api.memegen.link/images/';
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [imagePreviewIsSelected, setImagePreviewIsSelected] = useState(false);
  const [currentMeme, setCurrentMeme] = useState('');
  const [memeIsSelected, setMemeIsSelected] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIsSelected, setHistoryIsSelected] = useState(false);

  function modifyTextString(text) {
    const modifiedText = text
      .replaceAll('?', '~q')
      .replaceAll('&', '~a')
      .replaceAll('%', '~p')
      .replaceAll('#', '~h')
      .replaceAll('/', '~s')
      .replaceAll('\\', '~b')
      .replaceAll('<', '~l')
      .replaceAll('>', '~g')
      .replaceAll('"', "''")
      .replaceAll('_', '__')
      .replaceAll('  ', '_')
      .replaceAll(' ', '_')
      .replaceAll('-', '--');
    return modifiedText;
  }

  // I was passing only id to getMeme() and tried to get imageName from state,
  // but this was not working for the first name I selected, it was always an empty string.
  // Now I'm getting the name directly from the suggestion and it works.
  // Would be interesting to know why this one empty string is happening and all further ones are ok.

  useEffect(() => {
    const savedHistory = localStorage.getItem('history');
    setHistory(JSON.parse(savedHistory) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  function generateMeme() {
    if (topText && bottomText) {
      const modTopText = modifyTextString(topText);
      const modBottomText = modifyTextString(bottomText);
      const customLink = `${baseURL}${image.id}/${modTopText}%2F${modBottomText}.png`;
      const meme = {
        ...image,
        topText: topText,
        bottomText: bottomText,
        customLink: customLink,
      };
      const isInHistory = history.some(
        (entry) => customLink === entry.customLink,
      );
      let newHistory;
      if (!isInHistory) {
        newHistory = [...history, meme];
        setHistory(newHistory);
      }
      setCurrentMeme(meme);
      setImagePreviewIsSelected(false);
      setMemeIsSelected(true);
    } else {
      alert('Please choose an image and two lines of meme text.');
    }
  }

  function generatePreview(preview) {
    setImagePreview(`${baseURL}${preview.id}.png`);
    setMemeIsSelected(false);
    setImagePreviewIsSelected(true);
  }

  async function downloadMeme() {
    const response = await fetch(currentMeme.customLink);
    const imageBlob = await response.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imageURL;

    link.download = currentMeme.customLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function suggestionSelected(suggestion) {
    setImage(suggestion);
    setImageName(suggestion.name);
    setSuggestions([]);
    generatePreview(suggestion);
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
            <ButtonWrapper>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  generateMeme();
                }}
              >
                Generate
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  downloadMeme();
                }}
              >
                Download
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  setHistoryIsSelected((prev) => setHistoryIsSelected(!prev));
                }}
              >
                History
              </Button>
            </ButtonWrapper>
          </Form>
          {historyIsSelected && (
            <InputWrapper>
              <h3>History</h3>
              {history.map((item) => (
                <HistoryItem
                  key={`${item.id}_${item.topText}_${item.bottomText}`}
                >
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

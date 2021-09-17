import './App.css';
import { useState } from 'react';
import {
  Button,
  Form,
  Image,
  ImageWrapper,
  Input,
  Label,
} from './EmotionStyles';
import { Suggestions } from './Suggestions';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageName, setImageName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [imageIsSelected, setImageIsSelected] = useState(false);
  const [templateLink, setTemplateLink] = useState('');
  const [memeLink, setMemeLink] = useState('');

  /*   async function getImage(imageToFetch) {
    try {
      fetch(`https://api.memegen.link/images/${image.id}.png`);
      setImage();
    } catch (error) {
      console.log(error);
    }
  } */

  function suggestionSelected(selectedImage) {
    setImageName(selectedImage.name);
    setSuggestions([]);
    setImageIsSelected(true);
    setTemplateLink(`https://api.memegen.link/images/${selectedImage.id}.png`);
    setMemeLink(
      `https://api.memegen.link/images/${selectedImage.id}/${topText}%2F${bottomText}.png`,
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meme Generator</h1>
        <Form>
          <Label htmlFor="top-text-meme">Top text</Label>
          <Input
            id="top-text-meme"
            value={topText}
            onChange={(event) => setTopText(event.currentTarget.value)}
          />
          <Suggestions
            imageName={imageName}
            setImageName={setImageName}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            suggestionSelected={suggestionSelected}
          />
          {imageIsSelected && topText === '' && bottomText === '' && (
            <ImageWrapper>
              <Image src={templateLink} alt={imageName} />
            </ImageWrapper>
          )}
          {imageIsSelected && topText && bottomText && (
            <ImageWrapper>
              <Image src={memeLink} alt={imageName} />
            </ImageWrapper>
          )}
          <Label htmlFor="bottom-text-meme">Bottom text</Label>
          <Input
            id="bottom-text-type-meme"
            value={bottomText}
            onChange={(event) => setBottomText(event.currentTarget.value)}
          />
        </Form>
        <Button>Download</Button>
      </header>
    </div>
  );
}

export default App;

import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function Buttons() {
  const history = useHistory();
  const [textCopy, setTextCopy] = useState(false);

  const shareButton = () => {
    const url = `http://localhost:3000${history.location.pathname}`;
    copy(url);
    setTextCopy(true);
    const time = 5000;
    setTimeout(() => setTextCopy(false), time);
  };

  return (
    <div>
      <button data-testid="share-btn" onClick={ shareButton }>
        <img alt="shareIcon" src={ shareIcon } />
      </button>
      <button data-testid="favorite-btn">
        <img alt="heartIcon" src={ whiteHeartIcon } />
      </button>
      {textCopy && (
        <Alert variant="success" onClose={ () => setTextCopy(false) } dismissible>
          <Alert.Heading>Link copied!</Alert.Heading>
        </Alert>)}
    </div>
  );
}

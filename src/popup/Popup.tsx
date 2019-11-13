import * as React from 'react';
import './Popup.scss';

interface AppProps { }

interface AppState { }

const App: React.FC = (props: AppProps) => {
    const [state, setState] = React.useState('hey');

    const handleOnClick = () => {
        const message = 'hey';

        chrome.extension.sendRequest({
            message
        })

    }

    return (
        <div className="popupContainer" onClick={handleOnClick}>
            {state}
        </div>
    )
}

export default App;
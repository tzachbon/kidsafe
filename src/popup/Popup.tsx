import * as React from 'react';
import './Popup.scss';
import { observer, useLocalStore } from 'mobx-react';
import { useChromeListener } from '../utils/chrome.util';
import { classNames } from '../utils/general.util';

interface AppProps { }

interface AppState { }

const App: React.FC = (props: AppProps) => {
    const { message, sendMessage } = useChromeListener('message');
    const state = useLocalStore(() => ({ value: '' }));
    const inputClasses = classNames('FieldWrapper', {
        full: !!state.value
    })


    const handleChange = (e: any) => {
        const { value } = e.target;
        state.value = value;
    }

    const onSubmit = () => {
        sendMessage(state.value)
    }

    return (
        <div className="popupContainer form-control-container" >
            {message && (
                <span>
                    Message:{message}
                </span>
            )}
            <span>
                {state.value}
            </span>
            <div className={inputClasses}>
                <input className={'input'} value={state.value} onChange={handleChange}></input>
                <label>Send Message</label>
            </div>
            <button className='Button Button-small Button-primary' onClick={onSubmit}>Send</button>
        </div>
    )
}

export default observer(App);
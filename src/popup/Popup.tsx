import { observer, useLocalStore } from 'mobx-react';
import * as React from 'react';
import Switch from "react-switch";
import { useChromeListener } from '../utils/chrome.util';
import './Popup.scss';
import { useChromeStorage } from '../utils/general.util';
interface AppProps { }

interface AppState { }

const App: React.FC = (props: AppProps) => {
    const { message, sendMessage } = useChromeListener('scan');
    const state = useLocalStore(() => ({ checked: false, init: false }));
    const { item, setItem, removeItem } = useChromeStorage('kidsafe_scan_web');


    React.useEffect(() => {
        const shouldScan = item;
        sendMessage(shouldScan);
        if (!state.init && typeof item === 'boolean') {
            state.checked = item;
        }
    }, [item]);


    React.useEffect(() => {
        setItem(state.checked);
        return () => {
            if (!state.checked) {
                removeItem();
            }
        }
    }, [state.checked])


    const handleChange = (checked: boolean) => {
        state.checked = checked;
        state.init = true;
    }

    return (
        <div className="popupContainer form-control-container" >
            <h1>Scan Website</h1>
            <span>value: {item}</span>
            <Switch
                checked={state.checked}
                onChange={handleChange}
                onColor={'#69bcff'}
                onHandleColor={'#2a9af5'}
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
            ></Switch>
        </div>
    )
}

export default observer(App);
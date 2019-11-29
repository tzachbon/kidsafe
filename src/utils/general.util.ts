
import { useState, useEffect } from 'react';
type ClassName = string | { [className: string]: boolean };

export const classNames = (...classes: Array<ClassName>) => {
    return classes.reduce<string>((pervious, current) => {
        if (typeof current === 'object') {
            Object.keys(current).forEach((key: string) => {
                const shouldAdd = current[key];
                if (shouldAdd) {
                    pervious += ` ${key}`
                }
            })
        }

        if (typeof current === 'string') {
            pervious += ` ${current}`
        }

        return pervious.trim();
    }, '')
}

export const useChromeStorage = (key: string) => {
    const [item, setItem] = useState(null);
    const storage = chrome.storage.sync;

    useEffect(() => {
        debugger;
        let unmounted = false;
        storage.get(key, (obj) => {
            if (!unmounted) {
                setItem(obj[key])
            }
        })

        return () => {
            unmounted = true;
        }
    }, [])

    const setLocalItem = <T = any>(value: T) => {
        storage.set({ [key]: value }, () => {
            setItem(value);
        });
    }

    const removeLocalItem = () => {
        storage.remove(key, () => {
            setItem(null);
        })
    }


    return { item, setItem: setLocalItem, removeItem: removeLocalItem };
}
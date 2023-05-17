import {useState} from 'react'
import { useCallback, useRef, useEffect } from 'react'
export const useStateWithCallBack=(initialState)=>{
    const [state, setState] = useState(initialState)
    const cbRef  = useRef(null);
    const updateState = useCallback((newState,cb)=>{
        cbRef.current = cb;
        setState((prev)=>{
            return typeof newState==='function' ?newState(prev) :newState
        })
    },[]) //dependency array
    useEffect(() => {
        if(cbRef.current){
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);

    return [state,updateState];
}




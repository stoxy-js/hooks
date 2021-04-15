import { add, read, remove, write, update, sub } from "@stoxy/core";
/**
 * key: key,
 * state?: state object
 * init?: true/false
 * persist? true/false
 *
 * Return object { state, remove, update, write }
 * */
export function useStoxy(React, props) {
    const key = props.key;

    const [state, setState] = React.useState(props.state);
    React.useEffect(() => setupState(props, setState), []);

    return {
        state: state,
        add: (data) => add(key, data),
        remove: (predicate) => remove(key, predicate),
        write: (data) => write(key, data),
        update: (delegate) => update(key, delegate),
    };
}

function setupState(props, setState) {
    if (typeof props.state === "undefined") return;

    if (props.init) {
        write(props.key, props.state);
    }
    sub(props.key, (event) => {
        updateState(event, props, setState);
    });
    // Read state ?
}

function updateState(event, props, setState) {
    const newStateObject = createNewStateObject(props, event);
    setState(newStateObject);
}

function createNewStateObject(props, event) {
    // TODO: Set only the properties we are observing
    const data = event.data;
    const initialState = props.state;

    const targetPropertyKey = event.key.replace(props.key, "");

    const propKeys = targetPropertyKey.split(".");
    let currentKey = propKeys.shift();
    let property = initialState;
    let initialStateProperty = initialState;

    // If the initial state is just the value, and not a nested object
    if (typeof initialState !== "object") {
        return data;
    }

    while (propKeys.length > 1) {
        currentKey = propKeys.shift();
        property = property[currentKey];
        initialStateProperty = property[currentKey];
    }


    // Check to not set keys not initialized in the initial state
    // TODO: Get these fixed and we should be guchi
    //
    // Get a reference of the old state and set properties as fit
    // Problem: How to get current state
    currentKey = propKeys.shift();

    if (typeof property[currentKey] !== "object" && typeof initialStateProperty !== "undefined") {
        property[currentKey] = data;
    }

    return data;
}

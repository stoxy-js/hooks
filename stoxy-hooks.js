import { persistKey, add, read, remove, write, update, sub } from "@stoxy/core";
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
    handleInitAndPersist(props, setState);
    sub(props.key, (event) => {
        updateState(event.data, props, setState);
    });
}

async function handleInitAndPersist(props, setState) {
    if (props.persist) {
        const topLevelKey = props.key.split(".")[0];
        persistKey(topLevelKey);
    }

    const savedState = await read(props.key);

    if (savedState) {
        updateState(savedState, props, setState);
    } else {
        if (props.init) {
            write(props.key, props.state);
        }
    }

}

function updateState(data, props, setState) {
    const newStateObject = createNewStateObject(props, data);
    setState(newStateObject);
}

function createNewStateObject(props, data) {
    // Data == Current state given my stoxy
    const initialState = props.state;

    if (typeof initialState !== "object") {
        return data;
    }

    // Strip away parts of state we aren't following for this component
    stripAwayNonFollowedProperties(data, initialState);
    return data;
}

/**
 * We don't want hooked objects to get more state than
 * they subscribed for, so we'll clean up the excess properties here
 * before setting the state
 * */
function stripAwayNonFollowedProperties(data, initialState) {
    const keys = Object.keys(data);
    const initialKeys = Object.keys(initialState);

    for (const key of keys) {
        // If the key was not set in the initial state object, we delete it
        // from this instance of the state
        if (!initialKeys.includes(key)) {
            delete data[key];
        }

        const dataAtKey = data[key];
        // Iterate through nested state objects to clear them out too
        if (typeof dataAtKey === "object" && !Array.isArray(dataAtKey)) {
            stripAwayNonFollowedProperties(data[key], initialState[key]);
        }
    }
}

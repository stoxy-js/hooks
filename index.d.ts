import { WriteResult } from "@stoxy/core";

/**
 * Properties informing how to handle the Stoxy state for given object
 */
export interface UseStoxyProperties {
    /**
     * Stoxy key to attach to
     */
    key: string;

    /**
     * Initial state to set to object
     *
     * Only fields declared here are observed
     */
    state?: any;

    /**
     * Initialize global state with properties declared in the 'state' property.
     *
     * Defaults to false
     */
    init?: boolean;

    /**
     * Declares if the state key should be persisted or not
     *
     * Defaults to false
     */
    persist?: boolean;
}

export interface UseStoxyCallbacks {
    /**
     * State data of given Stoxy key. Updates on write
     */
    state: any;

    /**
     * Add an element to the state object array by key.
     *
     * If no state atom for key is set, an empty array is initialized before adding object.
     *
     * Returns a promise, with the write result
     *
     * @param {any} value  Value of the state object to add
     * @returns {Promise<WriteResult>}
     */
    add: (data: any) => Promise<WriteResult>;
    /**
     * Remove object(s) from a state object using a predicate.
     *
     * Allows for removing one of multiple objects from the state object without having to read the object data manually.
     *
     * @param {Function} predicate  Predicate function by which the objects are removed
     * @returns {Promise<WriteResult>}
     */
    remove: (predicate: Function) => Promise<WriteResult>;
    /**
     * Write the state object by key
     * Writes onto the state object given a key and a value
     *
     * Returns a promise, with the write result
     *
     * @param {any} value  Value of the state object to write
     * @returns {Promise<WriteResult>}
     */
    write: (data: any) => Promise<WriteResult>;

    /**
     * Update state without having to manually read the state object
     *
     * @param {Function} delegate  Delegate function to update the state by
     * @returns {Promise<WriteResult>}
     */
    update: (delegate: Function) => Promise<WriteResult>;

    /**
     * Find object(s) from a state object using a predicate.
     *
     * Allows the developer to find items with a given predicate from a collection of items
     *
     * @param {Function} predicate     Predicate function by which the objects are filtered
     * @returns {Promise<Array<any>>}
     */
    where: (predicate: Function) => Promise<Array<any>>;
}

/**
 * Attach object to Stoxy State. Can be used to modify the state, react to state
 * or both.
 *
 * @param {any} React                   React instance (aquired from import React from 'react'; or similiar)
 * @param {UseStoxyProperties} props    Properties for useStoxy
 */
export function useStoxy(React, props): UseStoxyCallbacks;

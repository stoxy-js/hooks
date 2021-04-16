import { useStoxy } from "@stoxy/hooks";
import * as preact from "preact/hooks";
import { SubElement } from "./SubElement";

export function ShoppingList() {

    const { state } = useStoxy(preact, {
        key: "memo",
        state: {
            shoppingList: [],
            todoItems: [],
            achievement: "",
            foo: {
                bar: "barrr",
                baz: {
                    bin: "Binnn",
                    counter: 0
                }
            }
        },
        init: true,
        persist: true
    })

    const { state: counterState } = useStoxy(preact, {
        key: "memo.foo.baz.counter",
        state: 0
    });

    function shoppingListItems() {
        const listItems = state.shoppingList.map(item => <li key={item.id}>{item.name}</li>);
        return <ul>{listItems}</ul>
    }

    return (
        <div>
            <label>Shopping List</label>
            {shoppingListItems()}
            <p>Counter: {state.foo.baz.counter}</p>
            <p>Counter: {counterState}</p>
            <p>{state.achievement}</p>
            <SubElement />
        </div>
    );
}

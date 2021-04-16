import { useStoxy } from "@stoxy/hooks";
import React from "react";

export function Adder() {

    const { add: addToShoppinglist } = useStoxy(React, { key: "memo.shoppingList" })
    const { state: counterState, update: updateCounter } = useStoxy(React, {
        key: "memo.foo.baz.counter",
        state: 0
    });
    const { write: writeAchievement } = useStoxy(React, { key: "memo.achievement" });

    function addItem(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const itemName = formData.get("shopping-item");

        if (!itemName) return

        addToShoppinglist({ id: Date.now(), name: itemName });

        const inputField = document.querySelector("input[name='shopping-item']")
        inputField.value = "";
    }

    async function addCounter() {
        updateCounter(c => c += 1);
    }

    if (counterState >= 5) {
        writeAchievement("You have reached 5 clicks");
    }

    return (
        <form onSubmit={addItem}>
            <label>Add Item </label>
            <input type="text" name="shopping-item" />
            <input type="submit" value="Add" />
            <button onClick={addCounter} type="button">click</button>
        </form>
    );
}

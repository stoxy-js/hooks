import { useStoxy } from "@stoxy/hooks";
import * as preact from "preact/hooks";

export function Adder() {

    console.log(preact);

    const { add: addToShoppinglist } = useStoxy(preact, { key: "memo.shoppingList" })
    const { state: counterState, update: updateCounter } = useStoxy(preact, {
        key: "memo.foo.baz.counter",
        state: 0
    });
    const { write: writeAchievement } = useStoxy(preact, { key: "memo.achievement" });

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

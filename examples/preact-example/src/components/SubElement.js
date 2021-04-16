import { useStoxy } from "@stoxy/hooks";
import * as preact from "preact/hooks";

export function SubElement() {

    const { state: foobar } = useStoxy(preact, {
        key: "memo.foo.bar",
        state: ""
    });

    console.log("Updated", foobar);
    return (
        <input type="text" defaultValue={foobar} />
    );
}

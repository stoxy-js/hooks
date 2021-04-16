import { useStoxy } from "@stoxy/hooks";
import React from "react";

export function SubElement() {

    const { state: foobar } = useStoxy(React, {
        key: "memo.foo.bar",
        state: ""
    });

    console.log("Updated", foobar);
    return (
        <input type="text" defaultValue={foobar} />
    );
}

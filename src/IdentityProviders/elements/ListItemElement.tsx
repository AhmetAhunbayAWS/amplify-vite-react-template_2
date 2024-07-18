
import { ListItemElement } from "../baseElements"
import React from "react"
// export function ListItemElement({children}:{children?: React.ReactNode}) : JSX.Element {
//     return (
//         <li>
//             { children }
//         </li>
//     )
// }

export const ListItemControlElement : typeof ListItemElement = React.forwardRef(
    function ListItemControlElement({
        children,
        ...props
    }, ref) {
        return (
            <ListItemElement ref={ref} {...props} >
                {children}
            </ListItemElement>
        )
    }
)
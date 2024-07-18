
import { ListElement } from '../baseElements';
import React from 'react';

// export function GetProviderContext() : IdentityProvidersConfig {
//     const context = useContext(IdentityProvidersContext)
//     if (!context) {
//         throw new Error('IdentityProvidersContext is not defined');
//     }
//     return context
// }


// export function ListElement({children}: {children?: React.ReactNode}): JSX.Element {

//     const providers = useProviderData()

//     if (providers.length === 0) {
//         // @ts-ignore
//         return null;
//     }

//     //TODO: create new CSS class
//     return (
//         <ul>
//             {children}
//         </ul>
//     );
// }


export const ListControlElement : typeof ListElement = React.forwardRef(
    function ListControlElement({
        children,
        ...props
    }, ref ) {
        return (
            <ListElement ref = {ref} {...props}>
                {children}
            </ListElement>
        )
    }
)

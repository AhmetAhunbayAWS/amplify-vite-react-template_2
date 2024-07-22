
import { FederatedIdentityElements } from '../../context/elements/definitions';
import React from 'react';

const { List } = FederatedIdentityElements

export const ListControl : typeof List = React.forwardRef(
    function ListControlElement({
        children,
        ...props
    }, ref ) {
        return (
            <List ref = {ref} {...props}>
                {children}
            </List>
        )
    }
)
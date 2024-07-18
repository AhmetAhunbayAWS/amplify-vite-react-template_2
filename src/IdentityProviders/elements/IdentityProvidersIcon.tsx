import React from 'react';
import { useButtonContext } from './FederatedIdentityButton';
import { IconElement } from '../baseElements';

export const IdentityProvidersIcon : typeof IconElement = React.forwardRef(

    function IdentityProvidersIcon(
        {...props},
        ref
    ) {
        const providerData = useButtonContext()
        const Icon = providerData?.icon
        const hasProps = Object.keys(props).length > 0;

        if (!hasProps && React.isValidElement(Icon)){
                return <IconElement {...Icon.props} ref={ref}/>;
        }

        return <IconElement {...props} ref={ref}/>;
    }  
)
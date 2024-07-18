import React from "react"

export enum SupportedProviders {
    Amazon = 'amazon',
    Apple = 'apple' ,
    Facebook = 'facebook',
    Google = 'google'
}

interface ProviderData<T extends string> {
    /**
     * Display name for provider button
     */
    displayName?: string;
    /**
     *
     */
    icon?: React.ReactNode;
    /**
     * lookup key to map to configuration provider
     */
    providerName: T;
}

type ProviderType<K extends string> = ProviderData<K> | SupportedProviders;

type CustomProviderList = ProviderType<string>[];

export default CustomProviderList;
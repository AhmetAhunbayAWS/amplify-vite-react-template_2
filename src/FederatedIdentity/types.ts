export type socialProvidersUnion = 'amazon' | 'apple' | 'facebook' | 'google'

export const socialProviderList = [
    'amazon',
    'facebook',
    'apple',
    'google'
]

export interface ProviderData<T extends string = string> {
    displayName: string;
    icon: React.ReactNode;
    providerName: T;
}

export type ProviderType<K extends string = string> = ProviderData<K> | socialProvidersUnion;
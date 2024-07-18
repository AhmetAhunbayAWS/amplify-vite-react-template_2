import React from 'react';
import { SignInWithRedirectInput, signInWithRedirect } from 'aws-amplify/auth';

export type AuthProvider = 'Amazon' | 'Apple' | 'Facebook' | 'Google';

const DEFAULT_PROVIDERS: AuthProvider[] = [
  'Amazon',
  'Apple',
  'Facebook',
  'Google',
];

type ProviderConfig<T extends string = string> = {
  displayName: string;
  providerName: T;
  icon: React.ReactNode;
};

type ProviderData = {
  handleSignInWithRedirect?: (input: SignInWithRedirectInput) => Promise<void>;
  providers: ProviderConfig[];
};

type ProviderType<T extends string = string> = AuthProvider | ProviderConfig<T>;

const ProviderDataContext = React.createContext<ProviderData | undefined>(
  undefined
);

const convert = (_values: ProviderType[]): ProviderConfig[] => {
  return _values as unknown as ProviderConfig[];
};

const Provider = <T extends string = string>({
  providers,
  children,
  handleSignInWithRedirect,
}: {
  handleSignInWithRedirect?: (input: SignInWithRedirectInput) => Promise<void>;
  providers: ProviderType<T>[];
  children?: React.ReactNode;
}) => {
  const value = React.useMemo(
    () => ({
      handleSignInWithRedirect,
      providers: convert(providers),
    }),
    [handleSignInWithRedirect, providers]
  );

  return (
    <ProviderDataContext.Provider value={value}>
      {children}
    </ProviderDataContext.Provider>
  );
};

const useProviderData = (): ProviderData => {
  const context = React.useContext(ProviderDataContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};

const ButtonContext = React.createContext<ProviderConfig | undefined>(
  undefined
);

const useButton = (): ProviderConfig => {
  const context = React.useContext(ButtonContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};

const Button = ({
  children,
  provider,
}: {
  children?: React.ReactNode;
  provider: string;
}) => {
  const { providers } = useProviderData();
  const value = providers.find(({ providerName }) => providerName === provider);

  if (!value) {
    throw new Error();
  }

  return (
    <ButtonContext.Provider value={value}>
      <button
        onClick={() => {
          const input: SignInWithRedirectInput = DEFAULT_PROVIDERS.some(
            (key) => key === value.providerName
          )
            ? { provider: value.providerName as AuthProvider }
            : { provider: { custom: value.providerName } };
          signInWithRedirect(input);
        }}
      >
        {children ?? value.providerName}
      </button>
    </ButtonContext.Provider>
  );
};

const Icon = () => {
  const { icon } = useButton();
  return icon;
};

const ButtonGroup = ({ children }: { children?: React.ReactNode }) => {
  const { providers } = useProviderData();

  return (
    <div>
      {children ??
        providers.map((value) => (
          <Button key={value.providerName} provider={value.providerName}>
            <Icon />
            {value.providerName}
          </Button>
        ))}
    </div>
  );
};

interface IdentityProviders <T extends string = string > {
    ButtonGroup: typeof ButtonGroup;
    Button: typeof Button;
    // Button.Icon = Icon;
}

const IdentityProviders = ({
  children,
  ...props
}: {
  providers: ProviderType[];
  children?: React.ReactNode;
  handleSignInWithRedirect?: (input: SignInWithRedirectInput) => Promise<void>;
}) => {
  return <Provider {...props}>{children ?? <ButtonGroup />}</Provider>;
};

<IdentityProviders providers={['Amazon']} />;

// IdentityProviders.ButtonGroup = ButtonGroup;
// IdentityProviders.Button = Button;
// IdentityProviders.Button.Icon = Icon;

{
  /* <IdentityProviders providers={['Facebook']}>
  <IdentityProviders.ButtonGroup>
    <IdentityProviders.Button />
  </IdentityProviders.ButtonGroup>
</IdentityProviders>; */
}
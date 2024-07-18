```mermaid
sequenceDiagram
    participant EndUser
    box Customer Code
    participant Client App
    participant Gateway Component
    participant Client Profile
    end
    box Auth Resources
    participant Authenticator Component
    participant IdentityProviders Component
    end
    participant JS Library
    EndUser->>Client App: [1] End user visits host app
    Client App->> Gateway Component: [2] Render gateway component
    Gateway Component->>Authenticator Component: [3] Render Authenticator component
    Authenticator Component->>IdentityProviders Component: [4] Render IdentityProviders component
    EndUser->>IdentityProviders Component: [5] Click on 'Sign In with Okta' button
    IdentityProviders Component-->>JS Library: [6] signInWithRedirect() function called
    Note right of Cognito: Customer must have configured<br> Okta client in backend
    JS Library->>Cognito: [7] openAuthSession() function called
    Cognito->>Okta Client: [8] Request Authorization from provider client
    Okta Client->>Cognito: [9] Returns auth/identity token
    Cognito->>JS Library: [10] Return a success
    JS Library->>Authenticator Component: [11] Dispatch 'signedIn' Hub Event on 'auth' channel
    Authenticator Component->> Gateway Component: [12] Unmount Authenticator
    Gateway Component->>Client Profile: [13] Render profile resource
```
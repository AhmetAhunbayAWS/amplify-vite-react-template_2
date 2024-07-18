import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button, View, Flex } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { VisuallyHidden } from '@aws-amplify/ui-react';
import { FederatedSignIn } from './FederatedSignIn';
import { SupportedProviders } from '../CustomProviderFiles/CustomProvider';
import { useCallback } from 'react';

function useFormHandlers(): {
    handleBlur: (event: React.FocusEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLFormElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  } {
    const { submitForm, updateBlur, updateForm } = useAuthenticator((context) => [
      context.submitForm,
      context.updateBlur,
      context.updateForm,
    ]);
  
    const handleBlur = useCallback(
      ({ target: { name } }: React.FocusEvent<HTMLFormElement>) => {
        updateBlur({ name });
      },
      [updateBlur]
    );
  
    // @TODO: align multiple input type handling with react docs example for 3.0 release
    // example: https://reactjs.org/docs/forms.html#handling-multiple-inputs
    const handleChange = useCallback(
      ({
        target: { checked, name, type, value },
      }: React.ChangeEvent<HTMLFormElement>) => {
        const isUncheckedCheckbox = type === 'checkbox' && !checked;
        updateForm({
          name,
          value: isUncheckedCheckbox ? undefined : (value as string),
        });
      },
      [updateForm]
    );
  
    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitForm(getFormDataFromEvent(event));
      },
      [submitForm]
    );
  
    return { handleBlur, handleChange, handleSubmit };
  }
  interface FormFieldOptions {
    /** Will hide the label above the input if set to true */
    labelHidden?: boolean;
    /** Label text */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /**
     * @deprecated For internal use only, please use `isRequired` instead.
     */
    required?: boolean;
    /** Whether this field is required for submission */
    isRequired?: boolean;
    /** Default dial code value */
    dialCode?: string;
    /** TOTP issuer to be used in the QR setup */
    totpIssuer?: string;
    /** TOTP username to be used in the QR */
    totpUsername?: string;
    /** List of dial codes you want to show in phone number field */
    dialCodeList?: Array<string>;
    /** Integer that denotes where this field should be positioned in. */
    order?: number;
    /** Desired HTML input type */
    type?: string;
    /** Desired autocomplete HTML attribute */
    autocomplete?: string;
    /** Whether the first character is auto-capitalized */
    autocapitalize?: string;
}

  export interface FormFieldProps extends Omit<FormFieldOptions, 'label'> {
    // label is a required prop for the UI field components used in FormField
    label: string;
    name: string;
  }
  


const { getSignInText, getSigningInText, getForgotPasswordText } =
  authenticatorTextUtil;

export function MySignIn(): JSX.Element {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const Header = MySignIn.Header
  const Footer = MySignIn.Footer
  console.log("this ONe")

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
        data-amplify-authenticator-signin=""
        method="post"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <FederatedSignIn socialProviders={[SupportedProviders.Amazon, SupportedProviders.Apple, SupportedProviders.Google, SupportedProviders.Facebook]}/>
        <Flex direction="column">
          <Flex as="fieldset" direction="column" isDisabled={isPending}>
            <VisuallyHidden>
              <legend>{getSignInText()}</legend>
            </VisuallyHidden>
          </Flex>

          <Button
            isDisabled={isPending}
            isFullWidth
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={getSigningInText()}
          >
            {getSignInText()}
          </Button>
        </Flex>
      </form>
      <Footer />
    </View>
  );
}

const DefaultFooter = () => {
  const { toForgotPassword } = useAuthenticator((context) => [
    context.toForgotPassword,
  ]);

  return (
    <View data-amplify-footer="">
      <Button
        fontWeight="normal"
        onClick={toForgotPassword}
        size="small"
        variation="link"
      >
        {getForgotPasswordText()}
      </Button>
    </View>
  );
};

MySignIn.Footer = DefaultFooter;
MySignIn.Header = function Header(): JSX.Element {
  // @ts-ignore
  return null;
};

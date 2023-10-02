'use client';

import { useForm } from 'react-hook-form';
import { signInFormValidationSchema, SignInFormValue } from './utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { Control, Form, InputPassword, InputText } from '@/shared/Form';
import { Button } from '@/shared/Button';
import { SignInProps } from './types';
import { firebaseClientApp } from '@/firebase-client';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { tailwindConfig } from '@/configs';

const auth = getAuth(firebaseClientApp);

export function SignIn({ className }: SignInProps) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<SignInFormValue>({
    mode: 'onBlur',
    resolver: yupResolver(signInFormValidationSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (document.documentElement.clientWidth < tailwindConfig.screens.lg) {
      router.replace('/');
    }
  }, []);

  const onSubmit = async () => {
    const { email, password } = getValues();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (e: any) {
      setError('email', { message: '' });
      setError('password', { message: 'Incorrect credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className={className}
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Control
        label="Email"
        error={errors.email}
      >
        <InputText
          control={control}
          name="email"
        />
      </Control>
      <Control
        label="Pasword"
        error={errors.password}
      >
        <InputPassword
          control={control}
          name="password"
        />
      </Control>

      <Button
        className="w-full"
        size="lg"
        type="submit"
        loading={loading}
      >
        Sign In
      </Button>
    </Form>
  );
}

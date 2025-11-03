'use client';

import { AuthForm } from '@/components/auth/auth-form';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export default function LoginPage() {
  const { signInWithEmail, error, isPending } = useAuth();

  return (
    <div className="container grid h-[calc(100vh-4rem)] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center space-x-2">
            Minal Enterprises
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              “The attention to detail is incredible. Our new packaging has
              never looked better.”
            </p>
            <footer className="text-sm">Ayesha Khan, Wedding Planner</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to sign in.
            </p>
          </div>
          <AuthForm
            onSubmit={signInWithEmail}
            isPending={isPending}
            error={error}
            buttonText="Sign In"
          />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

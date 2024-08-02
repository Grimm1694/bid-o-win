'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setError(null); // Reset error state
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false, // Prevents automatic redirection
    });
    if (signInData?.error) {
      toast({
        title: 'Error',
        description: 'Ooops! something went wrong, please try again later',
        variant: 'destructive',
      });
    } else {
      if (typeof window !== 'undefined') {
        window.location.reload();
        window.location.href = '/admin';
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#023D54',
      }}
    >
      <div
        style={{
          width: '380px',
          padding: '40px',
          height: '400px',
          backgroundColor: '#02968A',
          color: 'green',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ffff66]">Email</FormLabel>
                  <FormControl>
                    <Input placeholder='mail@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ffff66]">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full mt-6 bg-[#FFFD8D] hover:bg-[#94DEA5] text-[#02968A]' type='submit'>
              Sign in
            </Button>
          </form>
        </Form>
        <div className='mx-auto my-4 flex w-full text-[#ffff66] items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          or
        </div>
        <Button className='w-full bg-[#FFFD8D] hover:bg-[#94DEA8] text-[#02968A]'>Sign in with Google</Button>
        <p className='text-center text-sm text-[#023D80]'>
          If you don&apos;t have an account, please&nbsp;
          <Link className='text-[#ffff66] hover:underline' href='/sign-up'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
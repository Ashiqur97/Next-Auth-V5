"use client";

import * as z from "zod";
import { startTransition} from "react";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterSchema } from "@/schemas";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

const RegisterForm = () => {
  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");
  const [isPending,setTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name:""
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess(""); 


    startTransition(() => {
    register(values)
    .then((data) => {
      setError(data.error);
      setSuccess(data.success);
    });
  });

  }
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">

          <FormField name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field}
                    type="name"
                    placeholder="jone doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field}
                    type="email"
                    placeholder="jone.doe@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field}
                    type="password"
                    placeholder="******"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full">
            Create an account 
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;
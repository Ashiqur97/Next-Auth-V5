"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {CardWrapper} from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });
    return ( 
        <CardWrapper
            headerLabel="Welcome Back!"
            backButtonLabel="Don't have an account"
            backButtonHref="/auth/register"
            showSocial
        >
            Login Form!
        </CardWrapper>
     );
}
 
export default LoginForm;
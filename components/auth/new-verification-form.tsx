"use client";

import {CardWrapper} from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import { useCallback,useEffect } from "react";
import { newVerification } from "@/actions/new-verification";

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        console.log(token);

        if(!token) return;
        
        newVerification(token);
    },[token]);

    useEffect(() => {
        onSubmit();
    },[token]);

    return (
        <CardWrapper
            headerLabel="Confirm your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                <BeatLoader />
            </div>
        </CardWrapper>
    )
}

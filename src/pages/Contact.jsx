import { useRef } from "react";
import CardWrapper from "@/components/CardWrapper";
import ContactPage from "@/components/form/contactPage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFormError } from "@/context/formContext";

export default function Contact() {
    const handleSubmitRef = useRef(null);
    const handleBackRef = useRef(null);
    const { hasErrors } = useFormError();

    return (
        <div className="flex flex-col w-full max-w-[701px]">
            <CardWrapper>
                <ContactPage 
                    onSubmitForm={(handler) => (handleSubmitRef.current = handler)}
                    onBack={(handler) => (handleBackRef.current = handler)}
                />
            </CardWrapper>
            <div className=" grid grid-cols-2 mx-11">
                <Button
                    className={`w-full leftb ${hasErrors ? '!bg-red-500 hover:!bg-red-600 !text-white' : 'text-black'}`}
                    onClick={() => handleBackRef.current?.()}
                    type="button"
                >
                    Back
                </Button>
                <Button
                    className={`w-full rightb ${hasErrors ? '!bg-red-500 hover:!bg-red-600 !text-white' : 'bg-amber-50 text-black'}`}
                    onClick={() => handleSubmitRef.current?.()}
                    type="button"
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}


import { useRef } from "react";
import CardWrapper from "@/components/CardWrapper";
import PackagePage from "@/components/form/packagePage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFormError } from "@/context/formContext";

export default function Package() {
    const handleNextRef = useRef(null);
    const handleBackRef = useRef(null);
    const { hasErrors } = useFormError();

    return (
        <div className="flex flex-col w-full max-w-[701px] ">
            <CardWrapper>
                <PackagePage 
                    onNext={(handler) => (handleNextRef.current = handler)}
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
                    className={`w-full rightb ${hasErrors ? '!bg-red-500 hover:!bg-red-600 !text-white' : 'text-black'}`}
                    onClick={() => handleNextRef.current?.()}
                    type="button"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}


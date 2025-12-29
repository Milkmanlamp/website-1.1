import { useEffect, useLayoutEffect, useState } from "react";
import project from "@/schema/project";
import { Controller, useForm } from "react-hook-form";
import formSchema from "@/schema/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useFormError } from "@/context/formContext";

const Contact = ({ onSubmitForm, onBack }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { setHasErrors } = useFormError();

  const step4Schema = formSchema.pick({
    contact: true,
  });
  const form = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      contact: "",
    },
  });
  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem("contact") || "{}");
    if (storedData.contact) {
      form.setValue("contact", storedData.contact);
    }
  }, [form]);
  const onSubmit = async (data) => {
    localStorage.setItem("contact", JSON.stringify(data));
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    const personal = JSON.parse(localStorage.getItem("personal"));
    const packages = JSON.parse(localStorage.getItem("package"));
    const formData = {
      firstName: personal.firstName,
      lastName: personal.lastName,
      email: personal.email,
      phone: personal.phone,
      type: jobs.type,
      description: jobs.description,
      package: packages.package,
      addons: packages.addons,
      contact: data.contact,
    };
    const checkedFormData = project.parse(formData)
    if(!checkedFormData){
      return (
          console.log("Didnt work, schema failed")
      )
    }

    try {
      await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkedFormData),
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    }
    localStorage.clear();
    form.reset()
    
    // Show confirmation drawer
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const backBtn = () => {
    navigate('/job')
  };

  useEffect(() => {
    if (onSubmitForm) {
      onSubmitForm(form.handleSubmit(onSubmit));
    }
    if (onBack) {
      onBack(backBtn);
    }
  }, [onSubmitForm, onBack, form]);

  useLayoutEffect(() => {
    const hasFormErrors = Object.keys(form.formState.errors).length > 0;
    setHasErrors(hasFormErrors);
  }, [form.formState.errors, setHasErrors]);

  return (
    <>
      <CardContent className="thing2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FieldGroup>
              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col items-center w-full">
                    <FieldLabel htmlFor="contact" className='mb-8 text-xl text-center !w-full !flex !justify-center'>
                      How do we contact you?
                    </FieldLabel>
                    <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        className="flex justify-center gap-12 mb-8"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="phone" id="phone" />
                        <label htmlFor="phone" className="cursor-pointer text-lg">
                          Phone
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="email" id="email" />
                        <label htmlFor="email" className="cursor-pointer text-lg">
                          Email
                        </label>
                      </div>
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-center w-full" />
                    )}
                    <FieldDescription className="text-center text-sm">
                      How do you want us to contact you
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </form>
      </CardContent>

      <Drawer open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DrawerContent>
          <button
            onClick={handleConfirmationClose}
            className="drawer-close-btn absolute top-4 right-4 text-foreground hover:text-primary transition-colors text-5xl font-bold leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-3xl mb-4">
              Thanks for your time!
            </DrawerTitle>
            <DrawerDescription className="text-xl text-foreground">
              We will contact you <span className="text-primary">within a day</span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-6"></div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Contact;


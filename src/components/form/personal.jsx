import { useEffect, useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import formSchema from "@/schema/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFormError } from "@/context/formContext";

const Personal = ({ onNext, onBack }) => {
  const navigate = useNavigate();
  const { setHasErrors } = useFormError();
  const stepOneSchema = formSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  });

  const form = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("personal") || "{}");
    if (storedData.firstName) {
      form.setValue("firstName", storedData.firstName);
    }
    if (storedData.lastName) {
      form.setValue("lastName", storedData.lastName);
    }
    if (storedData.email) {
      form.setValue("email", storedData.email);
    }
    if (storedData.phone) {
      form.setValue("phone", storedData.phone);
    }
  }, [form]);
  const onSubmit = (data) => {
    localStorage.setItem("personal", JSON.stringify(data));
    console.log(localStorage.getItem("personal"));
    navigate("/package");
  };

  const backBtn = () => {
    navigate("/");
  };

  useEffect(() => {
    if (onNext) {
      onNext(form.handleSubmit(onSubmit));
    }
    if (onBack) {
      onBack(backBtn);
    }
  }, [onNext, onBack, form]);

  useLayoutEffect(() => {
    const hasFormErrors = Object.keys(form.formState.errors).length > 0;
    setHasErrors(hasFormErrors);
  }, [form.formState.errors, setHasErrors]);

  return (
    <CardContent className="thing2">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  {...field}
                  id="firstName"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  {...field}
                  id="lastName"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </form>
    </CardContent>
  );
};

export default Personal;


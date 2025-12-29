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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useFormError } from "@/context/formContext";

const Learn = ({ onNext, onBack }) => {
  const navigate = useNavigate();
  const { setHasErrors } = useFormError();
  const stepTwoSchema = formSchema.pick({
    type: true,
    description: true,
  });
  const form = useForm({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      type: "",
      description: "",
    },
  });
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("jobs") || "{}");
    if (storedData.description) {
      form.setValue("description", storedData.description);
    }
    if (storedData.type) {
      form.setValue("type", storedData.type);
    }
  }, [form]);
  const onSubmit = (data) => {
    localStorage.setItem("jobs", JSON.stringify(data));
    console.log(data);
    navigate("/contact");
  };
  const backBtn = () => {
    navigate("/package");
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
    <CardContent className="thing">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FieldGroup>
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="type">Type of job</FieldLabel>
                  <Input
                    {...field}
                    id="type"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    What type of business do you run?
                  </FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    Description of job
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="description"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/50 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include information about what a user will do on your
                    website. min 50 Characters
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      </form>
    </CardContent>
  );
};

export default Learn;


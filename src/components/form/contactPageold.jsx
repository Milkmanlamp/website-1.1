import project from "@/schema/project";
import { Controller, useForm } from "react-hook-form";
import formSchema from "@/schema/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

const Contact = () => {
  const navigate = useNavigate();

  const step4Schema = formSchema.pick({
    contact: true,
  });
  const form = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      contact: "",
    },
  });

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
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkedFormData),
      });

      const result = await response.json();


      console.log('Form submitted successfully!');

      console.log(result);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      localStorage.clear();
      form.reset()
      navigate("/")
    }
    localStorage.clear();
    form.reset()
    navigate("/")
  };
  const backBtn = () => {
    navigate("/job");
  };
  return (
    <CardContent className="thing2">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-1 space-y-6">
          <FieldGroup>
            <Controller
              name="contact"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact">
                    How do we contact you?
                  </FieldLabel>
                  <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      className="flex justify-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <label htmlFor="phone" className="cursor-pointer">
                        Phone
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <label htmlFor="email" className="cursor-pointer">
                        Email
                      </label>
                    </div>
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    How do you want use to contact you
                  </FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
          <Button
            className="bg-amber-50 text-black"
            onClick={backBtn}
            type="button"
          >
            Back
          </Button>
          <Button className="bg-amber-50 text-black" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </CardContent>
  );
};

export default Contact;


import { useEffect, useLayoutEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useFormError } from "@/context/formContext";

const Package = ({ onNext, onBack }) => {
  const navigate = useNavigate();
  const [showPackageInfo, setShowPackageInfo] = useState(false);
  const { setHasErrors } = useFormError();
  
  const stepThreeSchema = formSchema.pick({
    package: true,
    addons: true,
  });
  const form = useForm({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      package: "",
      addons: "",
    },
  });
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("package") || "{}");
    if (storedData.package) {
      form.setValue("package", storedData.package);
    }
    if (storedData.addons) {
      form.setValue("addons", storedData.addons);
    }
  }, [form]);
  const onSubmit = (data) => {
    localStorage.setItem("package", JSON.stringify(data));
    console.log(data);
    navigate("/job");
  };
  const backBtn = () => {
    navigate("/personal");
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
    <>
      <CardContent className="thing">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FieldGroup>
            <Controller
              name="package"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2 mb-2">
                    <FieldLabel>Package</FieldLabel>
                    <button
                      type="button"
                      onClick={() => setShowPackageInfo(true)}
                      className="inline-flex items-center mx-2 justify-center w-6 h-6 rounded-full border-2 border-primary text-black hover:bg-amber-50 hover:text-black transition-colors text-lg font-bold"
                      aria-label="Package information"
                    >
                      !
                    </button>
                  </div>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Basic" id="basic" />
                      <label htmlFor="basic" className="cursor-pointer">
                        Basic - 1200$
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Large" id="large" />
                      <label htmlFor="large" className="cursor-pointer">
                        Large - 3000$
                      </label>
                    </div>
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    Select your preferred package.
                  </FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="addons"
              control={form.control}
              render={({ field, fieldState }) => {
                const addonOptions = [
                  "Professional Product Photography",
                  "Website Hosting",
                    "3D Animation"
                ];
                const selectedAddons = field.value
                  ? field.value.split(",").filter(Boolean)
                  : [];

                const handleCheckboxChange = (addon, checked) => {
                  const newAddons = checked
                    ? [...selectedAddons, addon]
                    : selectedAddons.filter((item) => item !== addon);
                  field.onChange(newAddons.join(","));
                };
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Addons</FieldLabel>
                    <div className="space-y-3">
                      {addonOptions.map((addon) => (
                        <div key={addon} className="flex items-center space-x-2">
                          <Checkbox
                            id={addon}
                            checked={selectedAddons.includes(addon)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(addon, checked)
                            }
                            aria-invalid={fieldState.invalid}
                          />
                          <label htmlFor={addon} className="cursor-pointer">
                            {addon}
                          </label>
                        </div>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <FieldDescription>
                      Select additional features for your package.
                    </FieldDescription>
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </div>
      </form>
    </CardContent>

    <Drawer open={showPackageInfo} onOpenChange={setShowPackageInfo}>
      <DrawerContent className="max-h-[85vh]">
          <button
            onClick={() => setShowPackageInfo(false)}
            className="drawer-close-btn absolute top-4 right-4 text-primary transition-colors text-5xl font-bold leading-none z-10"
            aria-label="Close"
          >
          ×
        </button>
        <DrawerHeader className="text-center flex-shrink-0">
          <DrawerTitle className="text-2xl mb-2">We keep things simple with <span className="text-primary">Two Choices</span></DrawerTitle>
        </DrawerHeader>
        <div className="px-4 md:px-8 pb-8 mt-4 overflow-y-auto overflow-x-hidden flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          
            {/* Basic Package Card */}
            <button
              type="button"
              onClick={() => {
                form.setValue("package", "Basic");
                setShowPackageInfo(false);
              }}
              className={`package-card ${form.watch("package") === "Basic" ? "package-card-selected" : ""}`}
            >
              <div className="package-card-header">
                <h3 className="text-2xl font-bold mb-1">Basic</h3>
                <p className="text-3xl font-bold text-primary">$1200</p>
              </div>
              <div className="package-card-divider"></div>
              <ul className="package-card-list">
                <li>• 5 Pages</li>
                <li>• Contact form</li>
                <li>• 3 Month of Free support</li>
                <li>• UX / Design Consultation</li>
              </ul>
            </button>

            {/* Large Package Card */}
            <button
              type="button"
              onClick={() => {
                form.setValue("package", "Large");
                setShowPackageInfo(false);
              }}
              className={`package-card ${form.watch("package") === "Large" ? "package-card-selected" : ""}`}
            >
              <div className="package-card-header">
                <h3 className="text-2xl font-bold mb-1">Large</h3>
                <p className="text-3xl font-bold text-primary">$3000</p>
              </div>
              <div className="package-card-divider"></div>
              <div className="package-card-list">
                <p className="text-sm opacity-80 mb-2">Everything in Basic +</p>
                <ul>
                  <li>• Online store functionality</li>
                  <li className="text-sm opacity-75">(&lt; 20 Product listings)</li>
                  <li>• Logins/User management</li>
                  <li className="text-sm opacity-75">(&lt; 5 Users)</li>
                </ul>
              </div>
            </button>
          </div>

          <p className="text-center text-sm italic mt-6 opacity-75">
            Need something more <span className="text-primary">custom</span>? Select Large and describe further in the next section
          </p>
        </div>
      </DrawerContent>
    </Drawer>
    </>
  );
};

export default Package;


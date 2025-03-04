import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const emergencySchema = z.object({
  emergencyContacts: z.array(
    z.object({
      name: z.string().min(1, "Contact name is required"),
      relationship: z.string().min(1, "Relationship is required"),
      phone: z.string().min(1, "Phone number is required"),
    })
  ).min(1, "At least one emergency contact is required"),
  bankingDetails: z.object({
    accountHolder: z.string().min(1, "Account holder name is required"),
    bankName: z.string().min(1, "Bank name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    branchCode: z.string().min(1, "Branch code is required"),
  }),
  invoiceTo: z.enum(["home", "office"]),
});

export type EmergencyFormData = z.infer<typeof emergencySchema>;

interface EmergencyFormProps {
  onSubmit: (data: EmergencyFormData) => void;
  defaultValues?: Partial<EmergencyFormData>;
  onBack: () => void;
}

export default function EmergencyForm({
  onSubmit,
  defaultValues,
  onBack,
}: EmergencyFormProps) {
  const form = useForm<EmergencyFormData>({
    resolver: zodResolver(emergencySchema),
    defaultValues: {
      emergencyContacts: defaultValues?.emergencyContacts || [
        {
          name: "",
          relationship: "",
          phone: "",
        },
      ],
      bankingDetails: defaultValues?.bankingDetails || {
        accountHolder: "",
        bankName: "",
        accountNumber: "",
        branchCode: "",
      },
      invoiceTo: defaultValues?.invoiceTo || "home",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emergencyContacts",
  });

  const handleSubmit = (data: EmergencyFormData) => {
    console.log("Emergency form submitting:", data);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Emergency Contacts</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Contact #{index + 1}</h4>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`emergencyContacts.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`emergencyContacts.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`emergencyContacts.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                name: "",
                relationship: "",
                phone: "",
              })
            }
            className="w-full"
          >
            Add Another Contact
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Banking Information</h3>

          <FormField
            control={form.control}
            name="invoiceTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send School Fee Invoices To</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="home" />
                      </FormControl>
                      <FormLabel className="font-normal">Home</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="office" />
                      </FormControl>
                      <FormLabel className="font-normal">Office</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bankingDetails.accountHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankingDetails.bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankingDetails.accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankingDetails.branchCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
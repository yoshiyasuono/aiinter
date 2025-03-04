import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

const medicalSchema = z.object({
  physicianDetails: z.object({
    name: z.string().min(1, "Doctor's name is required"),
    hospital: z.string().min(1, "Hospital name is required"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
  }),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
});

export type MedicalFormData = z.infer<typeof medicalSchema>;

interface MedicalFormProps {
  onSubmit: (data: MedicalFormData) => void;
  defaultValues?: Partial<MedicalFormData>;
  onBack: () => void;
}

export default function MedicalForm({
  onSubmit,
  defaultValues,
  onBack,
}: MedicalFormProps) {
  const form = useForm<MedicalFormData>({
    resolver: zodResolver(medicalSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Physician Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="physicianDetails.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor's Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="physicianDetails.hospital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital/Clinic Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="physicianDetails.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="physicianDetails.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Medical History</h3>
          <FormField
            control={form.control}
            name="medicalConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Medical Conditions (if any)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please list any medical conditions, disabilities, or special needs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Allergies (if any)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please list any allergies or dietary restrictions"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const termsSchema = z.object({
  termsAccepted: z.object({
    medical: z.boolean().refine((val) => val === true, {
      message: "You must agree to medical treatment permission",
    }),
    photo: z.boolean().refine((val) => val === true, {
      message: "You must agree to photo usage permission",
    }),
    fieldTrip: z.boolean().refine((val) => val === true, {
      message: "You must agree to field trip permission",
    }),
    policies: z.boolean().refine((val) => val === true, {
      message: "You must agree to school policies",
    }),
  }),
});

export type TermsFormData = z.infer<typeof termsSchema>;

interface TermsFormProps {
  onSubmit: (data: TermsFormData) => void;
  defaultValues?: Partial<TermsFormData>;
  onBack: () => void;
}

export default function TermsForm({
  onSubmit,
  defaultValues,
  onBack,
}: TermsFormProps) {
  const form = useForm<TermsFormData>({
    resolver: zodResolver(termsSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Terms & Agreements</h3>
            <p className="text-sm text-gray-600">
              Please read and agree to the following terms to complete your application
            </p>
          </div>

          <FormField
            control={form.control}
            name="termsAccepted.medical"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I authorize the school to provide emergency medical treatment
                    when necessary and appropriate
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted.photo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I grant permission for my child's photos to be used in school
                    publications and promotional materials
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted.fieldTrip"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I give permission for my child to participate in school field
                    trips and outdoor activities
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted.policies"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I have read and agree to abide by all school policies and
                    procedures
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Submit Application</Button>
        </div>
      </form>
    </Form>
  );
}

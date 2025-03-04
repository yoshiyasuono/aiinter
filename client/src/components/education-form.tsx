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

const educationSchema = z.object({
  previousSchools: z.array(
    z.object({
      name: z.string().min(1, "School name is required"),
      address: z.string().min(1, "Address is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().min(1, "End date is required"),
      grades: z.string().min(1, "Grades attended is required"),
      remarks: z.string().optional(),
    })
  ).min(1, "At least one previous school is required"),
});

export type EducationFormData = z.infer<typeof educationSchema>;

interface EducationFormProps {
  onSubmit: (data: EducationFormData) => void;
  defaultValues?: Partial<EducationFormData>;
  onBack: () => void;
}

export default function EducationForm({
  onSubmit,
  defaultValues,
  onBack,
}: EducationFormProps) {
  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: defaultValues || {
      previousSchools: [{}],
    },
  });

  const { fields, append, remove } = form.control._formValues.previousSchools;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Previous School #{index + 1}</h3>
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
                name={`previousSchools.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`previousSchools.${index}.address`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`previousSchools.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`previousSchools.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`previousSchools.${index}.grades`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grades Attended</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. 1st-3rd grade" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`previousSchools.${index}.remarks`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Remarks</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
          onClick={() => append({})}
          className="w-full"
        >
          Add Another School
        </Button>

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

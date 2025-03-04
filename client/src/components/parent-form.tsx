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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";

const parentSchema = z.object({
  parents: z.array(
    z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      relationship: z.string().min(1, "Relationship is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().min(1, "Phone number is required"),
      occupation: z.string().optional(),
      photo: z.string().optional(),
    })
  ).min(1, "At least one parent/guardian is required"),
});

export type ParentFormData = z.infer<typeof parentSchema>;

interface ParentFormProps {
  onSubmit: (data: ParentFormData) => void;
  defaultValues?: Partial<ParentFormData>;
  onBack: () => void;
}

export default function ParentForm({
  onSubmit,
  defaultValues,
  onBack,
}: ParentFormProps) {
  console.log("ParentForm defaultValues:", defaultValues);

  const form = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      parents: defaultValues?.parents || [
        {
          firstName: "",
          lastName: "",
          relationship: "",
          email: "",
          phone: "",
          occupation: "",
          photo: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parents",
  });

  console.log("ParentForm fields:", fields);

  const handleSubmit = (data: ParentFormData) => {
    console.log("Parent form submitting:", data);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Parent/Guardian #{index + 1}
              </h3>
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
                name={`parents.${index}.photo`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        {field.value ? (
                          <div className="relative w-32 h-32">
                            <img
                              src={field.value}
                              alt="Parent/Guardian photo"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-0 right-0 -mt-2 -mr-2"
                              onClick={() => field.onChange("")}
                            >
                              ×
                            </Button>
                          </div>
                        ) : (
                          <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    field.onChange(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              id={`photo-upload-${index}`}
                            />
                            <label
                              htmlFor={`photo-upload-${index}`}
                              className="cursor-pointer flex flex-col items-center"
                            >
                              <ImagePlus className="w-8 h-8 text-gray-400" />
                              <span className="text-sm text-gray-500 mt-2">Upload Photo</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`parents.${index}.firstName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`parents.${index}.lastName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`parents.${index}.relationship`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="guardian">Legal Guardian</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`parents.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`parents.${index}.phone`}
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
              <FormField
                control={form.control}
                name={`parents.${index}.occupation`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
              firstName: "",
              lastName: "",
              relationship: "",
              email: "",
              phone: "",
              occupation: "",
              photo: "",
            })
          }
          className="w-full"
        >
          Add Another Parent/Guardian
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
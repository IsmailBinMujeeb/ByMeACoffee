import { AppSidebar } from "@/components/app-sidebar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ButtonGroup } from "@/components/ui/button-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

export default function AddMenuPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const formSchema = z.object({
    itemName: z.string().min(2).max(100),
    price: z.string().min(0).max(10000),
    description: z.string().min(2).max(1000),
    imageUrl: z
      .instanceof(File)
      .refine((file) => file.size < 5_000_000, "Max image size is 5MB")
      .refine(
        (file) =>
          ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
            file.type,
          ),
        "Invalid image format",
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      price: 0,
      description: "",
      imageUrl: undefined,
    },
  });

  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("itemName", values.itemName);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("imageUrl", values.imageUrl);

    try {
      setIsCreating(true);
      const token = localStorage.getItem("access-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}menu-item/`,
        {
          method: "POST",
          headers,
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to create item: ${response.status}`);
      }

      toast.success("Add to menu");
    } catch (err) {
      console.error("Error creating item:", err);
      toast.error(
        err.message || "Something went wrong, Please try again later.",
      );
    } finally {
      setIsCreating(false);
    }
    console.log(values);
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
      className="dark text-zinc-50"
    >
      <Toaster />
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Add Menu Item" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-8 mx-auto my-4"
            encType="multipart/form-data"
          >
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl font-semibold">
                    Item Name
                  </FormLabel>
                  <FormControl>
                    <input
                      placeholder="Cappuccino..."
                      {...field}
                      className="p-2 border  rounded-md bg-input/30 border-input focus:outline-none focus:border-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl font-semibold">
                    Image
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-7xl rounded">
                      <label
                        for="dropzone-file"
                        className="flex rounded-xl flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full object-contain rounded-xl"
                          />
                        ) : (
                          <div className="flex flex-col items-center  justify-center text-body pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        )}
                        <input
                          id="dropzone-file"
                          name="imageUrl"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            field.onChange(file);
                            setPreview(URL.createObjectURL(file));
                          }}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl font-semibold">
                    Price
                  </FormLabel>
                  <FormControl>
                    <input
                      placeholder="What's the price?"
                      className="p-2 bg-input/30 border rounded-md focus:outline-none focus:border-zinc-500"
                      type="number"
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl font-semibold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A little description..."
                      className="w-7xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isCreating ? (
              <Button type="submit" disabled>
                <Spinner />
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            )}
          </form>
        </Form>{" "}
      </SidebarInset>
    </SidebarProvider>
  );
}

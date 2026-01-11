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
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

export default function EditMenuPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [preview, setPreview] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const formSchema = z.object({
    itemName: z.string().min(2).max(100),
    price: z.number().min(0).max(10000),
    description: z.string().min(2).max(1000),
    imageUrl: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => (file ? file.size < 5_000_000 : true),
        "Max image size is 5MB",
      )
      .refine(
        (file) =>
          file
            ? ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
                file.type,
              )
            : true,
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

  useEffect(() => {
    (async function () {
      try {
        const accessToken = localStorage.getItem(`access-token`);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}menu-item/${itemId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (!res.ok) {
          toast.error(
            `${res.statusText}: Something went wrong please try again.`,
          );
        }

        const data = await res.json();

        form.reset({
          itemName: data.item?.itemName,
          price: data.item?.price,
          description: data.item?.description,
          imageUrl: undefined,
        });

        setPreview(data.item?.imageUrl);
      } catch (error) {
        console.error("Error updating item:", error);
        toast.error(
          error.message || "Something went wrong, Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [itemId, form]);

  async function onSubmit(values) {
    const formData = new FormData();

    formData.append("itemName", values.itemName);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("imageUrl", values.imageUrl);

    try {
      setIsUpdating(true);
      const token = localStorage.getItem("access-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}menu-item/${itemId}`,
        {
          method: "PUT",
          headers,
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to create item: ${response.status}`);
      }

      toast.success("Updated successfuly");
    } catch (err) {
      console.error("Error updating item:", err);
      toast.error(
        err.message || "Something went wrong, Please try again later.",
      );
    } finally {
      setIsUpdating(false);
    }
    console.log(values);
  }

  if (isLoading) {
    return (
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
        className="dark text-zinc-50"
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Loading Data...</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
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
            {isUpdating ? (
              <Button type="submit" className="cursor-pointer" disabled>
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

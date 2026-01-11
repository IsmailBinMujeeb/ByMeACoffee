import { AppSidebar } from "@/components/app-sidebar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ButtonGroup } from "@/components/ui/button-group";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("access-token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch top items
        const topItemsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}menu-item/`,
          { headers },
        );

        if (!topItemsResponse.ok) {
          throw new Error(
            `Failed to fetch top items: ${topItemsResponse.status}`,
          );
        }

        const topItemsData = await topItemsResponse.json();
        setItems(topItemsData.data.docs);
        console.log(topItemsData.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  async function handleBuy(itemId, price) {
    try {
      const token = localStorage.getItem("access-token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}order/create`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ itemId, total: price, status: "complete" }),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to buy item: ${response.status}`);
      }

      toast.success("Item bought successfully!");
    } catch (err) {
      console.error("Error buying item:", err);
      toast.error(
        err.message || "Something went wrong, Please try again later.",
      );
    }
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
            <p className="text-muted-foreground">Loading Menu...</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (error) {
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
            <div className="text-center">
              <p className="text-destructive mb-2">Error loading analytics</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
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
        <SiteHeader title="Menu" />
        <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
          {items &&
            items.map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden transition hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle>{item.itemName}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                    <img
                      src={item.imageUrl}
                      alt={item.description}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </AspectRatio>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p>Price: ₹{item.price}</p>
                  <div className="flex gap-2 ">
                    <CardAction>
                      <ButtonGroup>
                        <Button
                          className="cursor-pointer"
                          variant={"outline"}
                          onClick={() => handleBuy(item._id, item.price)}
                        >
                          Buy
                        </Button>
                        <Button
                          className="cursor-pointer"
                          variant={"outline"}
                          onClick={() => navigate(`/menu/edit/${item._id}`)}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </CardAction>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { AppSidebar } from "@/components/app-sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { BadgeCheckIcon } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("access-token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const topItemsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}order/`,
          { headers },
        );

        if (!topItemsResponse.ok) {
          throw new Error(
            `Failed to fetch top items: ${topItemsResponse.status}`,
          );
        }

        const topItemsData = await topItemsResponse.json();
        setItems(topItemsData.orders);
        console.log(topItemsData);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

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
            <p className="text-muted-foreground">Loading analytics...</p>
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
        <SiteHeader title="Orders" />
        <div className="p-4">
          <Table>
            <TableCaption>A list of recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ordered By</TableHead>
                <TableHead>Ordered At</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items &&
                items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item.item?.itemName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-neutral-500 text-white dark:bg-neutral-600"
                      >
                        <BadgeCheckIcon />
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.createdBy?.email}</TableCell>
                    <TableCell>{dayjs(item.createdAt).fromNow()}</TableCell>
                    <TableCell className="text-right">₹{item.total}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  ₹{items.reduce((acc, item) => acc + item.total, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

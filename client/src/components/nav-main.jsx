import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export function NavMain({ items }) {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const path = window.location.pathname;
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 scroll-auto">
        <SidebarMenu>
          {items
            .filter((item) => item.roles?.includes(role))
            .map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`cursor-pointer ${path === item.path ? `bg-neutral-700 hover:bg-neutral-700` : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

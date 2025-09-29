import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Image,
  FileText,
  Package,
  MessageSquare,
  Mail,
  Info,
  Tags,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard, exact: true },
  { title: 'Collections', url: '/admin/collections', icon: Image },
  { title: 'Products', url: '/admin/products', icon: Package },
  { title: 'Blog Posts', url: '/admin/blog', icon: FileText },
  { title: 'Studio Info', url: '/admin/studio', icon: Info },
  { title: 'Categories', url: '/admin/categories', icon: Tags },
  { title: 'Contact Inquiries', url: '/admin/contacts', icon: MessageSquare },
  { title: 'Newsletter', url: '/admin/newsletter', icon: Mail },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string, exact = false) => {
    return isActive(path, exact) 
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
      : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground';
  };

  return (
    <Sidebar className={state === 'collapsed' ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Website Link */}
        <div className="p-4 border-b border-sidebar-border">
          <NavLink to="/" className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
            <Home size={16} />
            {state !== 'collapsed' && <span className="text-sm">Back to Website</span>}
          </NavLink>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Content Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url, item.exact)}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== 'collapsed' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
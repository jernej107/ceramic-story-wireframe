import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Image, 
  FileText, 
  Package, 
  MessageSquare, 
  Mail, 
  Info,
  Tags,
  Plus 
} from 'lucide-react';
import { useCollections } from '@/hooks/useCollections';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { collections } = useCollections();
  const { posts } = useBlogPosts(false); // Get all posts including unpublished

  const stats = [
    {
      title: 'Collections',
      value: collections.length,
      icon: Image,
      href: '/admin/collections',
      color: 'text-blue-600',
    },
    {
      title: 'Products',
      value: '0', // You can add a products hook later
      icon: Package,
      href: '/admin/products',
      color: 'text-green-600',
    },
    {
      title: 'Blog Posts',
      value: posts.length,
      icon: FileText,
      href: '/admin/blog',
      color: 'text-purple-600',
    },
    {
      title: 'Categories',
      value: '0', // You can add categories count
      icon: Tags,
      href: '/admin/categories',
      color: 'text-orange-600',
    },
  ];

  const quickActions = [
    {
      title: 'Create Collection',
      description: 'Add a new ceramic collection',
      icon: Image,
      href: '/admin/collections/new',
      color: 'text-blue-600',
    },
    {
      title: 'Write Blog Post',
      description: 'Create a new journal entry',
      icon: FileText,
      href: '/admin/blog/new',
      color: 'text-purple-600',
    },
    {
      title: 'Add Product',
      description: 'List a new ceramic piece',
      icon: Package,
      href: '/admin/products/new',
      color: 'text-green-600',
    },
    {
      title: 'Update Studio Info',
      description: 'Edit studio information',
      icon: Info,
      href: '/admin/studio',
      color: 'text-indigo-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-display">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your content management dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(stat.href)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4 font-display">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(action.href)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      {action.title}
                    </CardTitle>
                    <CardDescription>
                      {action.description}
                    </CardDescription>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4 font-display">Management Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/contacts')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-amber-600" />
                Contact Inquiries
              </CardTitle>
              <CardDescription>
                View and manage customer inquiries
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/newsletter')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-teal-600" />
                Newsletter Subscribers
              </CardTitle>
              <CardDescription>
                Manage your email subscriber list
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
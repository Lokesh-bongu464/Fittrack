import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Mail } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Get Started" },
};

export const Secondary: Story = {
  args: { children: "Learn More", variant: "secondary" },
};

export const Outline: Story = {
  args: { children: "Cancel", variant: "outline" },
};

export const Destructive: Story = {
  args: { children: "Delete Account", variant: "destructive" },
};

export const Ghost: Story = {
  args: { children: "Ghost Action", variant: "ghost" },
};

export const Link: Story = {
  args: { children: "View Details", variant: "link" },
};

export const Large: Story = {
  args: { children: "Start Free Trial", size: "lg" },
};

export const Small: Story = {
  args: { children: "Save", size: "sm" },
};

export const WithIcon: Story = {
  render: () => (
    <Button className="gap-2">
      Continue <ArrowRight className="h-4 w-4" />
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Creating Account...
    </Button>
  ),
};

export const IconButton: Story = {
  render: () => (
    <Button variant="outline" size="icon">
      <Mail className="h-4 w-4" />
    </Button>
  ),
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

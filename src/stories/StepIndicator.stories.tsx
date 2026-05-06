import type { Meta, StoryObj } from "@storybook/react";
import StepIndicator from "@/components/auth/StepIndicator";

const meta: Meta<typeof StepIndicator> = {
  title: "Auth/StepIndicator",
  component: StepIndicator,
  tags: ["autodocs"],
  argTypes: {
    currentStep: { control: { type: "range", min: 1, max: 5, step: 1 } },
    totalSteps: { control: { type: "number", min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof StepIndicator>;

export const Step1: Story = {
  args: { currentStep: 1, totalSteps: 5 },
};

export const Step3: Story = {
  args: { currentStep: 3, totalSteps: 5 },
};

export const Step5: Story = {
  args: { currentStep: 5, totalSteps: 5 },
};

export const AllSteps: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step}>
          <p className="text-sm text-muted-foreground mb-2">Step {step} of 5</p>
          <StepIndicator currentStep={step} totalSteps={5} />
        </div>
      ))}
    </div>
  ),
};

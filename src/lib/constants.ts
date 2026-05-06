export const features = [
  {
    icon: "Dumbbell",
    title: "Workout Tracking",
    description:
      "Log exercises, sets, and reps. Track your progress over time with detailed workout history.",
  },
  {
    icon: "Utensils",
    title: "Nutrition Plans",
    description:
      "Get personalized meal plans and track your daily calorie and macro intake effortlessly.",
  },
  {
    icon: "BarChart3",
    title: "Progress Analytics",
    description:
      "Visualize your fitness journey with beautiful charts and insights that keep you motivated.",
  },
  {
    icon: "Users",
    title: "Community",
    description:
      "Connect with like-minded fitness enthusiasts. Share tips, celebrate wins, and stay accountable.",
  },
];

export const steps = [
  {
    number: 1,
    icon: "UserPlus",
    title: "Create Your Account",
    description: "Sign up for free in seconds. No credit card required.",
  },
  {
    number: 2,
    icon: "Target",
    title: "Set Your Goals",
    description:
      "Tell us about your fitness goals and we'll create a personalized plan.",
  },
  {
    number: 3,
    icon: "TrendingUp",
    title: "Track & Achieve",
    description:
      "Follow your plan, log workouts, and watch your progress soar.",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Lost 15kg in 6 months",
    rating: 5,
    quote:
      "FitTrack completely changed my approach to fitness. The workout tracking is intuitive and the progress analytics keep me motivated every single day.",
    avatar: "SJ",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Marcus Chen",
    role: "Marathon Runner",
    rating: 5,
    quote:
      "As a competitive runner, I need detailed analytics. FitTrack gives me everything I need to optimize my training and hit my personal bests.",
    avatar: "MC",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Yoga Instructor",
    rating: 5,
    quote:
      "I recommend FitTrack to all my students. The flexibility tracking and community features are unlike anything else out there.",
    avatar: "ER",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Kim",
    role: "Built 10kg muscle",
    rating: 4,
    quote:
      "The nutrition plans paired with workout tracking helped me gain muscle efficiently. The progress photos feature is incredibly motivating.",
    avatar: "DK",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Lisa Thompson",
    role: "Busy Mom of 3",
    rating: 5,
    quote:
      "As a working mom, I needed something quick and efficient. FitTrack's 20-minute workout plans fit perfectly into my schedule.",
    avatar: "LT",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    name: "James Wilson",
    role: "Former Couch Potato",
    rating: 5,
    quote:
      "I went from zero exercise to running 5K in just 3 months. The streak tracking kept me accountable when I wanted to quit.",
    avatar: "JW",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Personal Trainer",
    rating: 5,
    quote:
      "I use FitTrack with all my clients. The progress tracking and goal-setting features make it so much easier to keep everyone on track.",
    avatar: "PS",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    name: "Alex Turner",
    role: "CrossFit Enthusiast",
    rating: 5,
    quote:
      "The community feature is what sets FitTrack apart. I've connected with so many people who push me to be better every day.",
    avatar: "AT",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Maria Santos",
    role: "Nutritionist",
    rating: 5,
    quote:
      "The meal planning and nutrition tracking integration is phenomenal. My clients love how easy it is to log everything in one place.",
    avatar: "MS",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: 0,
    period: "month",
    description: "Perfect for getting started",
    features: [
      { text: "Basic workout tracking", included: true },
      { text: "5 exercises per workout", included: true },
      { text: "Weekly progress summary", included: true },
      { text: "Community access", included: true },
      { text: "Custom workout plans", included: false },
      { text: "Nutrition tracking", included: false },
      { text: "Advanced analytics", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 9.99,
    period: "month",
    description: "For serious fitness enthusiasts",
    features: [
      { text: "Everything in Free", included: true },
      { text: "Unlimited exercises", included: true },
      { text: "Custom workout plans", included: true },
      { text: "Nutrition tracking & meal plans", included: true },
      { text: "Advanced analytics & charts", included: true },
      { text: "Goal setting & tracking", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Elite",
    price: 19.99,
    period: "month",
    description: "The ultimate fitness experience",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Personal trainer access", included: true },
      { text: "Custom meal plans by nutritionist", included: true },
      { text: "1-on-1 coaching sessions", included: true },
      { text: "Exclusive community groups", included: true },
      { text: "Early access to new features", included: true },
      { text: "Dedicated support", included: true },
    ],
    cta: "Go Elite",
    popular: false,
  },
];

export const fitnessGoals = [
  { id: "lose-weight", label: "Lose Weight", icon: "Flame" },
  { id: "build-muscle", label: "Build Muscle", icon: "Dumbbell" },
  { id: "stay-active", label: "Stay Active", icon: "Activity" },
  {
    id: "improve-flexibility",
    label: "Improve Flexibility",
    icon: "StretchHorizontal",
  },
  { id: "eat-healthier", label: "Eat Healthier", icon: "Apple" },
  { id: "reduce-stress", label: "Reduce Stress", icon: "Brain" },
];

export const activityLevels = [
  {
    id: "sedentary",
    icon: "Monitor",
    title: "Sedentary",
    description: "Little to no exercise, desk job",
  },
  {
    id: "lightly-active",
    icon: "Footprints",
    title: "Lightly Active",
    description: "Light exercise 1-2 times per week",
  },
  {
    id: "moderately-active",
    icon: "Bike",
    title: "Moderately Active",
    description: "Moderate exercise 3-4 times per week",
  },
  {
    id: "very-active",
    icon: "Zap",
    title: "Very Active",
    description: "Intense exercise 5+ times per week",
  },
  {
    id: "athlete",
    icon: "Trophy",
    title: "Athlete",
    description: "Professional or competitive training",
  },
];

export const dashboardStats = [
  {
    icon: "Flame",
    iconColor: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
    label: "Calories Burned",
    value: "1,248",
    trend: { value: 12, positive: true, label: "from last week" },
  },
  {
    icon: "Dumbbell",
    iconColor: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    label: "Workouts This Week",
    value: "4",
    trend: { value: 1, positive: true, label: "from last week" },
  },
  {
    icon: "Zap",
    iconColor: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
    label: "Day Streak",
    value: "12",
    trend: { value: 0, positive: true, label: "Personal best!" },
  },
  {
    icon: "Target",
    iconColor: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    label: "Goal Progress",
    value: "68%",
    trend: { value: 5, positive: true, label: "this week" },
  },
];

export const todayWorkout = {
  name: "Upper Body Strength",
  exercises: [
    { id: 1, name: "Bench Press", sets: "3 x 12", completed: false },
    { id: 2, name: "Overhead Press", sets: "3 x 10", completed: false },
    { id: 3, name: "Dumbbell Rows", sets: "3 x 12", completed: true },
    { id: 4, name: "Bicep Curls", sets: "3 x 15", completed: false },
    { id: 5, name: "Tricep Dips", sets: "3 x 12", completed: true },
    { id: 6, name: "Plank", sets: "3 x 60s", completed: true },
  ],
};

export const weeklyActivity = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 60 },
  { day: "Wed", minutes: 0 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 75 },
  { day: "Sat", minutes: 50 },
  { day: "Sun", minutes: 20 },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#" },
    { label: "Integrations", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
    { label: "Licenses", href: "#" },
  ],
};

export const socialLinks = [
  { platform: "Twitter", href: "#" },
  { platform: "Instagram", href: "#" },
  { platform: "Facebook", href: "#" },
  { platform: "LinkedIn", href: "#" },
  { platform: "YouTube", href: "#" },
];

export const sidebarNavItems = [
  { icon: "LayoutDashboard", label: "Dashboard", href: "/dashboard", active: true },
  { icon: "Dumbbell", label: "Workouts", href: "#", active: false },
  { icon: "Utensils", label: "Nutrition", href: "#", active: false },
  { icon: "TrendingUp", label: "Progress", href: "#", active: false },
  { icon: "Users", label: "Community", href: "#", active: false },
  { icon: "Settings", label: "Settings", href: "#", active: false },
];

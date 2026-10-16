import { Sparkles, BookOpen, Users, Award, GraduationCap } from "lucide-react";

// Special Featured Program: Play Group
export const featuredProgram = {
  id: 1,
  title: "Play Group",
  age: "Ages 4 - 5 Years",
  description: "An interactive introduction to school life through sensory play, rhymes, social interaction, and basic motor skill development.",
  icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400" />,
  bg: "bg-emerald-50 dark:bg-emerald-950/20",
  border: "border-emerald-200 dark:border-emerald-900/50",
  gradient: "from-emerald-50 via-teal-50 to-emerald-100/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border-2 border-emerald-400/80 dark:border-emerald-500/50",
  features: ["Sensory & Motor Play", "Basic Speech & Rhymes", "Safe Socialization"],
};

// Remaining 6 Academic Classes
export const programs = [
  {
    id: 2,
    title: "Nursery",
    age: "Ages 5 - 6 Years",
    description: "Focusing on early literacy, pre-math concepts, alphabet recognition, and creative expression through colors and crafts.",
    icon: <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-amber-600 dark:text-amber-400" />,
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900/50",
    gradient: "from-amber-500/10 to-amber-500/5 border-amber-200 dark:border-amber-900/50",
    features: ["Alphabet & Number Intro", "Art & Craft Sessions", "Interactive Storytelling"],
  },
  {
    id: 3,
    title: "Class One",
    age: "Ages 6 - 7 Years",
    description: "Building confidence in reading, writing simple sentences, basic arithmetic, and encouraging curiosity through science exploration.",
    icon: <Users className="w-5 h-5 sm:w-7 sm:h-7 text-sky-600 dark:text-sky-400" />,
    bg: "bg-sky-50 dark:bg-sky-950/20",
    border: "border-sky-200 dark:border-sky-900/50",
    gradient: "from-sky-500/10 to-sky-500/5 border-sky-200 dark:border-sky-900/50",
    features: ["Reading & Writing Basics", "Basic Math & Logic", "Science Discovery Labs"],
  },
  {
    id: 4,
    title: "Class Two",
    age: "Ages 7 - 8 Years",
    description: "Expanding core academic subjects with creative thinking, vocabulary building, problem-solving, and team activities.",
    icon: <Award className="w-5 h-5 sm:w-7 sm:h-7 text-rose-600 dark:text-rose-400" />,
    bg: "bg-rose-50 dark:bg-rose-950/20",
    border: "border-rose-200 dark:border-rose-900/50",
    gradient: "from-rose-500/10 to-rose-500/5 border-rose-200 dark:border-rose-900/50",
    features: ["Expanded Vocabulary", "Group Problem Solving", "Creative Writing"],
  },
  {
    id: 5,
    title: "Class Three",
    age: "Ages 8 - 9 Years",
    description: "Introducing advanced mathematical operations, independent study habits, reading comprehension, and analytical thinking.",
    icon: <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />,
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    border: "border-indigo-200 dark:border-indigo-900/50",
    gradient: "from-indigo-500/10 to-indigo-500/5 border-indigo-200 dark:border-indigo-900/50",
    features: ["Advanced Arithmetic", "Reading Comprehension", "Independent Study Skills"],
  },
  {
    id: 6,
    title: "Class Four",
    age: "Ages 9 - 10 Years",
    description: "Strengthening core concepts in science, mathematics, and social studies while fostering leadership and collaboration.",
    icon: <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-teal-600 dark:text-teal-400" />,
    bg: "bg-teal-50 dark:bg-teal-950/20",
    border: "border-teal-200 dark:border-teal-900/50",
    gradient: "from-teal-500/10 to-teal-500/5 border-teal-200 dark:border-teal-900/50",
    features: ["Science Projects", "Social Studies & Ethics", "Leadership & Teamwork"],
  },
  {
    id: 7,
    title: "Class Five",
    age: "Ages 10 - 11 Years",
    description: "Comprehensive primary education preparation ensuring a seamless transition to middle school with academic excellence.",
    icon: <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-purple-600 dark:text-purple-400" />,
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-900/50",
    gradient: "from-purple-500/10 to-purple-500/5 border-purple-200 dark:border-purple-900/50",
    features: ["Primary Graduation Prep", "Critical Thinking Labs", "Advanced Problem Solving"],
  },
];

export const curriculumHighlights = [
  {
    title: "Play-Based & Structured Learning",
    description: "We blend fun interactive learning with academic foundation so children grow naturally without pressure.",
    icon: Sparkles,
  },
  {
    title: "Experienced Educators",
    description: "Caring, trained, and certified teachers who provide personalized attention and emotional safety.",
    icon: Users,
  },
  {
    title: "Moral & Ethical Values",
    description: "Teaching kindness, respect, honesty, and discipline alongside academic success.",
    icon: Award,
  },
  {
    title: "Interactive Classrooms",
    description: "Equipped with modern visual aids, storytelling corners, and engaging learning toolkits.",
    icon: BookOpen,
  },
];

export default programs;
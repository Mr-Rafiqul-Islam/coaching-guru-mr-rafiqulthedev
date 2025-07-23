export const PracticeOption = [
  {
    name: "Quizz",
    image: require("../assets/images/quizz.png"),
  },
  {
    name: "Flashcards",
    image: require("../assets/images/flashcard.png"),
  },
  {
    name: "Question & Ans",
    image: require("../assets/images/notes.png"),
  },
];

export const imageAssets = {
  "/banner1.png": require("../assets/images/banner1.png"),
  "/banner2.png": require("../assets/images/banner2.png"),
  "/banner3.png": require("../assets/images/banner3.png"),
  "/banner4.png": require("../assets/images/banner4.png"),
  "/banner5.png": require("../assets/images/banner5.png"),
  "/banner6.png": require("../assets/images/banner6.png"),
};

export const courseCategory = [
  "Tech & Coding",
  "Business & Finance",
  "Health & Fitness",
  "Science & Engineering",
  "Arts & Creativity",
];

export const profileMenu = [
  {
    name: "Add Course",
    icon: "add-outline", //Iconinc Icon
    path: "/addCourse",
  },
  {
    name: "My Course",
    icon: "book",
    path: "/home",
  },
  {
    name: "Course Progress",
    icon: "analytics-outline",
    path: "/progress",
  },
  {
    name: "My Subscription",
    icon: "shield-checkmark",
    path: "/home",
  },
  {
    name: "Logout",
    icon: "log-out",
    path: "/sign-in",
  },
];

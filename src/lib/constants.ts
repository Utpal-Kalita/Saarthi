export const PHQ9_QUESTIONS = [
  {
    question: "Little interest or pleasure in doing things",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Feeling down, depressed, or hopeless",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Trouble falling or staying asleep, or sleeping too much",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Feeling tired or having little energy",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Poor appetite or overeating",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Trouble concentrating on things, such as reading the newspaper or watching television",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Thoughts that you would be better off dead or of hurting yourself in some way",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
];

export const getPhq9Interpretation = (score: number) => {
  if (score >= 0 && score <= 4) {
    return {
      severity: "Minimal depression",
      suggestion: "Your score suggests you may have minimal or no symptoms of depression. Continue to monitor your mood. If you have any concerns, consider talking to a friend, family member, or a professional.",
    };
  }
  if (score >= 5 && score <= 9) {
    return {
      severity: "Mild depression",
      suggestion: "Your score suggests you may have mild symptoms of depression. Lifestyle changes like exercise, a healthy diet, and mindfulness can be helpful. Consider speaking with a healthcare professional to discuss your symptoms.",
    };
  }
  if (score >= 10 && score <= 14) {
    return {
      severity: "Moderate depression",
      suggestion: "Your score suggests you may have moderate symptoms of depression. It is recommended to consult with a doctor or mental health professional for further evaluation and to discuss potential treatment options like therapy or medication.",
    };
  }
  if (score >= 15 && score <= 19) {
    return {
      severity: "Moderately severe depression",
      suggestion: "Your score suggests you may have moderately severe symptoms of depression. It is highly recommended that you seek help from a mental health professional soon. They can provide you with an effective treatment plan.",
    };
  }
  if (score >= 20 && score <= 27) {
    return {
      severity: "Severe depression",
      suggestion: "Your score suggests you may have severe symptoms of depression. It is very important to seek professional help immediately. Please contact a mental health provider, a crisis line, or go to the nearest emergency room.",
    };
  }
  return {
    severity: "Invalid score",
    suggestion: "Could not calculate a valid score. Please complete the assessment.",
  };
};

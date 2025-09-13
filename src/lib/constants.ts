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


export const IAT_QUESTIONS = [
  {
    question: "How often do you find that you stay online longer than you intended?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you neglect household chores to spend more time online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you prefer the excitement of the Internet to intimacy with your partner?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you form new relationships with fellow online users?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do others in your life complain to you about the amount of time you spend online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do your grades or school work suffer because of the amount of time you spend online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you check your e-mail before something else that you need to do?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often does your job performance or productivity suffer because of the Internet?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you become defensive or secretive when anyone asks you what you do online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you block out disturbing thoughts about your life with soothing thoughts of the Internet?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you find yourself anticipating when you will go online again?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you fear that life without the Internet would be boring, empty, and joyless?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you snap, yell, or act annoyed if someone bothers you while you are online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you lose sleep due to late-night log-ins?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you feel preoccupied with the Internet when off-line, or fantasize about being online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you find yourself saying \"just a few more minutes\" when online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you try to cut down the amount of time you spend online and fail?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you try to hide how long you've been online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you choose to spend more time online over going out with others?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
  {
    question: "How often do you feel depressed, moody, or nervous when you are off-line, which goes away once you are back online?",
    options: ["Does not Apply", "Rarely", "Occasionally", "Frequently", "Often", "Always"],
  },
];


export const getIatInterpretation = (score: number) => {
  if (score >= 0 && score <= 30) {
    return {
      severity: "Normal range of internet usage",
      suggestion: "Your internet usage seems to be in a normal range. You appear to have good control over your online habits.",
    };
  }
  if (score >= 31 && score <= 49) {
    return {
      severity: "Mild level of internet addiction",
      suggestion: "You may be experiencing occasional or frequent problems because of the Internet. You should consider its full impact on your life and may want to think about setting usage limits.",
    };
  }
  if (score >= 50 && score <= 79) {
    return {
      severity: "Moderate level of internet addiction",
      suggestion: "Your internet usage is causing significant problems in your life. You should evaluate the impact of the Internet on your life and address the problems directly caused by your Internet usage. Seeking professional help is recommended.",
    };
  }
  if (score >= 80 && score <= 100) {
    return {
      severity: "Severe level of internet addiction",
      suggestion: "Your Internet usage is causing serious problems in your life. It is crucial that you address this issue. It is highly recommended that you seek help from a qualified therapist who specializes in internet addiction.",
    };
  }
  return {
    severity: "Invalid score",
    suggestion: "Could not calculate a valid score. Please complete the assessment.",
  };
};


export const SDQ_QUESTIONS = [
    // Emotional Symptoms
    { question: "I get a lot of headaches, stomach-aches or sickness", type: 'emotional', scoreReverse: false },
    { question: "I worry a lot", type: 'emotional', scoreReverse: false },
    { question: "I am often unhappy, down-hearted or tearful", type: 'emotional', scoreReverse: false },
    { question: "I am nervous in new situations, I easily lose confidence", type: 'emotional', scoreReverse: false },
    { question: "I have many fears, I am easily scared", type: 'emotional', scoreReverse: false },

    // Conduct Problems
    { question: "I get very angry and often lose my temper", type: 'conduct', scoreReverse: false },
    { question: "I am generally obedient, I usually do what adults request", type: 'conduct', scoreReverse: true },
    { question: "I fight a lot. I can make other people do what I want", type: 'conduct', scoreReverse: false },
    { question: "I am often accused of lying or cheating", type: 'conduct', scoreReverse: false },
    { question: "I take things that are not mine from home, school or elsewhere", type: 'conduct', scoreReverse: false },

    // Hyperactivity/Inattention
    { question: "I am restless, I can't stay still for long", type: 'hyperactivity', scoreReverse: false },
    { question: "I am constantly fidgeting or squirming", type: 'hyperactivity', scoreReverse: false },
    { question: "I get easily distracted, I find it difficult to concentrate", type: 'hyperactivity', scoreReverse: false },
    { question: "I think before I do things", type: 'hyperactivity', scoreReverse: true },
    { question: "I finish the work I'm doing. My attention is good", type: 'hyperactivity', scoreReverse: true },

    // Peer Relationship Problems
    { question: "I am rather solitary, I tend to play alone", type: 'peer', scoreReverse: false },
    { question: "I have at least one good friend", type: 'peer', scoreReverse: true },
    { question: "I am generally liked by other people my age", type: 'peer', scoreReverse: true },
    { question: "Other people my age generally pick on me or bully me", type: 'peer', scoreReverse: false },
    { question: "I get on better with adults than with people my own age", type: 'peer', scoreReverse: false },

    // Prosocial Scale
    { question: "I try to be nice to other people. I care about their feelings", type: 'prosocial', scoreReverse: false },
    { question: "I am helpful if someone is hurt, upset or feeling ill", type: 'prosocial', scoreReverse: false },
    { question: "I share readily with others (for example, games, treats, pens)", type: 'prosocial', scoreReverse: false },
    { question: "I am kind to younger children", type: 'prosocial', scoreReverse: false },
    { question: "I often volunteer to help others (parents, teachers, other children)", type: 'prosocial', scoreReverse: false },
];

export const getSdqInterpretation = (scores: { [key: string]: number }) => {
    const interpretations: { [key: string]: { label: string, score: number, result: string, suggestion: string } } = {};

    const getResult = (score: number, thresholds: number[], isProsocial = false) => {
        if (isProsocial) {
            if (score <= 4) return { result: 'Needs Attention', suggestion: 'May have some difficulties in social skills. Practicing empathy and cooperation could be helpful.' };
            if (score <= 5) return { result: 'Slightly Lower', suggestion: 'Has relatively good social skills but with some room for improvement.' };
            return { result: 'Strength', suggestion: 'Shows strong prosocial behaviors and skills.' };
        } else {
            if (score <= thresholds[0]) return { result: 'Close to Average', suggestion: 'Indicates a low level of concern in this area.' };
            if (score <= thresholds[1]) return { result: 'Slightly Raised', suggestion: 'Some concerns may be present. It might be helpful to talk about these feelings or behaviors.' };
            return { result: 'High', suggestion: 'Significant concerns may be present. It is recommended to discuss these with a parent, teacher, or mental health professional.' };
        }
    };

    interpretations['emotional'] = {
        label: "Emotional Symptoms",
        score: scores.emotional,
        ...getResult(scores.emotional, [4, 5])
    };
    interpretations['conduct'] = {
        label: "Conduct Problems",
        score: scores.conduct,
        ...getResult(scores.conduct, [3, 4])
    };
    interpretations['hyperactivity'] = {
        label: "Hyperactivity/Inattention",
        score: scores.hyperactivity,
        ...getResult(scores.hyperactivity, [5, 6])
    };
    interpretations['peer'] = {
        label: "Peer Relationship Problems",
        score: scores.peer,
        ...getResult(scores.peer, [3, 4])
    };
    interpretations['prosocial'] = {
        label: "Prosocial Behavior",
        score: scores.prosocial,
        ...getResult(scores.prosocial, [], true)
    };
    interpretations['total'] = {
        label: "Total Difficulties Score",
        score: scores.total,
        ...getResult(scores.total, [13, 16])
    };
    
    return interpretations;
};

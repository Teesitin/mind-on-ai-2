import { derived, writable } from "svelte/store";

export type Question = {
    question: string;
    answer: string;
    index: number;
    type: string;
};

export const questions = writable<Question[]>([
    // --- Acceptance / Rejection ---
    { question: "I love the idea of AI improving everyday life.", answer: "", index: 0, type: "acceptance" },
    { question: "I believe AI will make society more efficient and fair.", answer: "", index: 1, type: "acceptance" },
    { question: "I am excited about AI becoming part of more jobs and industries.", answer: "", index: 2, type: "acceptance" },
    { question: "I feel comfortable relying on AI tools to help me make decisions.", answer: "", index: 3, type: "acceptance" },
    { question: "I enjoy experimenting with new AI products or technologies.", answer: "", index: 4, type: "acceptance" },
    { question: "I dislike how much AI is starting to influence my daily life.", answer: "", index: 5, type: "rejection" },
    { question: "I do not trust AI systems to act responsibly.", answer: "", index: 6, type: "rejection" },
    { question: "I believe AI will take away more than it gives back.", answer: "", index: 7, type: "rejection" },
    { question: "I feel uneasy when interacting with AI chatbots or assistants.", answer: "", index: 8, type: "rejection" },
    { question: "I think AI development should be slowed or heavily restricted.", answer: "", index: 9, type: "rejection" },

    // --- Safety / Progress ---
    { question: "AI should be limited until we fully understand its risks.", answer: "", index: 10, type: "safety" },
    { question: "We need strict global rules to control AI development.", answer: "", index: 11, type: "safety" },
    { question: "I think safety is more important than innovation in AI.", answer: "", index: 12, type: "safety" },
    { question: "AI systems should always be tested thoroughly before release.", answer: "", index: 13, type: "safety" },
    { question: "AI should never have full control over human decisions.", answer: "", index: 14, type: "safety" },
    { question: "Pushing AI innovation quickly is worth the potential risks.", answer: "", index: 15, type: "progress" },
    { question: "We should allow AI to evolve freely to reach its potential.", answer: "", index: 16, type: "progress" },
    { question: "AI breakthroughs should not be slowed by regulation.", answer: "", index: 17, type: "progress" },
    { question: "Progress in AI should be driven by competition, not caution.", answer: "", index: 18, type: "progress" },
    { question: "The faster AI develops, the better for humanity.", answer: "", index: 19, type: "progress" },

    // --- Human-Like / Robotic ---
    { question: "I want AI to understand human emotions and empathy.", answer: "", index: 20, type: "humanlike" },
    { question: "AI should be able to hold real conversations that feel natural.", answer: "", index: 21, type: "humanlike" },
    { question: "A human-like personality makes AI more trustworthy.", answer: "", index: 22, type: "humanlike" },
    { question: "I think AI companions could help reduce loneliness.", answer: "", index: 23, type: "humanlike" },
    { question: "I would like AI to express feelings like humor or compassion.", answer: "", index: 24, type: "humanlike" },
    { question: "AI should remain purely logical and emotionless.", answer: "", index: 25, type: "robotic" },
    { question: "I prefer AI to sound robotic so I always know it is not human.", answer: "", index: 26, type: "robotic" },
    { question: "Giving AI emotions only creates confusion and false attachment.", answer: "", index: 27, type: "robotic" },
    { question: "I do not want AI to imitate human behavior or appearance.", answer: "", index: 28, type: "robotic" },
    { question: "AI should focus on performance, not personality.", answer: "", index: 29, type: "robotic" },

    // --- Savior / Extinction ---
    { question: "AI will help solve major global issues like poverty or climate change.", answer: "", index: 30, type: "savior" },
    { question: "I believe AI will unlock a new era of creativity and discovery.", answer: "", index: 31, type: "savior" },
    { question: "AI could help humanity reach a higher level of understanding.", answer: "", index: 32, type: "savior" },
    { question: "I see AI as a key part of our future progress as a species.", answer: "", index: 33, type: "savior" },
    { question: "AI will ultimately make life better for everyone.", answer: "", index: 34, type: "savior" },
    { question: "AI could become a threat to humanity's survival.", answer: "", index: 35, type: "extinction" },
    { question: "I believe AI will eventually replace humans in most roles.", answer: "", index: 36, type: "extinction" },
    { question: "AI might lead to humanity losing control over its own destiny.", answer: "", index: 37, type: "extinction" },
    { question: "AI could cause mass unemployment and social collapse.", answer: "", index: 38, type: "extinction" },
    { question: "AI will one day decide humans are no longer necessary.", answer: "", index: 39, type: "extinction" }
]);

let cached: Question[] | null = null;

export const randomizedQuestions = derived(questions, ($questions) => {
    if (!cached) {
        cached = [...$questions].sort(() => Math.random() - 0.5);
    }
    return cached;
});
export function setAnswer(index: number, value: string) {
    questions.update(qs => {
        qs[index].answer = value;
        return qs;
    });
}

export function resetAnswers() {
    questions.update(qs => {
        qs.forEach(q => (q.answer = ""));
        return qs;
    });
}

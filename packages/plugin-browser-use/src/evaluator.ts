import { Evaluator, IAgentRuntime, Memory, State } from "@ai16z/eliza";
import { BrowserUseEvalContent, BrowserUseEvalResponse } from "./types.ts";

export const browserUseEvaluator: Evaluator = {
    name: "BROWSER_USE_EVALUATOR",
    description: "Validates search query responses from browser-use-webui API",
    similes: [
        "WEB_SEARCH_VALIDATOR",
        "BROWSER_RESPONSE_CHECKER",
        "INTERNET_RESULT_VERIFIER",
        "QUERY_RESPONSE_VALIDATOR",
    ],
    examples: [
        {
            context: "Validating search results response",
            messages: [
                {
                    user: "{{user1}}",
                    content: {
                        text: "Here are the search results for Health & Fitness advancements for upcoming year: [Result 1, Result 2, Result 3]",
                    },
                },
            ],
            outcome: "Search response is valid",
        },
    ],

    validate: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State
    ): Promise<boolean> => {
        try {
            const content = message.content as BrowserUseEvalContent;
            return typeof content.text === "string";
        } catch {
            return false;
        }
    },

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State
    ): Promise<BrowserUseEvalResponse> => {
        try {
            const content = message.content as BrowserUseEvalContent;
            const text = content.text.toLowerCase();

            if (!text.includes("search results for")) {
                return {
                    success: false,
                    response: "Missing search query response format",
                };
            }

            if (!text.includes("result")) {
                return {
                    success: false,
                    response: "No results found in response",
                };
            }

            return {
                success: true,
                response: "Search response is valid",
            };
        } catch (error) {
            return {
                success: false,
                response:
                    error instanceof Error
                        ? error.message
                        : "Failed to validate search response",
            };
        }
    },

    alwaysRun: true,
};

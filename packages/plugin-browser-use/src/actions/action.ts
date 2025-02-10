import { Action, IAgentRuntime, Memory, State } from "@ai16z/eliza";
import { BrowserUseActionContent, BrowserUseData } from "../types.ts";
import { browserUseProvider } from "../provider.ts";

export const browserUseAction: Action = {
    name: "BROWSER_USE_WEBUI",
    description:
        "Triggers a search request via the browser-use-webui API and retrieves results.",
    similes: [
        "BROWSER_QUERY",
        "WEBUI_SEARCH",
        "AUTOMATED_BROWSING",
        "INTERNET_LOOKUP",
    ],
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Search for latest Health & Fitness advancements for upcoming year",
                } as BrowserUseActionContent,
            },
            {
                user: "{{agentName}}",
                content: {
                    text: "Here are the latest Health & Fitness advancements for upcoming year",
                    action: "BROWSER_USE_WEBUI",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Book flight tickets from New York to Paris for 10th Dec to 20th Dec",
                } as BrowserUseActionContent,
            },
            {
                user: "{{agentName}}",
                content: {
                    text: "Here are the best flight options for your trip from New York to Paris between 10th Dec and 20th Dec:",
                    action: "BROWSER_USE_WEBUI",
                },
            },
        ],
    ],

    validate: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State
    ): Promise<boolean> => {
        try {
            const content = message.content as BrowserUseActionContent;
            return typeof content.text === "string" && content.text.length > 0;
        } catch {
            return false;
        }
    },

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State
    ): Promise<string> => {
        try {
            const response = await browserUseProvider.get(
                runtime,
                message,
                state
            );

            if (!response.success || !response.data) {
                return `Sorry, I couldn't retrieve search results. ${
                    response.error || ""
                }`;
            }

            const data: BrowserUseData = response.data;
            return `Here are the search results for "${
                data.query
            }": \n${data.results.join("\n")}`;
        } catch (error) {
            return `Sorry, there was an error processing your request: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
        }
    },
};

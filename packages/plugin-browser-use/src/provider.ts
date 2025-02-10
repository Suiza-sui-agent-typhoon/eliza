import { Provider, IAgentRuntime, Memory, State } from "@ai16z/eliza";
import {
    BrowserUseConfig,
    BrowserUseProviderResponse,
    BrowserUseData,
} from "./types.ts";

let providerConfig: BrowserUseConfig;

export const browserUseProvider: Provider = {
    get: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State
    ): Promise<BrowserUseProviderResponse> => {
        try {
            if (!providerConfig?.provider?.baseUrl) {
                throw new Error("Browser Use WebUI URL is required");
            }

            const baseUrl = providerConfig.provider.baseUrl;

            // Extract query from message content
            const content = message.content as { text: string };
            if (!content.text) {
                throw new Error("Query text is required");
            }
            const query = encodeURIComponent(content.text);

            // Format API URL
            const url = `${baseUrl}/search?query=${query}`;

            // Fetch search data
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            const data = await response.json();

            // Transform API response to BrowserUseData
            const browserUseData: BrowserUseData = {
                query: content.text,
                results: data.results,
            };

            return {
                success: true,
                data: browserUseData,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch search results",
            };
        }
    },
};

export const initializeBrowserUseProvider = (
    config: BrowserUseConfig
): void => {
    providerConfig = config;
};

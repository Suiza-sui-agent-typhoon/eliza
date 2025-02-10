import { Content } from "@ai16z/eliza";

export interface BrowserUseConfig {
    provider: {
        apiKey: string;
        baseUrl?: string;
    };
}

export interface BrowserUseData {
    query: string;
    results: any[];
}

export interface BrowserUseActionContent extends Content {
    text: string;
}

export interface BrowserUseEvalContent extends Content {
    text: string;
}

export interface BrowserUseEvalResponse {
    success: boolean;
    response: string;
}

export interface BrowserUseProviderResponse {
    success: boolean;
    data?: BrowserUseData;
    error?: string;
}

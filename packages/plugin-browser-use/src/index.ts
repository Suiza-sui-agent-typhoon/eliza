import { Plugin } from "@ai16z/eliza";
import { browserUseAction } from "./action.ts";
import { browserUseEvaluator } from "./evaluator.ts";
import {
    browserUseProvider,
    initializeBrowserUseProvider,
} from "./provider.ts";
import { BrowserUseConfig } from "./types.ts";

export const browserUsePlugin: Plugin = {
    name: "browser-use-webui",
    description:
        "Browser-use plugin that interacts with the browser-use-webui API",
    actions: [browserUseAction],
    evaluators: [browserUseEvaluator],
    providers: [browserUseProvider],
};

export const initializeBrowserUse = (config: BrowserUseConfig): void => {
    initializeBrowserUseProvider(config);
};

export * from "./types.ts";

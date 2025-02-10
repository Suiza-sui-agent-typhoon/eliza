# Browser Use Plugin for Eliza

A **browser-use-webui** plugin demonstrating the implementation of actions, evaluators, and providers in the **Eliza AI framework**.

## Components

### Action: `BROWSER_USE_WEBUI`

Triggers web searches or automated actions using **browser-use-webui**, supporting:

-   General search queries
-   Automated booking requests
-   Information retrieval from structured web endpoints

#### Example:

```
// User input
"Book flight tickets from New York to London for January 10 to January 15"

// Agent response
"Flight tickets from New York to London from January 10 to January 15 are available. Here are the top results: [Flight details...]"
```

---

### Evaluator: `BROWSER_USE_EVALUATOR`

Validates search responses by:

-   Checking if search results exist
-   Ensuring response format is correct
-   Verifying extracted information is complete
-   Confirming the relevance of results

#### Example:

```
// Input to evaluate
"Flight tickets from New York to London from January 10 to January 15 are available."
// Response: `{ success: true, response: "Search response is valid" }`

// Invalid input
"Flight details are coming soon."
// Response: `{ success: false, response: "Missing specific search results" }`
```

---

### Provider: `BROWSER_USE_PROVIDER`

Integrates with **browser-use-webui API** to:

-   Fetch real-time search results
-   Handle request formatting
-   Process web-based automation
-   Validate and structure search responses

#### Example:

```
// Provider configuration
{
  "endpoint": "https://browser-use-webui/api",
  "searchParams": { "query": "Book flight tickets from NYC to London" }
}
```

---

## Usage

```typescript
import { browserUsePlugin } from "@elizaos/plugin-browser-use-webui";

// Configure the plugin
const config = {
    provider: {
        endpoint: "https://browser-use-webui/api",
    },
};

// Register the plugin
agent.registerPlugin(browserUsePlugin, config);
```

---

## Implementation Details

This plugin demonstrates:

### **Action Implementation**

-   **Query parsing** (extracting locations, dates, and actions)
-   **Structured request formatting**
-   **Response validation and transformation**
-   **Error handling**

### **Evaluator Implementation**

-   **Data validation**
-   **Format verification**
-   **Search result evaluation**
-   **Ensuring structured responses**

### **Provider Implementation**

-   **API integration**
-   **Response transformation**
-   **Error handling**
-   **Type-safe response processing**

---

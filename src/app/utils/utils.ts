export function errorToString(error: any): string {
    try {
        if (!error) return "Unknown error";

        // Axios error or API response with nested data.message
        if (error.response?.data?.message) {
            return String(error.response.data.message);
        }

        // API or server error with data.message
        if (error.data?.message) {
            return String(error.data.message);
        }

        // Direct message property
        if (error.message) {
            return String(error.message);
        }

        // Array of errors (e.g., validation errors)
        if (Array.isArray(error)) {
            return error
                .map((err) => (typeof err === "object" ? JSON.stringify(err) : String(err)))
                .join(", ");
        }

        // Plain object error (flatten key-value pairs for readability)
        if (typeof error === "object") {
            return Object.entries(error)
                .map(
                    ([key, value]) =>
                        `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`
                )
                .join(", ");
        }

        // Fallback for strings, numbers, etc.
        return String(error);
    } catch (e) {
        return `Failed to parse error: ${String(e)}`;
    }
}

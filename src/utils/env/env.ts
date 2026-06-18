const envMap: Record<string, string | undefined> = {
    NEXT_PUBLIC_TRANSLATION_CDN: process.env.NEXT_PUBLIC_TRANSLATION_CDN,
    NEXT_PUBLIC_TRANSLATION_TYPES: process.env.NEXT_PUBLIC_TRANSLATION_TYPES,
    NEXT_PUBLIC_ADGYTEC_FLOW_ENDPOINT:
        process.env.NEXT_PUBLIC_ADGYTEC_FLOW_ENDPOINT,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
};

export function getEnvVar(key: string): string {
    const value = envMap[key] || process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

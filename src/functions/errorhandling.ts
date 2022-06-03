export function errorHasMessage(error: unknown): boolean {
    return typeof error === "object" && error !== null && "message" in error;
}

export function getErrorMessage(error: unknown): string {
    if (errorHasMessage(error)) {
        return (error as Error).message;
    } else {
        return JSON.stringify(error);
    }
}

export function alertError(e: unknown, preface?: string): void {
    const errorMessage = `${preface || ""} /n ${getErrorMessage(e)}`;
    console.log(errorMessage)
    window.alert(errorMessage);
}

export const delay = (milisec: number) => new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milisec);
})

export {};
interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    clear: () => void;
    getSize: () => number;
}

export default class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        this.container.pop();
    };

    peak = (): T | null => {
        const length = this.container.length;
        if (length === 0) {
            return null;
        }
        return this.container[length - 1];
    };

    getSize = () => this.container.length;

    getElements = () => this.container;

    clear = () => { this.container = [] }
}
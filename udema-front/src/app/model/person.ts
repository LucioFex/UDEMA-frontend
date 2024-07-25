
export abstract class Person {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public age: number,
        public email: string,
        public password: string
    ) {}

    abstract register(): void;
    abstract login(email: string, password: string): void;
}

export class Document {
    constructor(
        public id: number,
        public name: string,
        public description: any,
        public url: any,
        public children: {}
    ) {}

}
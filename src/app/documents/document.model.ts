export class Document {
    constructor(
        public id: string,
        public name: string,
        public description: any,
        public url: any,
        public children: {}
    ) {}

}
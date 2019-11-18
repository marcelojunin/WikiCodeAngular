export class Page {
    constructor(
        public content?: any[],
        public first?: boolean,
        public last?: boolean,
        public number?: number,
        public numberOfElements?: number,
        public size?: number,
        public sort?: any[],
        public totalElements?: number,
        public totalPages?: number
    ) { }

    public static fromPage(jsonData: any): Page {
       return Object.assign(new Page(), jsonData);
    }
}

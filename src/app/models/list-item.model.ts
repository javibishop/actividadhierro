export class ListItem {
    constructor(
        public id: number,
        public descripcion: string
    ){}
}

export class GenericList{
    public list: ListItem[] = [];
    public get (id: number){
        //arrow function
        ///=== compara valor y tipo de dato.
        return this.list.find(item => item.id === id); 
    }
    
}

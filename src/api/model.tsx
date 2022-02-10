import Model, {baseUrl, ModelData, ModelObject} from "./api";

export class LanguageObject extends ModelObject
{
    name = "";

    constructor(data: ModelData, baseUrl: string)
    {
        super(data, baseUrl);
        this.fields = ["id", "name"];
        this.getData();
    }
}

export const Language = new Model(baseUrl + "/api/language/", LanguageObject);


export type ModelRegistry = typeof ModelObject

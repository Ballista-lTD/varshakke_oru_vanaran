import Model, {baseUrl, ModelData, ModelObject, patch} from "./api";
import {getAuth} from "./auth";

export class TokenObject extends ModelObject 
{
    intelligence = "";
    strength = "";
    beauty = "";
    charisma = "";
    wealth = "";
    will_help_poor = "";
    religiousity = "";
    liberal = "";

    modify = async (path: string, data = this.data) => 
    {
        try 
        {
            this.setData();
            const headers = {"Authorization": `Bearer ${getAuth()}`};
            return await patch(`${this.baseUrl}${this.id}/${path}`, data, headers);
        }
        catch (e) 
        {
            throw await (e as { json: () => Promise<unknown> }).json();
        }

    };

    constructor(data: ModelData, baseUrl: string) 
    {
        super(data, baseUrl);
        this.fields = ["id", "intelligence", "strength", "beauty", "charisma", "wealth", "will_help_poor", "religiousity", "liberal"];
        this.getData();
    }
}

export class PartnerTokenObject extends ModelObject 
{
    name = "";
    intelligence = "";
    strength = "";
    beauty = "";
    charisma = "";
    wealth = "";
    will_help_poor = "";
    religiousity = "";
    liberal = "";

    modify = async (path: string, data = this.data) => 
    {
        try 
        {
            this.setData();
            const headers = {"Authorization": `Bearer ${getAuth()}`};
            return await patch(`${this.baseUrl}${this.id}/${path}`, data, headers);
        }
        catch (e) 
        {
            throw await (e as { json: () => Promise<unknown> }).json();
        }

    };

    constructor(data: ModelData, baseUrl: string) 
    {
        super(data, baseUrl);
        this.fields = ["id", "name", "intelligence", "strength", "beauty", "charisma", "wealth", "will_help_poor", "religiousity", "liberal"];
        this.getData();
    }
}

export const PartnerToken = new Model(baseUrl + "/auth/token/others", PartnerTokenObject);
export const Token = new Model(baseUrl + "/auth/token/", TokenObject);


export type ModelRegistry = typeof TokenObject | typeof PartnerTokenObject

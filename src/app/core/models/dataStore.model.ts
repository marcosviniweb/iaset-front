import { CardData } from "./cardData.model";
import { Dependent } from "./dependents.model";
import { UserData } from "./userData.model";

export interface DataStore {
    userData?:UserData,
    dependent?:Dependent | null,
    cardData?:CardData[],
    listDependent?:Dependent[]
}
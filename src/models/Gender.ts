
import { DiaRegWebApiClient as Client, GenderArrayResponse } from "../api/DiaRegApi";


export const getGenders = async () => {
    await new Client().getGenders().then((value: GenderArrayResponse) => {
        return value;
    });
}
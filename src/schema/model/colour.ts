import fetch from 'node-fetch';
import { Colour } from '../source-types';
import { item, itemList } from './utils';

const colourApi = 'https://reqres.in/api/colours';

export const getColour = async (id: number) => {
    const req = await fetch(`${colourApi}/${id}`);
    const json = await req.json();
    return item<Colour>(json.data, 'Colour');
};

export const getColours = async () => {
    const req = await fetch(`${colourApi}?per_page=12`);
    const json = await req.json();
    return itemList<Colour>(json.data, 'Colour');
};

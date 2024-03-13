import { Request, Response } from 'express';
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import axios from 'axios';

const api = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID as string,
  process.env.SPOTIFY_CLIENTE_SECRET as string
)

const search = async (req: Request, res: Response) => {  
  const q: any | string = req.query['q'];
  const type: any | string = req.query['type'];
  const limit: any | string = req.query['limit'];
  const offset: any | string = req.query['offset'];
  const market = "BR";
  const include_external = "audio";
  //Necessário implementar paginação no front-end
  
  try {
    const response = await api.search(q, [type], market, limit, offset, include_external);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
}

const getLyrics = async (req: Request, res: Response) => {
  const art = req.query['art'];
  const mus = req.query['mus'];
  const apikey = process.env.API_KEY_VAGALUME;

  try {
    const response = await axios.get(`https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey=${apikey}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json(error);
  }
}

const home = (req: Request, res: Response) => {
  return res.status(200).json("Hello");
}

export default {
  search,
  getLyrics,
  home
}
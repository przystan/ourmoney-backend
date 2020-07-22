import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: ["http://localhost:4200","https://dev.ourmoney.dkostrzewa.pl"]
}

export const secretJWT = "secret-key";
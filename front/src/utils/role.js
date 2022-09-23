import { paramsTraductions } from "../local/params";
import { getLang } from "./lang";

export const roles = [
    {
        name: paramsTraductions[getLang()].admin,
        key: 'ad',
    },
    {
        name: paramsTraductions[getLang()].comptable,
        key: 'comp',
    }
]
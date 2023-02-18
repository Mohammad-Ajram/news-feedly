import type { MenuProps } from "antd";
import {Checkbox} from "antd";

const allSources = ["Moneycontrol", "NDTV News", "Deccan Herald", "Livemint", "SportsCafe", "The Times of India","YouTube","Zoom","Hindustan Times","India Today","Business Standard"]

export const getItems = (onSoucesChange: any, sources: any): MenuProps["items"] =>
allSources.map((item:any, index:any) => ({
   key: index,
   label: <Checkbox onChange={() => onSoucesChange(item)} checked={sources.indexOf(item) > -1}>{item}</Checkbox>,
   disabled: false,
 }));


import { Table } from "./table";

export interface Restaurant {
    _id: string;
    name: string;
    endorsements: string[];
    tables: Table[];
  }
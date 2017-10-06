/**
 * Created by ShahanThai on 02/10/2017.
 */
import { Task } from './task';

export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    status: boolean;
    tasks: Task[];
}

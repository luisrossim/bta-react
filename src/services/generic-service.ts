import { type AxiosInstance } from 'axios';
import { axiosInstance } from "./axios";

export abstract class GenericService<T> {
    protected readonly axios: AxiosInstance = axiosInstance;
    protected readonly path: string;

    constructor(path: string){
        this.path = path
    }

    async create(data: Partial<T>): Promise<T> {
        const response = await this.axios.post<T>(this.path, data);
        return response.data;
    }

    async getAll(): Promise<T[]>{
        const response = await this.axios.get<T[]>(this.path);
        return response.data;
    }

    async getAllWithParams(params: Record<string, any>): Promise<T[]> {
        const response = await this.axios.get<T[]>(this.path, { params });
        return response.data;
    }

    async getById(id: number | string): Promise<T>{
        const response = await this.axios.get<T>(`${this.path}/${id}`);
        return response.data;
    }

    async update(id: number | string, data: Partial<T>): Promise<T> {
        const response = await this.axios.put<T>(`${this.path}/${id}`, data)
        return response.data;
    }

    async delete(id: number | string): Promise<void> {
        return await this.axios.delete(`${this.path}/${id}`);
    }
}

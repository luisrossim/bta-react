import { axiosInstance } from '@/lib/axios';
import type { PaginatedResponse } from '../types/PaginatedResponse';

export abstract class CrudService<T> {
    protected readonly axios = axiosInstance;
    protected readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    async create(data: Partial<T>): Promise<T> {
        const response = await this.axios.post<T>(this.path, data);
        return response.data;
    }

    async get(): Promise<T[]> {
        const response = await this.axios.get<T[]>(this.path);
        return response.data;
    }

    async getPaginated(
        params?: Record<string, any>
    ): Promise<PaginatedResponse<T>> {
        const response = await this.axios.get<PaginatedResponse<T>>(this.path, {
            params,
        });
        return response.data;
    }

    async getById(id: number | string): Promise<T> {
        const response = await this.axios.get<T>(`${this.path}/${id}`);
        return response.data;
    }

    async update(id: number | string, data: Partial<T>): Promise<T> {
        const response = await this.axios.put<T>(`${this.path}/${id}`, data);
        return response.data;
    }

    async delete(id: number | string): Promise<void> {
        return await this.axios.delete(`${this.path}/${id}`);
    }
}

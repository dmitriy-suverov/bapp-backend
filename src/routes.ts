import { Routes } from 'nest-router';
import { V1Module } from './versions/v1/v1.module';

export const routes: Routes = [
  {
    path: '/v1',
    children: [V1Module],
  },
];

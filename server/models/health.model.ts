export interface HealthInterface {
    user_id: number;
    height: number //cm
    weight: number //kg
    bloodsugar: number //mg/dL
    bloodpressure: number //mmHg
    cholesterol: number //mg/dL
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
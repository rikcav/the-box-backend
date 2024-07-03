import 'dotenv/config';
import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(8000),
    SECRET_KEY: z.string().base64(),
    AWS_ACCESS_KEY: z.string().optional(),
    AWS_SECRET_KEY: z.string().optional(),
    AWS_S3_BUCKET: z.string().optional(),
    AWS_REGION: z.string().optional()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('O Rônald precisa das variaveis: ', _env.error.format())

    throw new Error('Invalid environment variables')
}

export const env = _env.data
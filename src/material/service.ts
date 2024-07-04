import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as repository from "./repository";
import { env } from "../env";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface MaterialDto {
  title: string;
  url: string;
  description: string;
  category:
    | "BAREMA"
    | "REQUERIMENTO"
    | "UNICO"
    | "EDITAIS"
    | "EDITAIS_DE_BOLSAS"
    | "APOIO"
    | "MANUAL_DOS_CALOUROS";
  type: "DIDATICO" | "FORMAL";
  userId: number;
}

export const createMaterial = async (materialDto: MaterialDto) => {
  return repository.createMaterial(materialDto);
};

export const createSignedUrl = async (fileType: string) => {
  const client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY!,
      secretAccessKey: env.AWS_SECRET_KEY!,
    },
  });
  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: `${randomUUID()}.${fileType}`,
  });
  return await getSignedUrl(client, command, { expiresIn: 5 * 60 });
};

import fs from 'fs';
import path from 'path';

const IS_CLOUD = !!(process.env.S3_BUCKET_NAME);
const DATA_DIR = path.join(process.cwd(), '.local-storage');

function localPath(store: string, key: string) {
    const dir = path.join(DATA_DIR, store);
    fs.mkdirSync(dir, { recursive: true });
    return path.join(dir, key);
}

const local = {
    getJSON: (store: string, key: string) => {
        try { return JSON.parse(fs.readFileSync(localPath(store, key), 'utf8')); }
        catch { return null; }
    },
    setJSON: (store: string, key: string, value: unknown) => {
        fs.writeFileSync(localPath(store, key), JSON.stringify(value));
    },
    getBytes: (store: string, key: string): { data: Buffer; meta: Record<string, string> } | null => {
        try {
            const data = fs.readFileSync(localPath(store, key));
            const meta = JSON.parse(fs.readFileSync(localPath(store, key + '.meta'), 'utf8'));
            return { data, meta };
        } catch { return null; }
    },
    setBytes: (store: string, key: string, bytes: ArrayBuffer, meta: Record<string, string>) => {
        fs.writeFileSync(localPath(store, key), Buffer.from(bytes));
        fs.writeFileSync(localPath(store, key + '.meta'), JSON.stringify(meta));
    },
};

async function getS3Client() {
    const { S3Client } = await import('@aws-sdk/client-s3');
    return new S3Client({
        region: process.env.S3_REGION,
        credentials: process.env.S3_ACCESS_KEY_ID ? {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        } : undefined,
    });
}

function s3Key(store: string, key: string) {
    return `${store}/${key}`;
}

export async function getJSON(store: string, key: string) {
    if (IS_CLOUD) {
        const { GetObjectCommand } = await import('@aws-sdk/client-s3');
        const client = await getS3Client();
        try {
            const res = await client.send(new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: s3Key(store, key),
            }));
            const body = await res.Body?.transformToString();
            return body ? JSON.parse(body) : null;
        } catch { return null; }
    }
    return local.getJSON(store, key);
}

export async function setJSON(store: string, key: string, value: unknown) {
    if (IS_CLOUD) {
        const { PutObjectCommand } = await import('@aws-sdk/client-s3');
        const client = await getS3Client();
        await client.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: s3Key(store, key),
            Body: JSON.stringify(value),
            ContentType: 'application/json',
        }));
        return;
    }
    local.setJSON(store, key, value);
}

export async function getBytes(store: string, key: string) {
    if (IS_CLOUD) {
        const { GetObjectCommand } = await import('@aws-sdk/client-s3');
        const client = await getS3Client();
        try {
            const [dataRes, metaRes] = await Promise.all([
                client.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: s3Key(store, key) })),
                client.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: s3Key(store, key + '.meta') })),
            ]);
            const data = await dataRes.Body?.transformToByteArray();
            const metaBody = await metaRes.Body?.transformToString();
            if (!data || !metaBody) return null;
            return { data: data.buffer as ArrayBuffer, meta: JSON.parse(metaBody) as Record<string, string> };
        } catch { return null; }
    }
    const result = local.getBytes(store, key);
    if (!result) return null;
    return { data: result.data.buffer as ArrayBuffer, meta: result.meta };
}

export async function deleteBytes(store: string, key: string) {
    if (IS_CLOUD) {
        const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
        const client = await getS3Client();
        await Promise.all([
            client.send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: s3Key(store, key) })),
            client.send(new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET_NAME!, Key: s3Key(store, key + '.meta') })),
        ]);
        return;
    }
    try { fs.unlinkSync(localPath(store, key)); } catch { /* ignore */ }
    try { fs.unlinkSync(localPath(store, key + '.meta')); } catch { /* ignore */ }
}

export async function setBytes(store: string, key: string, bytes: ArrayBuffer, meta: Record<string, string>) {
    if (IS_CLOUD) {
        const { PutObjectCommand } = await import('@aws-sdk/client-s3');
        const client = await getS3Client();
        await Promise.all([
            client.send(new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: s3Key(store, key),
                Body: Buffer.from(bytes),
                ContentType: meta.contentType ?? 'application/octet-stream',
            })),
            client.send(new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: s3Key(store, key + '.meta'),
                Body: JSON.stringify(meta),
                ContentType: 'application/json',
            })),
        ]);
        return;
    }
    local.setBytes(store, key, bytes, meta);
}

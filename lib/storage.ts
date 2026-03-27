import fs from 'fs';
import path from 'path';

const isNetlify = !!(process.env.NETLIFY_BLOBS_CONTEXT || process.env.SITE_ID);

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

export async function getJSON(store: string, key: string) {
    if (isNetlify) {
        const { getStore } = await import('@netlify/blobs');
        return getStore(store).get(key, { type: 'json' });
    }
    return local.getJSON(store, key);
}

export async function setJSON(store: string, key: string, value: unknown) {
    if (isNetlify) {
        const { getStore } = await import('@netlify/blobs');
        return getStore(store).setJSON(key, value);
    }
    local.setJSON(store, key, value);
}

export async function getBytes(store: string, key: string) {
    if (isNetlify) {
        const { getStore } = await import('@netlify/blobs');
        const result = await getStore(store).getWithMetadata(key, { type: 'arrayBuffer' });
        if (!result.data) return null;
        return { data: result.data as ArrayBuffer, meta: result.metadata as Record<string, string> };
    }
    const result = local.getBytes(store, key);
    if (!result) return null;
    return { data: result.data.buffer as ArrayBuffer, meta: result.meta };
}

export async function setBytes(store: string, key: string, bytes: ArrayBuffer, meta: Record<string, string>) {
    if (isNetlify) {
        const { getStore } = await import('@netlify/blobs');
        return getStore(store).set(key, bytes, { metadata: meta });
    }
    local.setBytes(store, key, bytes, meta);
}

import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

const BINLIST_URL = "https://raw.githubusercontent.com/venelinkochev/bin-list-data/refs/heads/master/bin-list-data.csv";

let cachedData = null;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const bin = searchParams.get('bin');

    if (!bin) {
        return NextResponse.json({ error: 'BIN parameter is required' }, { status: 400 });
    }

    try {
        let data = [];
        let isOnline = false;

        if (cachedData) {
            data = cachedData.data;
            isOnline = cachedData.isOnline;
        } else {
            // Try fetching online first
            try {
                const response = await fetch(BINLIST_URL);
                if (response.ok) {
                    const csvText = await response.text();
                    const result = Papa.parse(csvText, { header: true });
                    data = result.data;
                    isOnline = true;
                } else {
                    throw new Error('Failed to fetch online CSV');
                }
            } catch (error) {
                console.error("Online fetch failed, falling back to local:", error);
                // Fallback to local file
                const filePath = path.join(process.cwd(), 'src', 'data', 'offline-bin-list-data.csv');
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const result = Papa.parse(fileContent, { header: true });
                data = result.data;
                isOnline = false;
            }

            // Cache the data
            cachedData = { data, isOnline };
        }

        const foundBin = data.find((item) => item.BIN === bin);

        if (foundBin) {
            return NextResponse.json({ ...foundBin, source: isOnline ? 'Online' : 'Local' });
        } else {
            return NextResponse.json({ error: 'BIN not found' }, { status: 404 });
        }

    } catch (error) {
        console.error("Error processing BIN request:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        const memoryUsage = process.memoryUsage();
        const heapUsed = Math.round(memoryUsage.heapUsed / 1024 / 1024);
        const rss = Math.round(memoryUsage.rss / 1024 / 1024);
        console.log(`[API] Memory: ${heapUsed}MB (Heap) / ${rss}MB (RSS)`);
    }
}

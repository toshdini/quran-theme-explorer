import { client } from "@/lib/quran-client";


export async function GET() {
  try {
  } catch (error) {
    return Response.json({ error: 'Faild to fetch chapters' }, { status: 500 });
  }
}

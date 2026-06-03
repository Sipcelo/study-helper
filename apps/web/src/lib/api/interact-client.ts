import type { InteractTextRequest, InteractTextResponse } from '@/types/interact';

const BASE_URL =
  process.env.NEXT_PUBLIC_STUDY_HELPER_API_URL ?? 'http://localhost:8080';

export async function interactText(
  input: string,
  domain: InteractTextRequest['domain'],
): Promise<InteractTextResponse> {
  const body: InteractTextRequest = { input, domain };

  const res = await fetch(`${BASE_URL}/api/interact/text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API respondeu ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<InteractTextResponse>;
}

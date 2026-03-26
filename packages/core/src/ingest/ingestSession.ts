import { SessionInput } from "@surf/shared";

export async function ingestSession(client: any, input: SessionInput) {
  const result = await client.from("sessions").insert({
    spot_name: input.spotName,
    session_date: input.sessionDate,
    board_type: input.boardType,
    subjective_score: input.subjectiveScore,
    notes: input.notes
  });
  const { data, error } = typeof result.select === "function" ? await result.select("id") : result;
  if (error) throw error;
  return data?.[0]?.id;
}

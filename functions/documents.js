const DOCUMENT_KEY_SIZE = 6;
const MAX_DOCUMENT_SIZE = 5000000;

export async function onRequest(ctx) {
  if (ctx.request.method != "POST") {
    return new Response("Method not allowed.", {status: 405});
  }

  const url = new URL(ctx.request.url)

  const length = Number(ctx.request.headers.get("Content-Length") || 0);

  if (!length) {
    return new Response("Content must contain at least one character.", {status: 400});
  }

  if (length > MAX_DOCUMENT_SIZE) {
    return new Response(`Content must be shorter than ${MAX_DOCUMENT_SIZE} (was ${length}).`, {status: 400});
  }

  const id = generateId();
  const content = await ctx.request.text();

  await ctx.env.STORAGE.put(`documents:${id}`, content);

  const json = {
    key: id,
    url: `https://${url.hostname}/${id}`,
  };
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
  };

  const data = JSON.stringify(json);
  return new Response(data, { headers, status: 200 });
}

function generateId() {
  const randVowel = randOf("aeiou");
  const randConsonant = randOf("bcdfghjklmnpqrstvwxyz");
  let id = "";
  const start = Math.round(Math.random());

  for (let i = 0; i < DOCUMENT_KEY_SIZE; i++) {
    id += i % 2 == start ? randConsonant() : randVowel();
  }

  return id;
}

const randOf = (collection) => {
  return () => {
    return collection[Math.floor(Math.random() * collection.length)];
  };
};

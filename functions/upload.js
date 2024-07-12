export async function onRequestPost(context) {
  const { request } = context;
  const contentType = request.headers.get('content-type') || '';
  
  if (!contentType.includes('multipart/form-data')) {
    return new Response('Bad Request', { status: 400 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) {
    return new Response('File not provided', { status: 400 });
  }

  const key = `uploads/${file.name}`;
  const url = new URL(request.url);
  const baseUrl = url.origin;

  const fileDetails = {
    name: file.name,
    type: file.type,
    size: file.size,
    url: `${baseUrl}/${key}`
  };

  // Note: This is just for demonstration purposes.
  // In a real-world scenario, you should store the file somewhere and return the correct URL.
  // For example, you could use an external storage service (like S3) or a database.

  return new Response(JSON.stringify(fileDetails), {
    headers: { 'Content-Type': 'application/json' }
  });
}

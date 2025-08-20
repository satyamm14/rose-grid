import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const download = searchParams.get('download');

  if (!imageUrl) {
    return new NextResponse('URL parameter is required', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, {
        status: response.status,
      });
    }

    const imageBlob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
    
    if (download === 'true') {
        let filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1).split('?')[0];
        if (!filename || !filename.includes('.')) {
          const extension = imageBlob.type.split('/')[1] || 'jpg';
          filename = `image.${extension}`;
        }
        headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    }

    return new NextResponse(imageBlob, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Error fetching image.', { status: 500 });
  }
}

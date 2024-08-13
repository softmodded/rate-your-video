import { videoInfo } from "youtube-ext";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) {
        return new Response('Missing id', { status: 400 });
    }
    
    const video = await videoInfo(id);
    if (!video) {
        return new Response('Video not found', { status: 404 });
    }

    return video;
})
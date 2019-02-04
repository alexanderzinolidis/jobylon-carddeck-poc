const JOB_FEED_URL = 'https://feed.jobylon.com/feeds/7d7e6fd12c614aa5af3624b06f7a74b8/?format=json'

export default {
    getJobAds: async () =>
        await ( await window.fetch(JOB_FEED_URL) ).json(),
}
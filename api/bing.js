export default async function handler(req, res) {
  try {
    // 直接转发Bing API请求，不存储图片
    const response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
    const data = await response.json();
    
    const imageInfo = data.images[0];
    const imageUrl = `https://www.bing.com${imageInfo.url}`;
    
    // 返回极简数据（仅包含必要信息）
    res.setHeader('Cache-Control', 'public, s-maxage=86400'); // 缓存24小时
    res.setHeader('CDN-Cache-Control', 'max-age=86400');
    
    res.status(200).json({
      url: imageUrl,
      title: imageInfo.title,
      copyright: imageInfo.copyright,
      date: imageInfo.enddate
    });
    
  } catch (error) {
    console.error('Bing API Error:', error);
    res.status(500).json({ error: '获取图片失败' });
  }
}
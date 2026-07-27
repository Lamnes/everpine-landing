/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт: лендинг не имеет серверной логики, а `out/` кладётся на любой
  // хостинг (Vercel, nginx, S3) без рантайма Node. Это же снимает вопрос масштабирования.
  output: 'export',
  // Оптимизатор изображений требует сервер; при экспорте отдаём заранее подготовленные файлы.
  // Кадры уже сняты в нужном размере (см. demo-video/stills-yc.mjs), общий вес графики ~280KB.
  images: { unoptimized: true },
  trailingSlash: true,
}
export default nextConfig

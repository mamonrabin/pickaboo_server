export const generateSku = ({
  title,
  brandId,
  prefix = '',
}: {
  title: string;
  brandId: string;
  prefix?: string;
}): string => {
  const titleCode = title
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 4)
    .toUpperCase();

  const brandCode = brandId.slice(-4).toUpperCase();

  const uniqueCode = Date.now().toString(36).slice(-6).toUpperCase();

  return [prefix, titleCode, brandCode, uniqueCode].filter(Boolean).join('-');
};

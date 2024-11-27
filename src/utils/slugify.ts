import slugify from 'slugify';

function slugifyStr(title: string): string {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

  const uniqueSuffix = generateUniqueSuffix();

  return `${baseSlug}-${uniqueSuffix}`;
}

export function generateUniqueSuffix(length: number = 13): string {
  const charset =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  let id = '';
  const randomValues = crypto.getRandomValues(new Uint8Array(length));

  for (let i = 0; i < length; i++) {
    id += charset[randomValues[i] & 63]; // Ensure the index is twithin the range 0-63
  }

  return id;
}

export default slugifyStr;

const tags = ['GET_CATEGORIES'] as const;

export const fetchTags = Object.freeze(tags.reduce((acc, cur) => ({ ...acc, [cur]: cur }), {} as { [K in (typeof tags)[number]]: K }));

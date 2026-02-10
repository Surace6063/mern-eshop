import slugify from "slugify";

export const createSlugify = (slug) => {
    return slugify(slug,{
        lower: true,
        strict: true,  // remove special charcter
        locale: "en"
    })
}